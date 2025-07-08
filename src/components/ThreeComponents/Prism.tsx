import * as THREE from 'three'
import { useRef, useState, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'

interface PrismProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  onRayOver?: (event: any) => void;
  onRayOut?: (event: any) => void;
  onRayMove?: (event: any) => void;
}

export function Prism({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  onRayOver,
  onRayOut,
  onRayMove
}: PrismProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  // Create a triangular prism geometry
  useLayoutEffect(() => {
    if (!mesh.current) return
    
    // Create a custom triangular prism geometry
    const geometry = new THREE.BufferGeometry()
    
    // Define vertices for a triangular prism
    const vertices = new Float32Array([
      // Front face (triangle)
      0, 1, 0.5,
      -0.866, -0.5, 0.5,
      0.866, -0.5, 0.5,
      
      // Back face (triangle)
      0, 1, -0.5,
      -0.866, -0.5, -0.5,
      0.866, -0.5, -0.5,
      
      // Side faces (rectangles)
      0, 1, 0.5,
      0, 1, -0.5,
      -0.866, -0.5, 0.5,
      -0.866, -0.5, -0.5,
      
      0.866, -0.5, 0.5,
      0.866, -0.5, -0.5,
      0, 1, 0.5,
      0, 1, -0.5,
      
      -0.866, -0.5, 0.5,
      -0.866, -0.5, -0.5,
      0.866, -0.5, 0.5,
      0.866, -0.5, -0.5
    ])
    
    // Define indices for the faces
    const indices = [
      // Front face
      0, 1, 2,
      
      // Back face
      3, 5, 4,
      
      // Side faces
      6, 8, 9,
      6, 9, 7,
      
      10, 11, 13,
      10, 13, 12,
      
      14, 15, 17,
      14, 17, 16
    ]
    
    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    
    // Apply the geometry to the mesh
    mesh.current.geometry = geometry
  }, [])

  // Animate the prism
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
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
      onRayOver={onRayOver}
      onRayOut={onRayOut}
      onRayMove={onRayMove}
    >
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.95}
        roughness={0}
        ior={2.33}
        thickness={0.5}
        specularIntensity={1}
        envMapIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
} 