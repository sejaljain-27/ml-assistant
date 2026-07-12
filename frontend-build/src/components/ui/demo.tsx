import React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";
import { ArrowRight, Sparkles } from "lucide-react";

export default function NeuralHeroDemo() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-surface">
      <NeuralBackground 
        className="absolute inset-0 z-0"
        color="var(--primary)"
        trailOpacity={0.1}
        speed={0.8}
      />
      <div className="relative z-10 max-w-xl px-6 py-12 rounded-3xl bg-surface-card/30 backdrop-blur border border-surface-border/40 shadow-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles size={22} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Experience the Flow
        </h1>
        <p className="mt-3 text-sm text-slate-400 max-w-sm mx-auto">
          A dynamic vector field simulation that interacts with your mouse movements and matches your theme.
        </p>
        <button className="btn-primary mt-6 group">
          Get Started
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
