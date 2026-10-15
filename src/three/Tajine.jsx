import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

const v = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y))

// Lathe profiles: [radius, height]
const BASE = v([[0, 0], [1.2, 0], [1.38, 0.04], [1.55, 0.16], [1.66, 0.32], [1.62, 0.37], [1.5, 0.33], [1.34, 0.24], [0, 0.24]])
const LID = v([[1.34, 0.28], [1.31, 0.38], [1.16, 0.56], [0.92, 0.88], [0.66, 1.28], [0.46, 1.7], [0.33, 2.06], [0.26, 2.3], [0.2, 2.42], [0, 2.44]])

function radiusAt(y) {
  for (let i = 1; i < LID.length; i++) {
    if (y <= LID[i].y) {
      const a = LID[i - 1]
      const b = LID[i]
      return a.x + ((y - a.y) / (b.y - a.y)) * (b.x - a.x)
    }
  }
  return 0
}

function Band({ y, color, thick = 0.035 }) {
  return (
    <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radiusAt(y) + 0.01, thick, 10, 72]} />
      <meshStandardMaterial color={color} roughness={0.35} />
    </mesh>
  )
}

function Steam({ open }) {
  const group = useRef()
  const seeds = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ x: Math.sin(i * 2.3) * 0.35, z: Math.cos(i * 1.7) * 0.35, o: i / 16, s: 0.12 + (i % 4) * 0.04 })), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.children.forEach((m, i) => {
      const s = seeds[i]
      const p = (t * 0.35 + s.o) % 1
      m.position.set(s.x + Math.sin(t * 1.3 + i) * 0.12 * p, 0.4 + p * 2.2, s.z)
      m.scale.setScalar(s.s * (0.6 + p * 1.8))
      m.material.opacity = THREE.MathUtils.damp(m.material.opacity, open ? Math.sin(p * Math.PI) * 0.35 : 0, 4, 0.016)
    })
  })
  return (
    <group ref={group}>
      {seeds.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function Model() {
  const lid = useRef()
  const [open, setOpen] = useState(false)
  const touched = useRef(false)
  useEffect(() => {
    const t = setTimeout(() => !touched.current && setOpen(true), 1400)
    return () => clearTimeout(t)
  }, [])
  useFrame((_, dt) => {
    lid.current.position.y = THREE.MathUtils.damp(lid.current.position.y, open ? 1.15 : 0, 5, dt)
    lid.current.position.x = THREE.MathUtils.damp(lid.current.position.x, open ? -0.35 : 0, 5, dt)
    lid.current.rotation.z = THREE.MathUtils.damp(lid.current.rotation.z, open ? 0.32 : 0, 5, dt)
  })
  const toggle = (e) => {
    e.stopPropagation()
    touched.current = true
    setOpen((o) => !o)
  }
  return (
    <group onClick={toggle} onPointerOver={() => (document.body.style.cursor = 'pointer')} onPointerOut={() => (document.body.style.cursor = '')}>
      {/* base dish */}
      <mesh>
        <latheGeometry args={[BASE, 72]} />
        <meshStandardMaterial color="#B5482D" roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.03, 8, 72]} />
        <meshStandardMaterial color="#1F8A84" roughness={0.3} />
      </mesh>
      {/* food */}
      <mesh position={[0, 0.3, 0]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#E3B23C" roughness={0.7} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.9, 0.3, Math.sin(a) * 0.9]} rotation={[-0.2, a, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.05, 20]} />
            <meshStandardMaterial color={i % 2 ? '#F2C14E' : '#6B8E23'} roughness={0.5} />
          </mesh>
        )
      })}
      {/* lid */}
      <group ref={lid}>
        <mesh>
          <latheGeometry args={[LID, 72]} />
          <meshStandardMaterial color="#C65D3B" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <Band y={0.5} color="#F3E4C8" thick={0.05} />
        <Band y={0.62} color="#1F8A84" />
        <Band y={1.05} color="#E8A33D" thick={0.04} />
        <Band y={1.62} color="#1F8A84" />
        <Band y={2.05} color="#F3E4C8" />
        {Array.from({ length: 22 }, (_, i) => {
          const a = (i / 22) * Math.PI * 2
          const r = radiusAt(0.82) + 0.005
          return (
            <mesh key={i} position={[Math.cos(a) * r, 0.82, Math.sin(a) * r]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#F3E4C8" roughness={0.4} />
            </mesh>
          )
        })}
        <mesh position={[0, 2.56, 0]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#E8A33D" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>
      <Steam open={open} />
    </group>
  )
}

export default function Tajine() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 3, 8.2], fov: 34 }} gl={{ antialias: true, alpha: true }} onCreated={({ camera }) => camera.lookAt(0, 0.8, 0)}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={2.4} color="#FFE7C2" />
      <pointLight position={[-3, 2, -2]} intensity={14} color="#E8A33D" />
      <PresentationControls global rotation={[0, 0.4, 0]} polar={[-0.15, 0.25]} azimuth={[-Infinity, Infinity]} config={{ mass: 1, tension: 160, friction: 24 }}>
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.4}>
          <group position={[0, -0.7, 0]}>
            <Model />
          </group>
        </Float>
      </PresentationControls>
      <ContactShadows position={[0, -0.85, 0]} opacity={0.5} scale={7} blur={2.4} far={2} color="#0A2A23" />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} color="#FFF1DC" />
        <Lightformer intensity={1} position={[-5, 1, 0]} scale={[1, 4, 1]} color="#1F8A84" />
      </Environment>
    </Canvas>
  )
}
