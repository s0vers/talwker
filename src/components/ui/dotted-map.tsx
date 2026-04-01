import * as React from "react"
import { createMap } from "svg-dotted-map"

import { cn } from "@/lib/utils"

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
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps<M>) {
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

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-gray-500 dark:text-gray-500", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...svgProps}
    >
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

      {processedMarkers.map((marker, index) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0

        const x = marker.x + offsetX
        const y = marker.y
        const r = marker.size ?? dotRadius
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
