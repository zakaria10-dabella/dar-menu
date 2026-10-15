import { lazy, Suspense, useState } from 'react'
import { hasWebGL } from '../three/webgl'

const Tajine = lazy(() => import('../three/Tajine'))

export function TajineStage({ className = '' }) {
  const [webgl] = useState(hasWebGL)
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-[15%] rounded-full bg-saffron-500/25 blur-3xl" />
      {webgl ? (
        <Suspense fallback={<TajineFallback />}>
          <Tajine />
        </Suspense>
      ) : (
        <TajineFallback />
      )}
    </div>
  )
}

function TajineFallback() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto h-3/4 w-3/4" aria-hidden="true">
      <path d="M100 30c-30 40-52 74-58 110h116c-6-36-28-70-58-110z" fill="#C65D3B" />
      <circle cx="100" cy="26" r="8" fill="#E8A33D" />
      <rect x="28" y="140" width="144" height="16" rx="8" fill="#B5482D" />
    </svg>
  )
}

export function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#E8A33D" />
      <path d="M20 9c-5 6-8 11-9 17h18c-1-6-4-11-9-17z" fill="#0F3D33" />
      <circle cx="20" cy="8" r="2" fill="#0F3D33" />
      <rect x="9" y="26" width="22" height="3.5" rx="1.75" fill="#0F3D33" />
    </svg>
  )
}
