import { useEffect, useState } from "react";
import { Anim } from "./slide-shared";
import { Shuffle, BarChart3, Network } from "lucide-react";

const AUTHORS = [
  { name: "Mingxuan Zhang", img: "/ming.jpeg" },
  { name: "Khushi Desai", img: "/khushi.jpg" },
  { name: "Sopho Kevishvili", img: "/sopho.jpeg" },
];

const STEPS = [
  {
    icon: Shuffle,
    number: "01",
    title: "Sample Subsets",
    body: "Sample small subsets of variables.",
    color: "blue",
    delay: 400,
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Predict Marginal Estimates",
    body: "Run causal discovery algorithms to predict marginal graph estimates.",
    color: "violet",
    delay: 700,
  },
  {
    icon: Network,
    number: "03",
    title: "Aggregate Globally",
    body: "Aggregate the subset-level estimates to recover a global graph.",
    color: "green",
    delay: 1000,
  },
];

const COLOR_MAP = {
  blue:   { bgStyle: { background: "#C3D5D122", borderColor: "#7aada7" }, iconStyle: { background: "#C3D5D1", color: "#1a4a44" }, numColor: "#7aada7" },
  violet: { bgStyle: { background: "#D0B3B822", borderColor: "#a87e87" }, iconStyle: { background: "#D0B3B8", color: "#5a2535" }, numColor: "#a87e87" },
  green:  { bgStyle: { background: "#D7EAD822", borderColor: "#9ab99c" }, iconStyle: { background: "#D7EAD8", color: "#2d5a3a" }, numColor: "#9ab99c" },
};


export function SlideScale() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">How do we scale?</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5 min-h-0">
        {/* We present SCONE + Authors */}
        <Anim delay={200} animation="animate-in fade-in duration-700">
          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-semibold text-foreground">We present <span className="font-bold" style={{ color: "#1a4a44" }}>SCONE</span></p>
            <p className="text-xl text-muted-foreground">Scalable Contrastive Causal Discovery under Unknown Soft Interventions</p>
            <div className="flex gap-10 mt-2">
              {AUTHORS.map((author, i) => (
                <Anim key={author.name} delay={400 + i * 150} animation="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={author.img}
                      alt={author.name}
                      className="size-28 rounded-full object-cover shadow-md"
                      style={{ border: "3px solid #e2e8f0" }}
                    />
                    <p className="text-lg font-semibold text-foreground">{author.name}</p>
                  </div>
                </Anim>
              ))}
            </div>
          </div>
        </Anim>

        {/* Step cards */}
        <div className="flex gap-4 items-stretch">
          {STEPS.map((step, i) => {
            const c = COLOR_MAP[step.color as keyof typeof COLOR_MAP];
            const isActive = active === i;
            return (
              <Anim
                key={step.number}
                delay={step.delay + 400}
                animation="animate-in fade-in slide-in-from-bottom-4 duration-500"
                className="flex-1"
              >
                <div
                  className="rounded-2xl border-2 px-5 py-4 transition-all duration-500 flex items-start gap-3 h-full"
                  style={isActive ? c.bgStyle : {}}
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500"
                    style={isActive ? c.iconStyle : {}}
                  >
                    <step.icon className="size-5" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-bold tracking-widest transition-colors duration-500"
                      style={{ color: isActive ? c.numColor : undefined }}
                    >
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold leading-tight">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mt-1">{step.body}</p>
                  </div>
                </div>
              </Anim>
            );
          })}
        </div>

        {/* SEA note */}
        <Anim delay={1600} animation="animate-in fade-in slide-in-from-bottom-3 duration-500" className="flex justify-center">
          <div className="rounded-xl bg-muted/40 border px-4 py-2 inline-block">
            <p className="text-lg text-muted-foreground whitespace-nowrap">
              <span className="font-medium text-foreground">SEA-inspired:</span> Subset Estimation and Aggregation
            </p>
          </div>
        </Anim>
      </div>
    </div>
  );
}
