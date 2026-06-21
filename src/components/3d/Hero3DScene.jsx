import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Hero 3D centerpiece (PRD 6A.2 #1): an abstract, premium "glass hotel tower" of
 * stacked frosted panels with floating accent nodes (rooms/data).
 *
 * - Idles with slow auto-rotation.
 * - Subtle mouse parallax tilt (capped, ~8-10°, no extreme spin) — PRD 6A.2.
 * - Low poly + MeshStandard/Physical materials + one Environment preset (PRD 6A.4).
 * - Pixel ratio capped, frameloop pauses when off-screen (handled by parent via `active`).
 *
 * Palette: cream/sand neutrals + terracotta accent (PRD 6A.6 — bespoke, not neon).
 */

const ACCENT = '#C2613F'
const ACCENT_SOFT = '#E29C7E'

function Tower() {
  const group = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    // Idle auto-rotation.
    group.current.rotation.y += delta * 0.18
    // Mouse parallax: tilt toward pointer, capped to a subtle range.
    const px = state.pointer.x
    const py = state.pointer.y
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.18, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, px * 0.25, 0.05)
  })

  // Stacked floors -> a tapered tower of frosted glass panels.
  const floors = [0, 1, 2, 3, 4]
  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {floors.map((i) => {
        const w = 1.9 - i * 0.18
        const d = 1.9 - i * 0.18
        return (
          <RoundedBox
            key={i}
            args={[w, 0.55, d]}
            radius={0.08}
            smoothness={4}
            position={[0, i * 0.66 - 0.9, 0]}
          >
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.6}
              thickness={0.6}
              roughness={0.25}
              metalness={0}
              clearcoat={0.6}
              clearcoatRoughness={0.3}
              ior={1.3}
              transparent
              opacity={0.92}
            />
          </RoundedBox>
        )
      })}

      {/* Accent crown */}
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1} smoothness={4} position={[0, 2.55, 0]}>
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} roughness={0.4} />
      </RoundedBox>

      {/* Tilted accent orbit ring for visual interest */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[2.3, 0.018, 10, 80]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} roughness={0.4} />
      </mesh>

      {/* Floating "room/data" nodes orbiting the tower */}
      {[...Array(9)].map((_, i) => {
        const angle = (i / 9) * Math.PI * 2
        const r = 1.7 + (i % 2) * 0.5
        return (
          <Float key={i} speed={2} rotationIntensity={0.4} floatIntensity={0.9}>
            <mesh position={[Math.cos(angle) * r, (i % 3) * 0.7 - 0.5, Math.sin(angle) * r]}>
              <icosahedronGeometry args={[0.12 + (i % 3) * 0.03, 0]} />
              <meshStandardMaterial
                color={i % 2 ? ACCENT : ACCENT_SOFT}
                emissive={i % 2 ? ACCENT : ACCENT_SOFT}
                emissiveIntensity={0.5}
                roughness={0.3}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

export default function Hero3DScene({ active = true, dpr = [1, 2] }) {
  return (
    <Canvas
      // Cap pixel ratio to protect high-DPI perf (PRD 6A.4); phones pass a lower cap.
      dpr={dpr}
      // Pause render loop when off-screen (parent flips `active`) — PRD 6A.4.
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 0.5, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        <directionalLight position={[-5, 2, -3]} intensity={0.4} color={ACCENT_SOFT} />
        <Tower />
        <ContactShadows position={[0, -1.3, 0]} opacity={0.35} scale={8} blur={2.6} far={3} color="#2B211B" />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
