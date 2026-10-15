/** Eight-pointed khatam star: the one graphic device, drawn from zellige tilework. */
export default function Mark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <rect x="5.5" y="5.5" width="13" height="13" />
      <rect x="5.5" y="5.5" width="13" height="13" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
