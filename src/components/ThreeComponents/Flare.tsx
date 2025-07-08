import * as THREE from 'three'
import { forwardRef, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

interface FlareProps {
  streak?: [number, number, number];
  scale?: number;
  visible?: boolean;
  renderOrder?: number;
}

export const Flare = forwardRef<any, FlareProps>(({ streak = [12, 20, 1], scale = 1, visible = true, renderOrder = 0 }, ref) => {
  const groupRef = useRef<THREE.Group>(null)
  const flareRef = useRef<THREE.Mesh>(null)
  const streakRef = useRef<THREE.Mesh>(null)
  
  // Create a radial gradient texture for the flare
  const flareTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const context = canvas.getContext('2d')!
    
    // Create radial gradient
    const gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    )
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.5, 'rgba(255, 220, 220, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 180, 180, 0)')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
  
  // Create a streak texture
  const streakTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const context = canvas.getContext('2d')!
    
    // Create horizontal gradient for streak
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.5)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Expose refs to parent
  if (ref) {
    // @ts-ignore
    ref.current = groupRef.current
  }

  return (
    <group ref={groupRef} visible={visible} renderOrder={renderOrder}>
      {/* Main flare */}
      <mesh ref={flareRef} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          map={flareTexture} 
          transparent 
          depthWrite={false} 
          depthTest={false} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
      
      {/* Streak */}
      <mesh ref={streakRef} scale={[streak[0] * scale, streak[1] * scale, streak[2] * scale]}>
        <planeGeometry args={[1, 0.2]} />
        <meshBasicMaterial 
          map={streakTexture} 
          transparent 
          depthWrite={false} 
          depthTest={false} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  )
})

Flare.displayName = 'Flare' 