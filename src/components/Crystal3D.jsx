import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'

function MagicOrb() {
  const ringRef  = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ringRef.current)  ringRef.current.rotation.z  =  t * 0.25
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.18
  })

  return (
    <group>
      {/* Outer soft halo */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshStandardMaterial color="#e9d5ff" transparent opacity={0.07} depthWrite={false} />
      </mesh>

      {/* Main morphing orb */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.55, 4]} />
          <MeshDistortMaterial
            color="#a855f7"
            distort={0.4}
            speed={2}
            roughness={0.05}
            metalness={0.2}
          />
        </mesh>
      </Float>

      {/* Inner bright core */}
      <Float speed={2.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh>
          <sphereGeometry args={[0.82, 32, 32]} />
          <MeshWobbleMaterial
            color="#f0abfc"
            factor={0.45}
            speed={2.5}
            transparent
            opacity={0.55}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Ring 1 */}
      <group rotation={[Math.PI / 2.5, 0.3, 0]}>
        <mesh ref={ringRef}>
          <torusGeometry args={[2.3, 0.025, 16, 120]} />
          <meshStandardMaterial color="#f9a8d4" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Ring 2 */}
      <group rotation={[Math.PI / 3.5, 0.8, 0.2]}>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.65, 0.015, 16, 120]} />
          <meshStandardMaterial color="#c4b5fd" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Floating micro-dots */}
      {[
        [ 2.2,  0.5,  0.0, '#f9a8d4'],
        [-2.0,  0.8,  0.5, '#c4b5fd'],
        [ 0.5,  2.2, -0.3, '#f0abfc'],
        [-0.8, -2.1,  0.2, '#fbcfe8'],
        [ 1.8, -1.1,  0.8, '#e9d5ff'],
      ].map(([x, y, z, color], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </mesh>
      ))}
    </group>
  )
}

export default function Crystal3D({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[ 4,  6,  4]} intensity={2.0} color="#f0abfc" />
        <directionalLight position={[-4, -3, -4]} intensity={0.8} color="#c4b5fd" />
        <pointLight       position={[ 0,  4,  3]} intensity={2.5} color="#fdf4ff" />
        <pointLight       position={[ 2, -3, -2]} intensity={1.0} color="#f472b6" />
        <pointLight       position={[-3,  2,  1]} intensity={1.2} color="#a78bfa" />

        <Suspense fallback={null}>
          <MagicOrb />
        </Suspense>
      </Canvas>
    </div>
  )
}
