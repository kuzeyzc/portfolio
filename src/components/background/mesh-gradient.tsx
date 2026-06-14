/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const NEUTRAL_COLORS = ["#F4F4F5", "#E4E4E7", "#D4D4D4", "#A3A3A3"];

const MeshGradientShader = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false }
);

function CSSGradientFallback() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.5 }}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163, 163, 163, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "30%",
          right: "-10%",
          animation: "css-orb-drift-1 25s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: "500px",
          maxHeight: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163, 163, 163, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "10%",
          left: "-5%",
          animation: "css-orb-drift-2 30s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

export function MeshGradient() {
  const [useWebGL, setUseWebGL] = useState(false);
  const colors = NEUTRAL_COLORS;

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) setUseWebGL(true);
    } catch {
      // fallback to CSS
    }
  }, []);

  if (!useWebGL) {
    return <CSSGradientFallback />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
      <MeshGradientShader
        width="100%"
        height="100%"
        colors={colors}
        speed={0.25}
        distortion={0.45}
        swirl={0.03}
        grainMixer={0.02}
        grainOverlay={0.04}
        style={{ opacity: 0.25 }}
      />
    </div>
  );
}
