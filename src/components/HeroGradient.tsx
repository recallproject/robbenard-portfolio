import { useEffect, useRef } from "react";
import { useCoarsePointer, usePrefersReducedMotion } from "../hooks/useMedia";

const VERT = `
attribute vec2 a;
void main(){
  gl_Position = vec4(a, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uMotion;
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float t = uTime * 0.055;
  float n = sin(uv.x * 2.6 + t) * cos(uv.y * 2.1 - t * 0.72);
  float n2 = sin((uv.x + uv.y) * 1.8 - t * 0.45);
  vec3 pearl = vec3(0.95, 0.93, 1.0);
  vec3 cobalt = vec3(0.38, 0.26, 0.98);
  vec3 magenta = vec3(0.98, 0.20, 0.52);
  vec3 col = mix(pearl, cobalt, clamp(uv.x * 0.92 + n * 0.22, 0.0, 1.0));
  col = mix(col, magenta, clamp((1.0 - uv.y) * 0.52 + n2 * 0.16, 0.0, 1.0));
  float g = fract(sin(dot(uv * uRes * 0.35, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.035 * uMotion;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.clearColor(0.95, 0.93, 1.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMotion = gl.getUniformLocation(program, "uMotion");

    const parent = canvas.parentElement ?? canvas;
    let raf = 0;
    let running = true;
    const dprCap = coarse ? 0.85 : 1.25;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (time: number, motion: number) => {
      gl.uniform1f(uTime, time);
      gl.uniform1f(uMotion, motion);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    if (reduced || coarse) {
      draw(1.6, 0);
      return () => {
        ro.disconnect();
        gl.deleteProgram(program);
      };
    }

    const tick = (now: number) => {
      if (!running) return;
      if (document.visibilityState !== "hidden") {
        draw(now / 1000, 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
    };
  }, [coarse, reduced]);

  return <canvas ref={canvasRef} className="hero-gradient" aria-hidden="true" />;
}
