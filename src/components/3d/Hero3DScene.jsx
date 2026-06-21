import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Float, RoundedBox, ContactShadows, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Hero 3D centerpiece (PRD 6A.2 #1) — abstract glass hotel tower + floating accent nodes.
 *
 * PERFORMANCE (PRD 6A.4): tuned to be cheap, especially on mobile —
 *  - NO `transmission` material (that needs an extra full render pass per frame). We use a
 *    cheap semi-transparent MeshStandardMaterial that still reads as frosted glass.
 *  - NO HDR `Environment preset` (those fetch a ~1-2MB map). Instead a tiny one-frame baked
 *    environment from <Lightformer>s gives reflections with zero network cost.
 *  - Contact shadow is baked once (`frames={1}`), pixel ratio is capped + AdaptiveDpr
 *    auto-degrades on slow devices, AA is off on phones, fewer nodes on phones.
 *  - Render loop pauses when the hero is off-screen (parent flips `active`).
 */

const ACCENT = '#C2613F'
const ACCENT_SOFT = '#E29C7E'

function Tower({ lowPower }) {
  const group = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    // Idle auto-rotation (delta-based so it's frame-rate independent).
    group.current.rotation.y += delta * 0.18
    // Subtle mouse parallax, capped (no-op on touch where pointer stays at 0).
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.18, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.pointer.x * 0.25, 0.05)
  })

  const floors = [0, 1, 2, 3, 4]
  const nodeCount = lowPower ? 6 : 9

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {floors.map((i) => {
        const s = 1.9 - i * 0.18
        return (
          <RoundedBox key={i} args={[s, 0.55, s]} radius={0.08} smoothness={3} position={[0, i * 0.66 - 0.9, 0]}>
            {/* Cheap frosted-glass look: transparent standard material (no transmission). */}
            <meshStandardMaterial color="#ffffff" transparent opacity={0.72} roughness={0.15} metalness={0.2} envMapIntensity={1.3} />
          </RoundedBox>
        )
      })}

      {/* Accent crown */}
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1} smoothness={3} position={[0, 2.55, 0]}>
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.35} roughness={0.4} />
      </RoundedBox>

      {/* Tilted accent orbit ring */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[2.3, 0.018, 8, 48]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} roughness={0.4} />
      </mesh>

      {/* Floating "room/data" nodes */}
      {[...Array(nodeCount)].map((_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2
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

export default function Hero3DScene({ active = true, dpr = [1, 2], lowPower = false }) {
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'demand'}
      // Allow R3F to drop resolution on slow frames, then AdaptiveDpr applies it.
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0.5, 6], fov: 42 }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#ffffff', '#e6d2bf', 0.6]} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        <directionalLight position={[-5, 2, -3]} intensity={0.4} color={ACCENT_SOFT} />

        <Tower lowPower={lowPower} />

        <ContactShadows frames={1} position={[0, -1.3, 0]} opacity={0.35} scale={8} blur={2.6} far={3} color="#2B211B" />

        {/* Tiny baked env for glass reflections — rendered once, no HDR download. */}
        <Environment frames={1} resolution={64}>
          <Lightformer intensity={1.4} position={[3, 3, 4]} scale={4} />
          <Lightformer intensity={0.7} color={ACCENT_SOFT} position={[-4, 1, -2]} scale={4} />
        </Environment>

        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
