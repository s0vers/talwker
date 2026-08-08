/** Zero-based index → "01", "02", … */
export function formatStoryIndex(index: number): string {
	return String(index + 1).padStart(2, "0");
}
