"use client"

import * as React from "react"
import { createMap } from "svg-dotted-map"

import { cn } from "@/lib/utils"

function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

/** Deterministic PRNG for stable destination sampling (SSR / hydration safe). */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function sampleDestinationPoints(
  points: ReadonlyArray<{ x: number; y: number }>,
  count: number,
  seed: number,
): { x: number; y: number }[] {
  if (count <= 0 || points.length === 0) return []
  const rng = mulberry32(seed)
  const picked: { x: number; y: number }[] = []
  const seen = new Set<string>()
  const target = Math.min(count, points.length)
  let attempts = 0
  const maxAttempts = target * 40
  while (picked.length < target && attempts < maxAttempts) {
    attempts++
    const idx = Math.floor(rng() * points.length)
    const p = points[idx]
    const key = `${p.x},${p.y}`
    if (seen.has(key)) continue
    seen.add(key)
    picked.push(p)
  }
  return picked
}

function connectionPathD(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curve: number,
): string {
  if (curve <= 0) {
    return `M ${x1} ${y1} L ${x2} ${y2}`
  }
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const cx = mx + nx * curve
  const cy = my + ny * curve
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

function computeLandHubSpokes(
  points: ReadonlyArray<{ x: number; y: number }>,
  markerPositions: ReadonlyArray<{ x: number; y: number }>,
  yToRowIndex: Map<number, number>,
  stagger: boolean,
  xStep: number,
  opts: { count: number; seed: number; minDistanceFromHub: number },
): { key: string; x1: number; y1: number; x2: number; y2: number }[] {
  if (opts.count <= 0 || markerPositions.length === 0) return []

  const rng = mulberry32(opts.seed)
  const candidates: { x: number; y: number }[] = []

  for (const point of points) {
    const rowIndex = yToRowIndex.get(point.y) ?? 0
    const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
    const x = point.x + offsetX
    const y = point.y
    let minD = Infinity
    for (const h of markerPositions) {
      const d = Math.hypot(x - h.x, y - h.y)
      if (d < minD) minD = d
    }
    if (minD >= opts.minDistanceFromHub) {
      candidates.push({ x, y })
    }
  }

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const t = candidates[i]
    candidates[i] = candidates[j]!
    candidates[j] = t!
  }

  const cap = Math.min(opts.count, candidates.length)
  const out: { key: string; x1: number; y1: number; x2: number; y2: number }[] = []

  for (let i = 0; i < cap; i++) {
    const p = candidates[i]!
    let bestIdx = 0
    let bestD = Infinity
    for (let hi = 0; hi < markerPositions.length; hi++) {
      const h = markerPositions[hi]!
      const d = Math.hypot(p.x - h.x, p.y - h.y)
      if (d < bestD) {
        bestD = d
        bestIdx = hi
      }
    }
    const hub = markerPositions[bestIdx]!
    out.push({
      key: `spoke-${p.x}-${p.y}-${bestIdx}-${i}`,
      x1: p.x,
      y1: p.y,
      x2: hub.x,
      y2: hub.y,
    })
  }

  return out
}

export interface Marker {
  lat: number
  lng: number
  size?: number
  pulse?: boolean
}

/** addMarkers returns markers with lat/lng removed; only x, y and other props (e.g. size) remain */
type MapMarker<M extends Marker> = Omit<M, "lat" | "lng"> & {
  x: number
  y: number
}

export interface DottedMapProps<
  M extends Marker = Marker,
> extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  mapSamples?: number
  markers?: M[]
  dotColor?: string
  markerColor?: string
  /** Radius in SVG viewBox units; omit to scale with `width` (tuned for the default 150×75 map). */
  dotRadius?: number
  stagger?: boolean
  pulse?: boolean
  /** Sample this many land dots and render them as small white “destination” dots (e.g. 500+). */
  destinationDots?: number
  /** Seed for deterministic sampling when `destinationDots` is set. */
  destinationDotsSeed?: number
  destinationDotClassName?: string

  /** Draw faint grid lines in viewBox units (e.g. 72 for ~12 columns on a 900-wide map). */
  gridStep?: number
  gridColor?: string

  /** Edges between markers by index (same order as `markers`). Rendered above land dots, below markers. */
  markerConnections?: ReadonlyArray<{ from: number; to: number }>
  /**
   * Spokes from random land dots → nearest hub marker (same `markers` order).
   * Deterministic from `seed`; use for “regional feeds into hub” visuals.
   */
  hubLandSpokes?: {
    count: number
    seed: number
    /** Min distance from any hub in viewBox units (default scales with width). */
    minDistanceFromHub?: number
  }
  connectionColor?: string
  /** Bulge factor for curved arcs between cities (viewBox units); 0 = straight lines. */
  connectionCurve?: number
  /** Extra class on the moving dash overlay (optional). */
  connectionClassName?: string

  renderMarkerOverlay?: (args: {
    marker: MapMarker<M>
    index: number
    x: number
    y: number
    r: number
  }) => React.ReactNode
}

export function DottedMap<M extends Marker = Marker>({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  dotColor = "currentColor",
  markerColor = "#FF6900",
  dotRadius: dotRadiusProp,
  stagger = true,
  pulse = false,
  destinationDots = 0,
  destinationDotsSeed = 0x5a17a1,
  destinationDotClassName = "map-destination-dot",
  gridStep,
  gridColor = "rgba(255,255,255,0.045)",
  markerConnections,
  hubLandSpokes,
  connectionColor = "rgba(249, 115, 22, 0.35)",
  connectionCurve = 14,
  connectionClassName,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps<M>) {
  const reducedMotion = usePrefersReducedMotion()
  const dotRadius = dotRadiusProp ?? (0.2 * width) / 150

  const { points, addMarkers } = createMap({
    width,
    height,
    mapSamples,
  })
  const processedMarkers = addMarkers(markers)

  const destinationPoints = React.useMemo(
    () => sampleDestinationPoints(points, destinationDots, destinationDotsSeed),
    [points, destinationDots, destinationDotsSeed],
  )

  const destDotRadius = dotRadius * 0.42

  // Compute stagger helpers in a single, simple pass
  const { xStep, yToRowIndex } = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
    const rowMap = new Map<number, number>()
    let step = 0
    let prevY = Number.NaN
    let prevXInRow = Number.NaN

    for (const p of sorted) {
      if (p.y !== prevY) {
        // new row
        prevY = p.y
        prevXInRow = Number.NaN
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
      }
      prevXInRow = p.x
    }

    return { xStep: step || 1, yToRowIndex: rowMap }
  }, [points])

  const markerPositions = React.useMemo(() => {
    return processedMarkers.map((marker) => {
      const rowIndex = yToRowIndex.get(marker.y) ?? 0
      const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
      return {
        x: marker.x + offsetX,
        y: marker.y,
        r: marker.size ?? dotRadius,
      }
    })
  }, [processedMarkers, yToRowIndex, stagger, xStep, dotRadius])

  /** Land dots closer than this to any hub are excluded as spoke sources (~4% of view width). */
  const minHubDistDefault = width * 0.038

  const connectionPaths = React.useMemo(() => {
    const out: {
      key: string
      x1: number
      y1: number
      x2: number
      y2: number
    }[] = []

    if (markerConnections) {
      let seq = 0
      for (const edge of markerConnections) {
        const a = markerPositions[edge.from]
        const b = markerPositions[edge.to]
        if (!a || !b) continue
        out.push({
          key: `marker-${edge.from}-${edge.to}-${seq++}`,
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
        })
      }
    }

    if (hubLandSpokes && markerPositions.length > 0) {
      const minD =
        hubLandSpokes.minDistanceFromHub ??
        Math.max(28, minHubDistDefault)
      const spokes = computeLandHubSpokes(
        points,
        markerPositions,
        yToRowIndex,
        stagger,
        xStep,
        {
          count: hubLandSpokes.count,
          seed: hubLandSpokes.seed,
          minDistanceFromHub: minD,
        },
      )
      out.push(...spokes)
    }

    return out
  }, [
    hubLandSpokes,
    markerConnections,
    markerPositions,
    minHubDistDefault,
    points,
    stagger,
    xStep,
    yToRowIndex,
  ])

  const gridLines =
    gridStep != null && gridStep > 0
      ? {
          vertical: Math.ceil(width / gridStep) + 1,
          horizontal: Math.ceil(height / gridStep) + 1,
        }
      : null

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-gray-500 dark:text-gray-500", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...svgProps}
    >
      {gridLines && gridStep ? (
        <g className="map-grid" pointerEvents="none" aria-hidden>
          {Array.from({ length: gridLines.vertical }, (_, i) => {
            const x = i * gridStep
            return (
              <line
                key={`gv-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke={gridColor}
                strokeWidth={0.22}
              />
            )
          })}
          {Array.from({ length: gridLines.horizontal }, (_, i) => {
            const y = i * gridStep
            return (
              <line
                key={`gh-${i}`}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke={gridColor}
                strokeWidth={0.22}
              />
            )
          })}
        </g>
      ) : null}

      {points.map((point, index) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        return (
          <circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill={dotColor}
            key={`${point.x}-${point.y}-${index}`}
          />
        )
      })}

      {destinationPoints.map((point, index) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        const x = point.x + offsetX
        const y = point.y
        const delayMs = (index * 17) % 3200
        return (
          <circle
            key={`dest-${point.x}-${point.y}-${index}`}
            cx={x}
            cy={y}
            r={destDotRadius}
            fill={markerColor}
            className={destinationDotClassName}
            style={{ animationDelay: `${delayMs}ms` }}
          />
        )
      })}

      {connectionPaths.map((conn, i) => {
        const dist = Math.hypot(conn.x2 - conn.x1, conn.y2 - conn.y1)
        const curve = Math.min(
          connectionCurve,
          Math.max(2.5, dist * 0.052),
        )
        const d = connectionPathD(
          conn.x1,
          conn.y1,
          conn.x2,
          conn.y2,
          curve,
        )
        const dur = 2.35 + (i % 7) * 0.22
        const begin = `${((i * 0.48) % 2.9).toFixed(2)}s`
        return (
          <g key={conn.key} pointerEvents="none" aria-hidden>
            <path
              d={d}
              fill="none"
              stroke={connectionColor}
              strokeOpacity={reducedMotion ? 0.38 : 0.2}
              strokeWidth={0.55}
              strokeLinecap="round"
              pathLength={100}
              className="map-connection-track"
            />
            {reducedMotion ? null : (
              <path
                d={d}
                fill="none"
                stroke={connectionColor}
                strokeOpacity={0.92}
                strokeWidth={0.72}
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="12 88"
                strokeDashoffset={0}
                className={cn("map-connection-pulse", connectionClassName)}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="100"
                  dur={`${dur}s`}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </path>
            )}
          </g>
        )
      })}

      {processedMarkers.map((marker, index) => {
        const pos = markerPositions[index]
        if (!pos) return null
        const { x, y, r } = pos
        const shouldPulse = pulse
          ? marker.pulse !== false
          : marker.pulse === true
        const pulseTo = r * 2.8

        return (
          <g key={`${marker.x}-${marker.y}-${index}`}>
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={markerColor}
              className="map-marker-core"
              style={{ animationDelay: `${index * 0.35}s` }}
            />

            {shouldPulse ? (
              <g pointerEvents="none">
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={1}
                  strokeWidth={0.35}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={0.9}
                  strokeWidth={0.3}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ) : null}

            {renderMarkerOverlay?.({
              marker: { ...marker, x, y },
              index,
              x,
              y,
              r,
            })}
          </g>
        )
      })}
    </svg>
  )
}
