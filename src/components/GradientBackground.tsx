"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { vertexShader, fluidFragmentShader, displayFragmentShader } from '@/lib/shaders';
import { gradientConfig, hexToRGB, type GradientConfig } from '@/lib/config';

interface GradientBackgroundProps {
  config?: Partial<GradientConfig>;
  className?: string;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  config = {}, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const fluidMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const displayMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const renderTargetARef = useRef<THREE.WebGLRenderTarget | null>(null);
  const renderTargetBRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const quadRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(false);
  const lastMouseTimeRef = useRef(0);
  
  // Animation state
  const timeRef = useRef(0);
  const frameRef = useRef(0);
  const currentTargetRef = useRef(0); // 0 or 1 for ping-pong
  
  // Merge config with defaults
  const mergedConfig = { ...gradientConfig, ...config };

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!canvasRef.current || rendererRef.current) return; // Prevent double initialization

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: true,
      precision: 'highp'
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create orthographic camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create render targets for ping-pong rendering
    const renderTargetA = new THREE.WebGLRenderTarget(rect.width, rect.height, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });
    const renderTargetB = renderTargetA.clone();
    renderTargetARef.current = renderTargetA;
    renderTargetBRef.current = renderTargetB;

    // Create fullscreen quad geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Create fluid simulation material
    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fluidFragmentShader,
      uniforms: {
        uTexture: { value: null },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPrevMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(rect.width, rect.height) },
        uBrushSize: { value: mergedConfig.brushSize },
        uBrushStrength: { value: mergedConfig.brushStrength },
        uDistortionStrength: { value: mergedConfig.distortionStrength },
        uDecayRate: { value: mergedConfig.decayRate },
        uTime: { value: 0 },
        uFrame: { value: 0 },
      },
    });
    fluidMaterialRef.current = fluidMaterial;

    // Create display material
    const [r1, g1, b1] = hexToRGB(mergedConfig.colors.color1);
    const [r2, g2, b2] = hexToRGB(mergedConfig.colors.color2);
    const [r3, g3, b3] = hexToRGB(mergedConfig.colors.color3);
    const [r4, g4, b4] = hexToRGB(mergedConfig.colors.color4);

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: {
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(rect.width, rect.height) },
        uColor1: { value: new THREE.Vector3(r1, g1, b1) },
        uColor2: { value: new THREE.Vector3(r2, g2, b2) },
        uColor3: { value: new THREE.Vector3(r3, g3, b3) },
        uColor4: { value: new THREE.Vector3(r4, g4, b4) },
        uColorIntensity: { value: mergedConfig.colorIntensity },
        uBlendSoftness: { value: mergedConfig.blendSoftness },
        uTime: { value: 0 },
      },
    });
    displayMaterialRef.current = displayMaterial;

    // Create quad mesh
    const quad = new THREE.Mesh(geometry, fluidMaterial);
    quadRef.current = quad;
    scene.add(quad);

  }, [mergedConfig]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current || !fluidMaterialRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    
    // Store previous position before updating
    prevMouseRef.current = { 
      x: mouseRef.current.x, 
      y: mouseRef.current.y 
    };
    
    // Update current mouse position
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    
    mouseActiveRef.current = true;
    lastMouseTimeRef.current = Date.now();
    
    // Immediately update uniforms to ensure responsiveness
    if (fluidMaterialRef.current.uniforms.uMouse) {
      fluidMaterialRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
    if (fluidMaterialRef.current.uniforms.uPrevMouse) {
      fluidMaterialRef.current.uniforms.uPrevMouse.value.set(prevMouseRef.current.x, prevMouseRef.current.y);
    }
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseActiveRef.current = false;
    // Smoothly decay mouse influence
    gsap.to(mouseRef.current, {
      duration: 0.5,
      x: 0,
      y: 0,
      ease: "power2.out"
    });
  }, []);

  // Resize handler
  const handleResize = useCallback(() => {
    if (!canvasRef.current || !rendererRef.current || !renderTargetARef.current || !renderTargetBRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const { width, height } = rect;

    // Update renderer
    rendererRef.current.setSize(width, height);

    // Update render targets
    renderTargetARef.current.setSize(width, height);
    renderTargetBRef.current.setSize(width, height);

    // Update uniforms
    if (fluidMaterialRef.current) {
      fluidMaterialRef.current.uniforms.uResolution.value.set(width, height);
    }
    if (displayMaterialRef.current) {
      displayMaterialRef.current.uniforms.uResolution.value.set(width, height);
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || 
        !fluidMaterialRef.current || !displayMaterialRef.current || 
        !renderTargetARef.current || !renderTargetBRef.current || !quadRef.current) {
      return;
    }

    timeRef.current += 0.016; // ~60fps
    frameRef.current++;

    const currentTime = Date.now();
    
    // Decay mouse influence if inactive
    if (currentTime - lastMouseTimeRef.current > 100 && mouseActiveRef.current) {
      mouseActiveRef.current = false;
    }

    // Always update mouse uniforms (even if not active)
    if (fluidMaterialRef.current.uniforms.uMouse) {
      fluidMaterialRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
    if (fluidMaterialRef.current.uniforms.uPrevMouse) {
      fluidMaterialRef.current.uniforms.uPrevMouse.value.set(prevMouseRef.current.x, prevMouseRef.current.y);
    }
    if (fluidMaterialRef.current.uniforms.uTime) {
      fluidMaterialRef.current.uniforms.uTime.value = timeRef.current;
    }
    
    if (displayMaterialRef.current.uniforms.uTime) {
      displayMaterialRef.current.uniforms.uTime.value = timeRef.current;
    }

    // Ping-pong rendering
    const currentTarget = currentTargetRef.current === 0 ? renderTargetARef.current : renderTargetBRef.current;
    const nextTarget = currentTargetRef.current === 0 ? renderTargetBRef.current : renderTargetARef.current;

    // Update fluid simulation
    if (fluidMaterialRef.current.uniforms.uTexture) {
      fluidMaterialRef.current.uniforms.uTexture.value = currentTarget.texture;
    }
    quadRef.current.material = fluidMaterialRef.current;
    rendererRef.current.setRenderTarget(nextTarget);
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    // Display final result
    if (displayMaterialRef.current.uniforms.uTexture) {
      displayMaterialRef.current.uniforms.uTexture.value = nextTarget.texture;
    }
    quadRef.current.material = displayMaterialRef.current;
    rendererRef.current.setRenderTarget(null);
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    // Swap targets
    currentTargetRef.current = 1 - currentTargetRef.current;

    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Initialize and start animation
  useEffect(() => {
    // Prevent double initialization
    if (rendererRef.current) return;
    
    initScene();
    animate();

    // Add event listeners to canvas for better tracking
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Also add to window for backup
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Remove canvas event listeners
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      // Remove window event listeners
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      // Dispose of Three.js resources
      renderTargetARef.current?.dispose();
      renderTargetBRef.current?.dispose();
      fluidMaterialRef.current?.dispose();
      displayMaterialRef.current?.dispose();
      rendererRef.current?.dispose();
      
      // Reset refs to prevent double initialization
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      fluidMaterialRef.current = null;
      displayMaterialRef.current = null;
    };
  }, []); // Empty dependency array to prevent re-initialization

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)' // Fallback
      }}
    />
  );
};
