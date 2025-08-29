// Vertex shader used for both fluid simulation and display
export const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fluid simulation shader - creates wavy organic motion
export const fluidFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform vec2 uResolution;
  uniform float uBrushSize;
  uniform float uBrushStrength;
  uniform float uDistortionStrength;
  uniform float uDecayRate;
  uniform float uTime;
  
  varying vec2 vUv;
  
  // Create flowing wave patterns with smoother curves
  float wave(vec2 p, float freq, float amp, float speed) {
    float wave1 = sin(p.x * freq + uTime * speed) * cos(p.y * freq * 0.8 + uTime * speed * 0.6);
    float wave2 = cos(p.x * freq * 0.6 + uTime * speed * 1.2) * sin(p.y * freq * 1.1 + uTime * speed * 0.9);
    return (wave1 + wave2 * 0.7) * amp;
  }
  
  // Smooth curved noise for organic motion
  float smoothCurve(vec2 p, float scale, float time) {
    vec2 curved = p + vec2(
      sin(p.y * scale + time) * 0.3,
      cos(p.x * scale + time) * 0.3
    );
    return sin(curved.x * 3.14159) * cos(curved.y * 3.14159);
  }
  
  void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(uTexture, uv);
    
    float time = uTime * 0.2;
    
    // Create multiple smooth curved wave layers for organic flow
    float fluidTime = uTime * 0.3;
    
    float wave1 = wave(uv * 2.5, 5.0, 0.008, 1.2);
    float wave2 = wave(uv * 4.0, 7.0, 0.006, -1.8);
    float wave3 = wave(uv * 6.5, 4.0, 0.004, 2.3);
    
    // Add curved smooth motion layers
    float curve1 = smoothCurve(uv, 8.0, fluidTime * 1.5) * 0.005;
    float curve2 = smoothCurve(uv, 12.0, fluidTime * -2.0) * 0.003;
    
    // Combine waves and curves for complex smooth motion
    vec2 distortion = vec2(
      wave1 + wave2 * 0.8 + wave3 * 0.6 + curve1,
      wave2 + wave1 * 0.6 + wave3 * 0.9 + curve2
    ) * uDistortionStrength * 1.5;
    
    // Mouse interaction
    vec2 mouseUv = uMouse / uResolution;
    vec2 prevMouseUv = uPrevMouse / uResolution;
    mouseUv.y = 1.0 - mouseUv.y;
    prevMouseUv.y = 1.0 - prevMouseUv.y;
    
    float dist = distance(uv, mouseUv);
    vec2 mouseVelocity = mouseUv - prevMouseUv;
    float brush = smoothstep(uBrushSize * 2.0, 0.0, dist);
    
    // Mouse displacement
    vec2 mouseDisplacement = mouseVelocity * uBrushStrength * brush * 0.5;
    
    // Sample with distorted coordinates
    vec2 sampleUv = uv + distortion + mouseDisplacement;
    vec4 newColor = texture2D(uTexture, sampleUv);
    
    // Decay and blend
    color = mix(color * uDecayRate, newColor, 0.95);
    
    gl_FragColor = color;
  }
`;

// Display shader - renders the final gradient with wavy distortions
export const displayFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform float uColorIntensity;
  uniform float uBlendSoftness;
  uniform float uTime;
  
  varying vec2 vUv;
  
  // Smooth noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // Enhanced smooth noise for better contrast curves
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    // Smoother interpolation curve
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  // Turbulence function for more contrast variation
  float turbulence(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    
    for(int i = 0; i < 4; i++) {
      if(i >= octaves) break;
      value += amplitude * abs(smoothNoise(p * frequency));
      amplitude *= 0.6;
      frequency *= 2.0;
    }
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Sample fluid texture with wavy distortion
    vec4 fluidData = texture2D(uTexture, uv);
    
    // Create more curvy and contrasted gradient mixing
    float time = uTime * 0.2;
    
    // Enhanced curved displacement
    vec2 waveUv = uv + vec2(
      sin(uv.y * 15.0 + time * 2.5) * cos(uv.x * 8.0 + time * 1.8) * 0.06,
      cos(uv.x * 12.0 + time * 3.2) * sin(uv.y * 10.0 + time * 2.1) * 0.06
    );
    
    // Generate dynamic smooth gradient zones with turbulence
    float turb1 = turbulence(waveUv * 2.0 + time * 0.5, 3);
    float turb2 = turbulence(waveUv * 3.5 - time * 0.7 + 50.0, 3);
    
    float zone1 = smoothNoise(waveUv * 2.5 + time * 0.8) * turb1;
    float zone2 = smoothNoise(waveUv * 3.8 - time * 0.6 + 100.0) * turb2;
    float zone3 = smoothNoise(waveUv * 4.2 + time * 1.1 + 200.0);
    float zone4 = smoothNoise(waveUv * 3.1 - time * 0.9 + 300.0);
    
    // Add contrast enhancement
    zone1 = pow(zone1, 1.3);
    zone2 = pow(zone2, 1.2);
    zone3 = pow(zone3, 1.1);
    zone4 = pow(zone4, 1.2);
    
    // Normalize zones
    float total = zone1 + zone2 + zone3 + zone4;
    zone1 /= total;
    zone2 /= total;
    zone3 /= total;
    zone4 /= total;
    
    // Mix colors with fluid influence
    vec3 finalColor = uColor1 * zone1 + 
                     uColor2 * zone2 + 
                     uColor3 * zone3 + 
                     uColor4 * zone4;
    
    // Apply enhanced fluid distortion with more contrast
    vec3 fluidInfluence = fluidData.rgb * 0.25;
    finalColor = mix(finalColor, finalColor + fluidInfluence, uBlendSoftness);
    
    // Add subtle contrast boost for more definition
    finalColor = mix(finalColor, finalColor * finalColor * 2.0, 0.1);
    
    // Apply color intensity
    finalColor *= uColorIntensity;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
