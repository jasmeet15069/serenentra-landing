import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Platform "module constellation" (PRD 6A.2 #2).
 * SCROLL-SCRUBBED: parent updates `progressRef.current` (0→1) from a ScrollTrigger
 * tied to the section's scroll range. At 0 nodes are scattered + lines hidden;
 * at 1 they settle into a ring connected to the central MHMS hub.
 *
 * Reads progress via a ref (no React re-render per frame). 1:1 with scroll (PRD 6A.5).
 */

const ACCENT = '#C2613F'

function Scene({ modules, progressRef }) {
  const groupRef = useRef(null)
  const nodeRefs = useRef([])
  const linesRef = useRef(null)
  const hub = useMemo(() => new THREE.Vector3(0, 0, 0), [])
  // Reusable scratch vector so the per-frame loop allocates nothing (no GC churn).
  const tmp = useMemo(() => new THREE.Vector3(), [])

  // Final (connected) ring positions + scattered (start) positions per module.
  const layout = useMemo(() => {
    return modules.map((_, i) => {
      const angle = (i / modules.length) * Math.PI * 2
      const settled = new THREE.Vector3(Math.cos(angle) * 2.4, Math.sin(angle) * 1.5, 0)
      // Deterministic-ish scattered start, pushed outward + back.
      const scattered = new THREE.Vector3(
        Math.cos(angle) * 5.5 + (i % 2 ? 1 : -1),
        Math.sin(angle * 1.7) * 3.2,
        -3.5 - (i % 3)
      )
      return { settled, scattered }
    })
  }, [modules])

  // Line segments hub<->each node (2 verts each), positions mutated each frame.
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(modules.length * 2 * 3), 3))
    return g
  }, [modules.length])

  useFrame((state) => {
    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1)
    // ease
    const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2

    const posAttr = lineGeo.getAttribute('position')
    layout.forEach((l, i) => {
      const cur = tmp.lerpVectors(l.scattered, l.settled, e)
      const mesh = nodeRefs.current[i]
      if (mesh) {
        mesh.position.copy(cur)
        mesh.scale.setScalar(0.6 + e * 0.4)
      }
      posAttr.setXYZ(i * 2, hub.x, hub.y, hub.z)
      posAttr.setXYZ(i * 2 + 1, cur.x, cur.y, cur.z)
    })
    posAttr.needsUpdate = true
    if (linesRef.current) linesRef.current.material.opacity = e * 0.5

    // Gentle overall drift for life.
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* central hub */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} roughness={0.3} />
      </mesh>
      {/* "MHMS" hub label is overlaid in HTML by the parent (avoids remote font fetch) */}

      {/* connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0} />
      </lineSegments>

      {/* module nodes */}
      {modules.map((m, i) => (
        <group key={m}>
          <mesh ref={(el) => (nodeRefs.current[i] = el)}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshStandardMaterial color="#ffffff" emissive={ACCENT} emissiveIntensity={0.12} roughness={0.35} metalness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function PlatformConstellation3D({ modules, progressRef, active = true }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'demand'}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Lights only — no HDR Environment fetch. Nodes are emissive so they pop regardless. */}
        <ambientLight intensity={0.9} />
        <hemisphereLight args={['#ffffff', '#e6d2bf', 0.5]} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} />
        <Scene modules={modules} progressRef={progressRef} />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
