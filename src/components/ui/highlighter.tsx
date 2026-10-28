"use client"

import * as React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import type { RoughAnnotation } from "rough-notation/lib/model"

import { cn } from "@/lib/utils"

const THEME_HIGHLIGHTER_ALPHA = 0.34

function readThemeHighlighterColor(): string {
  if (typeof document === "undefined") {
    return `hsl(199 89% 48% / ${THEME_HIGHLIGHTER_ALPHA})`
  }
  const hsl = getComputedStyle(document.documentElement)
    .getPropertyValue("--highlighter")
    .trim()
  if (!hsl) return `hsl(199 89% 48% / ${THEME_HIGHLIGHTER_ALPHA})`
  return `hsl(${hsl} / ${THEME_HIGHLIGHTER_ALPHA})`
}

function useThemeHighlighterColor(): string {
  const [value, setValue] = React.useState(() => readThemeHighlighterColor())

  React.useLayoutEffect(() => {
    const update = () => setValue(readThemeHighlighterColor())
    update()
    const el = document.documentElement
    const observer = new MutationObserver(update)
    observer.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return value
}

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

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

/** Defaults tuned for dark editorial copy (about story); rough.js keeps organic strokes. */
function defaultStrokeForAction(action: AnnotationAction): number {
  if (action === "underline") return 1.65
  return 1.2
}

function defaultDurationForAction(
  action: AnnotationAction,
  reducedMotion: boolean,
): number {
  if (reducedMotion) return 1
  if (action === "underline") return 820
  return 960
}

function defaultPaddingForAction(action: AnnotationAction): number {
  if (action === "underline") return 3
  return 5
}

export function Highlighter({
  children,
  action = "highlight",
  color,
  strokeWidth,
  animationDuration,
  iterations = 2,
  padding,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = React.useRef<HTMLSpanElement>(null)
  const themeColor = useThemeHighlighterColor()
  const resolvedColor = color ?? themeColor
  const reducedMotion = usePrefersReducedMotion()

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-12%",
  })

  const shouldShow = reducedMotion || !isView || isInView

  const resolvedStroke = strokeWidth ?? defaultStrokeForAction(action)
  const resolvedDuration =
    animationDuration ?? defaultDurationForAction(action, reducedMotion)
  const resolvedPadding = padding ?? defaultPaddingForAction(action)

  React.useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color: resolvedColor,
        strokeWidth: resolvedStroke,
        animationDuration: resolvedDuration,
        iterations: reducedMotion ? 1 : iterations,
        padding: resolvedPadding,
        multiline,
        animate: !reducedMotion,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation
      currentAnnotation.show()

      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide()
        currentAnnotation.show()
      })

      resizeObserver.observe(element)
      resizeObserver.observe(document.body)
    }

    return () => {
      annotation?.remove()
      resizeObserver?.disconnect()
    }
  }, [
    shouldShow,
    action,
    resolvedColor,
    resolvedStroke,
    resolvedDuration,
    iterations,
    resolvedPadding,
    multiline,
    reducedMotion,
  ])

  return (
    <span
      ref={elementRef}
      className={cn("relative inline-block bg-transparent")}
    >
      {children}
    </span>
  )
}
