import { Sparkles, Edit3, Globe } from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a template",
    desc: "Pick from our beautifully designed templates crafted for your event type.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Customize content",
    desc: "Add your names, date, story, photos, and event details. No coding needed.",
    icon: Edit3,
  },
  {
    step: "03",
    title: "Pay & publish instantly",
    desc: "Complete a one-time payment and your website goes live immediately.",
    icon: Globe,
  },
];

export default function HowItWorksWidget() {
  return (
    <section
      className="py-20 px-6"
      style={{ background: "linear-gradient(160deg, #fff8f5 0%, #fdf6f0 100%)" }}
    >
      <div className="max-w-350 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-stone-800 mb-3">How it works</h2>
          <p className="text-stone-500">Three simple steps to your beautiful event website</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"
                style={{ background: "linear-gradient(135deg, #f8e8e0, #f0d0d0)" }}
              >
                <Icon size={22} style={{ color: "#c8896a" }} />
              </div>
              <div className="text-xs font-mono text-rose-300 mb-2 tracking-widest">{step}</div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">{title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
