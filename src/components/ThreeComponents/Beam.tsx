import * as THREE from 'three'
import { forwardRef, useRef, useMemo, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'

interface BeamProps {
  children: React.ReactNode;
  bounce?: number;
  far?: number;
}

export const Beam = forwardRef<any, BeamProps>(({ children, bounce = 10, far = 10 }, ref) => {
  const line = useRef<THREE.LineSegments>(null)
  const raycast = useMemo(() => new THREE.Raycaster(), [])
  const points = useMemo(() => new Float32Array(bounce * 3), [bounce])
  const geometry = useMemo(() => new THREE.BufferGeometry(), [])
  const [ray, setRay] = useMemo(() => {
    const from = new THREE.Vector3(0, 0, 0)
    const to = new THREE.Vector3(0, 0, 0)
    const direction = new THREE.Vector3(0, 0, 0)
    return [{ from, to, direction }, (origin: [number, number, number], target: [number, number, number]) => {
      from.set(...origin)
      to.set(...target)
      direction.copy(to).sub(from).normalize()
    }]
  }, [])

  useImperativeHandle(ref, () => ({
    setRay,
    ...ray
  }), [ray, setRay])

  useFrame(() => {
    if (!line.current) return
    
    const intersections: THREE.Intersection[] = []
    const tempVec = new THREE.Vector3()
    const tempObj = new THREE.Object3D()
    const tempNormal = new THREE.Vector3()

    let count = 1
    let intersect = null
    let i = 0

    ray.from.toArray(points, 0)
    for (i = 0; i < bounce; i++) {
      raycast.set(ray.from, ray.direction)
      intersect = raycast.intersectObjects((line.current.parent as THREE.Object3D).children, false)[0] || null

      if (intersect) {
        intersections.push(intersect)
        // Get the reflection ray
        tempNormal.copy(intersect.face!.normal)
        tempObj.position.copy(intersect.point)
        tempObj.lookAt(tempNormal.add(intersect.point))
        tempObj.up.copy(ray.direction).multiplyScalar(-1)
        tempObj.updateMatrixWorld()
        ray.from.copy(intersect.point)
        ray.direction.copy(ray.direction).reflect(intersect.face!.normal)
        ray.from.toArray(points, i * 3)
        count++
      } else {
        // If there's no intersection, extend the ray into the distance
        tempVec.copy(ray.from).add(ray.direction.multiplyScalar(far))
        ray.from.toArray(points, i * 3)
        ray.from.copy(tempVec)
        count++
        break
      }
    }

    // Update the line geometry with new points
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    geometry.attributes.position.needsUpdate = true
    geometry.setDrawRange(0, count)

    // Notify intersections
    if (intersections.length) {
      for (i = 0; i < intersections.length; i++) {
        const intersect = intersections[i]
        const object = intersect.object as any
        const api = {
          number: i + 1,
          points,
          positions: points,
          ray,
          intersect
        }
        
        if (object.onRayOver) object.onRayOver({ api, ...intersect })
        if (object.onRayMove) object.onRayMove({ api, ...intersect })
        if (object.onRayOut) object.onRayOut({ api, ...intersect })
      }
    }
  })

  return (
    <group>
      <lineSegments ref={line}>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial attach="material" color="white" transparent opacity={0.5} />
      </lineSegments>
      {children}
    </group>
  )
})

Beam.displayName = 'Beam' 