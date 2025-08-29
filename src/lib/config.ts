// Configuration object for the gradient fluid background
export const gradientConfig = {
  // Brush settings for more evident organic wave displacement
  brushSize: 0.2,          // Larger brush for broader visible waves
  brushStrength: 0.8,      // Stronger for more pronounced waves
  
  // Distortion settings for more evident wavy fluid motion
  distortionStrength: 0.4,  // Higher for more visible wave effects
  trailLength: 0.95,        // Shorter trails for more dynamic waves
  decayRate: 0.988,         // Faster decay for more active motion
  
  // Visual settings for enhanced curvy smooth contrasts
  colorIntensity: 0.9,      // Higher intensity for better contrast
  blendSoftness: 0.94,      // Slightly less smooth for more definition
  
  // Smooth slightly darker to light grey gradient with good contrast
  colors: {
    color1: "#0a0a0a",     // Slightly darker base
    color2: "#252525",     // Medium dark grey
    color3: "#454545",     // Medium grey
    color4: "#757575",     // Light grey (keeping good contrast)
  }
};

// Helper function to convert hex to normalized RGB
export const hexToRGB = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

export type GradientConfig = typeof gradientConfig;
