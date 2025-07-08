import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

interface BoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export function Box({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: BoxProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#2a9d8f' : '#e9c46a'} 
        roughness={0.5} 
        metalness={0.8} 
      />
    </mesh>
  )
} 