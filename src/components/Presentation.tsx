import { useState, useCallback, useEffect } from "react";
import { SlideCurrentState } from "@/components/slides/SlideCurrentState";
import { SlideThirdParty } from "@/components/slides/SlideThirdParty";

const SLIDES = [SlideCurrentState, SlideThirdParty];

interface PresentationProps {
  onFinish: () => void;
}

export function Presentation({ onFinish }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      onFinish();
    }
  }, [currentSlide, onFinish]);

  const goPrev = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
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
  }, [goNext, goPrev]);

  const SlideComponent = SLIDES[currentSlide];

  return (
    <div className="relative">
      <SlideComponent />

      {/* Slide counter */}
      <div className="fixed bottom-4 right-6 text-xs text-muted-foreground/50">
        {currentSlide + 1} / {SLIDES.length}
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 left-6 text-xs text-muted-foreground/40">
        Use arrow keys to navigate
      </div>
    </div>
  );
}
