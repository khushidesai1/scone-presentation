import { Anim } from "./slide-shared";

const MEMBERS: { name: string; bold?: boolean }[] = [
  { name: "Elham Azizi", bold: true },
  { name: "Mingxuan Zhang", bold: true },
  { name: "Khushi Desai", bold: true },
  { name: "Sopho Kevlishvili", bold: true },
  { name: "Aaron Zweig" },
  { name: "Lingting Shi" },
  { name: "Yinuo Jin" },
  { name: "Ioana Lia" },
  { name: "Justin Hong" },
  { name: "Kevin Hoffer-Hawlik" },
  { name: "Neeha Kothapalli" },
  { name: "Joshua Myers" },
  { name: "Alvand Vahediahmar" },
  { name: "Nicolas Beltran-Velez" },
  { name: "Bar Rozenman" },
  { name: "Mahsa Mohajeri" },
  { name: "Nicholas Djedjos" },
  { name: "Sharanya Chatterjee" },
  { name: "Ella Yee" },
  { name: "Harjaisal Brar" },
  { name: "Ana Maria Petcu" },
  { name: "Marina Milea" },
];

export function SlideThankYou() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-4">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Thank You!</h1>
        </Anim>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left: lab members list */}
        <Anim delay={200} animation="animate-in fade-in slide-in-from-left-6 duration-600" className="flex-1 flex flex-col min-h-0">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Azizi Lab</p>
          <div className="flex-1 min-h-0 overflow-auto">
            <div className="columns-2 gap-x-6">
              {MEMBERS.map((m) => (
                <p
                  key={m.name}
                  className={`text-xl mb-1.5 ${m.bold ? "font-bold text-foreground" : "text-muted-foreground"}`}
                >
                  {m.name}
                </p>
              ))}
            </div>
          </div>
        </Anim>

        {/* Right: lab photo with Sopho overlay */}
        <Anim delay={400} animation="animate-in fade-in slide-in-from-right-6 duration-600" className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative max-h-full">
            <img
              src="/azizilab.jpg"
              alt="Azizi Lab group photo"
              className="max-h-full w-auto object-contain rounded-2xl shadow-lg"
            />
            {/* Sopho overlay */}
            <img
              src="/sopho.jpeg"
              alt="Sopho Kevlishvili"
              className="absolute size-32 rounded-full object-cover shadow-md"
              style={{ bottom: "12%", right: "4%", border: "3px solid white" }}
            />
            {/* Khushi overlay */}
            <img
              src="/khushi-overlay.jpg"
              alt="Khushi Desai"
              className="absolute size-32 rounded-full object-cover shadow-md"
              style={{ bottom: "12%", left: "4%", border: "3px solid white" }}
            />
            {/* Aaron overlay */}
            <img
              src="/aaron-overlay.jpg"
              alt="Aaron Zweig"
              className="absolute size-32 rounded-full object-cover shadow-md"
              style={{ top: "4%", right: "4%", border: "3px solid white" }}
            />
            {/* Yinuo overlay */}
            <img
              src="/yinuo-overlay.jpg"
              alt="Yinuo Jin"
              className="absolute size-32 rounded-full object-cover shadow-md"
              style={{ top: "4%", left: "4%", border: "3px solid white" }}
            />
          </div>
        </Anim>
      </div>
    </div>
  );
}
