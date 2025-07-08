import * as THREE from 'three'
import { forwardRef, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

interface RainbowProps {
  startRadius?: number;
  endRadius?: number;
  fade?: number;
  visible?: boolean;
}

export const Rainbow = forwardRef<any, RainbowProps>(({ startRadius = 0, endRadius = 1, fade = 0.5, visible = true }, ref) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create a gradient texture for the rainbow effect
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 1
    const context = canvas.getContext('2d')!
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
    
    // Add rainbow colors
    gradient.addColorStop(0, '#ff0000') // Red
    gradient.addColorStop(0.17, '#ff9900') // Orange
    gradient.addColorStop(0.33, '#ffff00') // Yellow
    gradient.addColorStop(0.5, '#00ff00') // Green
    gradient.addColorStop(0.67, '#0099ff') // Blue
    gradient.addColorStop(0.83, '#6633ff') // Indigo
    gradient.addColorStop(1, '#ff00ff') // Violet
    
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    const rainbowTexture = new THREE.CanvasTexture(canvas)
    rainbowTexture.wrapS = THREE.RepeatWrapping
    rainbowTexture.wrapT = THREE.RepeatWrapping
    return rainbowTexture
  }, [])

  // Custom shader material for the rainbow
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        rainbow: { value: texture },
        fade: { value: fade }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D rainbow;
        uniform float fade;
        varying vec2 vUv;
        
        void main() {
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5) / (2.0 * 3.14159265) + 0.5;
          vec4 color = texture2D(rainbow, vec2(angle, 0.5));
          
          // Radial fade
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.0, fade, 1.0 - dist * 2.0);
          
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [texture, fade])

  // Expose material to parent
  if (ref) {
    // @ts-ignore
    ref.current = { material }
  }

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} visible={visible}>
      <ringGeometry args={[startRadius, endRadius, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
})

Rainbow.displayName = 'Rainbow' 