/**
 * Background ambient layer.
 *
 * Previously rendered a red neon vertical-particle stream on canvas —
 * a generic "AI startup" aesthetic that the brand audit flagged as a
 * household-name liability. Replaced with a flat dark surface that
 * lets typography and content do the talking.
 *
 * Kept as a component (rather than removed from Home.tsx) so we can
 * later swap in a kilim / ebru / hat motif without touching consumers.
 */
export default function DataStreamCanvas() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 bg-bg-obsidian"
      style={{ zIndex: 0 }}
    />
  )
}
