"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PresentationControls, Environment, ContactShadows, Float } from "@react-three/drei"
import type { Group } from "three"

function CreditCard(props: any) {
  const group = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  // Simple animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  // Create a simple credit card model
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} scale={[3.4, 2.1, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "#8b5cf6" : "#6d28d9"} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Card chip */}
      <mesh castShadow receiveShadow position={[-1, 0.5, 0.06]} scale={[0.8, 0.6, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e2c232" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Card number placeholder */}
      <mesh receiveShadow position={[0, -0.2, 0.06]} scale={[2.8, 0.3, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </mesh>

      {/* Card name placeholder */}
      <mesh receiveShadow position={[-0.8, -0.8, 0.06]} scale={[1.5, 0.2, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
      </mesh>
    </group>
  )
}

export default function CreditCardModel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-[400px] w-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.2} floatIntensity={0.5}>
            <CreditCard position={[0, 0, 0]} />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={1.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

