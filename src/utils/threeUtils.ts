// Calculate the refraction angle using Snell's law
export function calculateRefractionAngle(incidentAngle: number): number {
  // Simplified refraction calculation for visual effect
  // n1 * sin(θ1) = n2 * sin(θ2)
  // Using approximate indices of refraction for visual effect
  const n1 = 1.0; // Air
  const n2 = 1.5; // Glass/prism
  
  // Clamp the incident angle to prevent NaN
  const sinTheta2 = (n1 / n2) * Math.sin(incidentAngle);
  
  // Check for total internal reflection
  if (Math.abs(sinTheta2) > 1.0) {
    return Math.sign(incidentAngle) * Math.PI / 4; // Approximate reflection
  }
  
  return Math.asin(sinTheta2) - incidentAngle;
}

// Linear interpolation for numeric values
export function lerp(object: any, prop: string, goal: number, alpha = 0.1): void {
  if (object && object[prop] !== undefined) {
    object[prop] = object[prop] + (goal - object[prop]) * alpha;
  }
}

// Linear interpolation for Vector3-like arrays
export function lerpV3(vector: any, target: [number, number, number], alpha = 0.1): void {
  if (vector && vector.x !== undefined) {
    vector.x = vector.x + (target[0] - vector.x) * alpha;
    vector.y = vector.y + (target[1] - vector.y) * alpha;
    vector.z = vector.z + (target[2] - vector.z) * alpha;
  }
} 