/** Top-down illustrated plates, drawn in SVG from each dish's palette. */
export default function DishArt({ art, palette, className = '' }) {
  const [a, b, c] = palette
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="104" r="88" fill="#000" opacity=".12" />
      <circle cx="100" cy="100" r="88" fill="#FFFBF3" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#1F8A84" strokeWidth="5" strokeDasharray="2 9" opacity=".7" />
      <circle cx="100" cy="100" r="74" fill="#F3E4C8" />
      <Food art={art} a={a} b={b} c={c} />
    </svg>
  )
}

function Food({ art, a, b, c }) {
  switch (art) {
    case 'soup':
      return (
        <g>
          <circle cx="100" cy="100" r="62" fill="#B5482D" />
          <circle cx="100" cy="100" r="54" fill={a} />
          <circle cx="92" cy="92" r="40" fill={b} opacity=".5" />
          {[[80, 86], [112, 80], [96, 118], [124, 108], [76, 112], [104, 96]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#F2D28B" />)}
          {[[90, 76], [118, 96], [84, 104], [108, 122], [70, 96]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q4 -6 8 0 q-4 6 -8 0z`} fill={c} />)}
        </g>
      )
    case 'salad':
      return (
        <g>
          {[[80, 82, 26, a], [122, 86, 24, b], [100, 122, 28, c], [72, 116, 18, b], [128, 120, 18, a]].map(([x, y, r, f], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={f} />
          ))}
          {[[84, 76], [118, 92], [100, 116], [92, 128], [130, 112]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#FFFBF3" opacity=".7" />)}
        </g>
      )
    case 'pastry':
      return (
        <g>
          {[[0, 70, 70], [120, 108, 74], [240, 92, 112]].map(([r, x, y], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <path d="M-26 14 L0 -30 L26 14 Z" fill={i % 2 ? b : a} stroke="#8C5A2B" strokeOpacity=".3" strokeWidth="2" />
              <path d="M-12 4 L0 -16 L12 4" fill="none" stroke="#FFFBF3" strokeOpacity=".5" strokeWidth="2" />
            </g>
          ))}
          {[[100, 140], [70, 128], [132, 132]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill={c} />)}
        </g>
      )
    case 'tajine':
      return (
        <g>
          <circle cx="100" cy="100" r="66" fill="#B5482D" />
          <circle cx="100" cy="100" r="58" fill="#8F3A24" />
          <circle cx="100" cy="100" r="52" fill={a} opacity=".95" />
          <ellipse cx="96" cy="98" rx="26" ry="20" fill={b} />
          {[[70, 80], [130, 84], [124, 126], [74, 124]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="11" fill="#F7E3A1" />
              <circle cx={x} cy={y} r="8" fill="#F2C14E" />
              <path d={`M${x - 8} ${y} h16 M${x} ${y - 8} v16`} stroke="#F7E3A1" strokeWidth="1.5" />
            </g>
          ))}
          {[[100, 70], [132, 104], [100, 132], [66, 102]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={c} />)}
        </g>
      )
    case 'couscous':
      return (
        <g>
          <circle cx="100" cy="100" r="62" fill={a} />
          {Array.from({ length: 40 }, (_, i) => {
            const ang = i * 2.4
            const r = 6 + (i % 10) * 5
            return <circle key={i} cx={100 + Math.cos(ang) * r} cy={100 + Math.sin(ang) * r} r="1.6" fill="#C99A3A" />
          })}
          {[0, 60, 120, 180, 240, 300].map((r, i) => (
            <rect key={r} x="96" y="58" width="8" height="30" rx="4" fill={i % 2 ? c : '#E07A4F'} transform={`rotate(${r} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="16" fill={b} />
        </g>
      )
    case 'grill':
      return (
        <g>
          {[-22, 0, 22].map((dy, i) => (
            <g key={i} transform={`rotate(-20 100 100) translate(0 ${dy})`}>
              <line x1="40" y1="100" x2="162" y2="100" stroke="#8C5A2B" strokeWidth="3" />
              {[56, 80, 104, 128].map((x, j) => <rect key={x} x={x} y="90" width="20" height="20" rx="6" fill={j % 2 ? b : a} />)}
            </g>
          ))}
          {[[60, 140], [146, 66], [140, 136]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill={c} />)}
        </g>
      )
    case 'fish':
      return (
        <g transform="rotate(-18 100 100)">
          <path d="M40 100 C70 64 130 64 152 100 C130 136 70 136 40 100Z" fill={a} />
          <path d="M152 100 l22 -20 v40z" fill={a} />
          {[70, 90, 110, 130].map((x) => <path key={x} d={`M${x} 82 q8 18 0 36`} stroke="#E8A33D" strokeWidth="3" fill="none" />)}
          <circle cx="56" cy="96" r="4" fill="#1D1B16" />
          <circle cx="100" cy="146" r="12" fill={b} />
          <circle cx="126" cy="56" r="7" fill={c} />
        </g>
      )
    case 'fruit':
      return (
        <g>
          {[[78, 80], [122, 82], [100, 122], [70, 124], [132, 124]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="22" fill={a} />
              <circle cx={x} cy={y} r="18" fill={b} />
              {[0, 45, 90, 135].map((r) => <line key={r} x1={x - 18} y1={y} x2={x + 18} y2={y} stroke={a} strokeWidth="1.5" transform={`rotate(${r} ${x} ${y})`} />)}
            </g>
          ))}
          {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={60 + ((i * 37) % 84)} cy={66 + ((i * 53) % 76)} r="1.8" fill={c} />)}
        </g>
      )
    case 'tea':
      return (
        <g>
          <circle cx="100" cy="100" r="40" fill="#E9F2E4" opacity=".6" />
          <circle cx="100" cy="100" r="34" fill={a} />
          <circle cx="94" cy="94" r="16" fill="#E8B04A" opacity=".6" />
          {[[86, 104, -30], [104, 90, 20], [110, 110, 70]].map(([x, y, r], i) => (
            <path key={i} d="M0 -10 C8 -4 8 4 0 10 C-8 4 -8 -4 0 -10Z" fill={b} transform={`translate(${x} ${y}) rotate(${r})`} />
          ))}
          <circle cx="146" cy="146" r="14" fill="#C0C7CC" />
          <circle cx="146" cy="146" r="8" fill="#E1E6E9" />
        </g>
      )
    case 'juice':
      return (
        <g>
          <circle cx="100" cy="100" r="40" fill="#FFFFFF" opacity=".7" />
          <circle cx="100" cy="100" r="34" fill={a} />
          <circle cx="100" cy="100" r="22" fill={b} />
          {[[64, 140], [140, 62], [146, 132]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="10" ry="6" fill={c} transform={`rotate(${i * 50} ${x} ${y})`} />)}
        </g>
      )
    case 'coffee':
    default:
      return (
        <g>
          <circle cx="100" cy="100" r="40" fill={c} />
          <circle cx="100" cy="100" r="32" fill={a} />
          <path d="M100 82 C114 92 114 108 100 118 C86 108 86 92 100 82Z" fill={b} />
          <rect x="138" y="94" width="22" height="12" rx="6" fill={c} />
        </g>
      )
  }
}
