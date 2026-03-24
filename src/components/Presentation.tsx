import { useState, useCallback, useEffect } from "react";
import { SlideTitle } from "@/components/slides/SlideTitle";
import { SlideCausalDiscovery } from "@/components/slides/SlideCausalDiscovery";
import { SlideMarkov } from "@/components/slides/SlideMarkov";
import { SlideMEC } from "@/components/slides/SlideMEC";
import { SlideWhyMEC } from "@/components/slides/SlideWhyMEC";
import { SlideInterventions } from "@/components/slides/SlideInterventions";
import { SlideSoftInterventions } from "@/components/slides/SlideSoftInterventions";
import { SlidePsiFCI } from "@/components/slides/SlidePsiFCI";
import { SlideScale } from "@/components/slides/SlideScale";
import { SlideRestrictedEC } from "@/components/slides/SlideRestrictedEC";
import { SlideSSI } from "@/components/slides/SlideSSI";
import { SlideTheorems } from "@/components/slides/SlideTheorems";
import { SlideModelSampling } from "@/components/slides/SlideModelSampling";
import { SlideModelAttention } from "@/components/slides/SlideModelAttention";
import { SlideModelLoss } from "@/components/slides/SlideModelLoss";
import { SlideResults } from "@/components/slides/SlideResults";
import { SlideThankYou } from "@/components/slides/SlideThankYou";

const SLIDES = [
  SlideTitle,
  SlideCausalDiscovery,
  SlideMarkov,
  SlideMEC,
  SlideWhyMEC,
  SlideInterventions,
  SlideSoftInterventions,
  SlidePsiFCI,
  SlideScale,
  SlideRestrictedEC,
  SlideSSI,
  SlideTheorems,
  SlideModelSampling,
  SlideModelAttention,
  SlideModelLoss,
  SlideResults,
  SlideThankYou,
];


export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isDemo = false;

  const goNext = useCallback(() => {
    setCurrentSlide((s) => Math.min(SLIDES.length - 1, s + 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // On the demo slide, only capture Escape to go back
      if (isDemo) {
        if (e.key === "Escape") {
          e.preventDefault();
          goPrev();
        }
        return;
      }

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, isDemo]);

  const SlideComponent = SLIDES[currentSlide];

  return (
    <div className="relative">
      <SlideComponent />

      {/* Slide counter */}
      <div className="fixed bottom-4 right-6 text-xs text-muted-foreground/50 z-50">
        {currentSlide + 1} / {SLIDES.length}
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 left-6 text-xs text-muted-foreground/40 z-50">
        {isDemo ? "Press Esc to go back" : "Use arrow keys to navigate"}
      </div>
    </div>
  );
}
