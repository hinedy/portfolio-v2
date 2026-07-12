import { useEffect, useRef, useState } from "react";
import { ASCII_PORTRAIT, ASCII_PORTRAIT_DENSITY_STEPS } from "@/lib/ascii-portrait";

const STEPS = ASCII_PORTRAIT_DENSITY_STEPS as readonly string[];
const STEP_INDEX: Record<string, number> = { ".": 0, "-": 1, "+": 2, "#": 3 };

// Precompute per-character metadata once at module load.
const CHARS = Array.from(ASCII_PORTRAIT);
const FINAL_IDX = new Int8Array(CHARS.length);
const DELAY = new Float32Array(CHARS.length);
for (let i = 0; i < CHARS.length; i++) {
  const c = CHARS[i];
  if (c in STEP_INDEX) {
    FINAL_IDX[i] = STEP_INDEX[c];
    // Deterministic pseudo-random delay in [0, 0.55]
    DELAY[i] = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * 0.55;
  } else {
    FINAL_IDX[i] = -1;
    DELAY[i] = 0;
  }
}

const DURATION = 1350; // ms — under 1.5s per §11

function render(progress: number): string {
  if (progress >= 1) return ASCII_PORTRAIT;
  const out = new Array<string>(CHARS.length);
  for (let i = 0; i < CHARS.length; i++) {
    const fi = FINAL_IDX[i];
    if (fi < 0) {
      out[i] = CHARS[i];
      continue;
    }
    const local = (progress - DELAY[i]) / (1 - 0.55);
    if (local <= 0) {
      out[i] = "."; // faint suggestion
    } else if (local >= 1) {
      out[i] = STEPS[fi];
    } else {
      const idx = Math.min(fi, Math.floor(local * (fi + 1)));
      out[i] = STEPS[idx];
    }
  }
  return out.join("");
}

export function AsciiPortrait({ onDone }: { onDone?: () => void } = {}) {
  const [text, setText] = useState<string>(() => {
    // SSR-safe: render initial faint state
    return render(0);
  });
  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone?.();
    };
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(ASCII_PORTRAIT);
      finish();
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setText(render(p));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  return (
    <pre
      className="ascii-portrait ascii-animating"
      aria-label="ASCII portrait of Ahmed Hinedy"
    >
      {text}
    </pre>
  );
}
