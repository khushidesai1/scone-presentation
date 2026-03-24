import { useState, useCallback, useEffect } from "react";
import { SlideCurrentState } from "@/components/slides/SlideCurrentState";
import { SlideThirdParty } from "@/components/slides/SlideThirdParty";
import { SlideWithSilex } from "@/components/slides/SlideWithSilex";
import { SlideSearch } from "@/components/slides/SlideSearch";
import { SlideChat } from "@/components/slides/SlideChat";
import { SlideAssist } from "@/components/slides/SlideAssist";
import { SlideAgent } from "@/components/slides/SlideAgent";
import { SlideDemo } from "@/components/slides/SlideDemo";

const SLIDES = [SlideCurrentState, SlideThirdParty, SlideWithSilex, SlideSearch, SlideChat, SlideAssist, SlideAgent, SlideDemo];

const DEMO_SLIDE_INDEX = SLIDES.length - 1;

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isDemo = currentSlide === DEMO_SLIDE_INDEX;

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
