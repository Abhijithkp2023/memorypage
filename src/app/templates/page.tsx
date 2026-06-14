import Link from "next/link";
import { TEMPLATES } from "@/templates/registry";
import Navbar from "@/components/Navbar";
import { formatCurrency } from "@/lib/utils";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-3">Templates</p>
            <h1
              className="text-4xl md:text-5xl font-light text-stone-800 mb-4"
            >
              Choose your{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                perfect template
              </span>
            </h1>
            <p className="text-stone-500 max-w-lg mx-auto">
              Each template is crafted by designers to make your event website unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-stone-100"
              >
                {/* Template preview */}
                <div
                  className="h-56 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #fdf6f0 0%, #f8e8e8 50%, #f0e8f0 100%)",
                  }}
                >
                  <div className="text-center px-6">
                    <p
                      className="text-3xl"
                      style={{ fontFamily: "'Great Vibes', cursive", color: "#5c3d2e" }}
                    >
                      Alex & Sarah
                    </p>
                    <p className="text-xs uppercase tracking-widest text-rose-400 mt-2">
                      December 14, 2026
                    </p>
                    <div className="w-12 h-px bg-rose-200 mx-auto mt-3" />
                  </div>

                  {/* Event type badge */}
                  <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-xs text-stone-600 capitalize">
                    {template.eventType}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-medium text-stone-800 mb-1">{template.name}</h3>
                  <p className="text-sm text-stone-500 mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-light"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#5c3d2e" }}
                    >
                      {formatCurrency(template.price / 100)}
                    </span>

                    <div className="flex gap-2">
                      <Link
                        href={`/create/${template.id}`}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all text-white hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
                      >
                        Use Template
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coming soon cards */}
            {["Birthday Modern", "Engagement Bloom", "Anniversary Gold"].map((name) => (
              <div
                key={name}
                className="bg-white rounded-3xl overflow-hidden border border-dashed border-stone-200 opacity-60"
              >
                <div
                  className="h-56 flex items-center justify-center"
                  style={{ background: "#fafafa" }}
                >
                  <p className="text-stone-300 text-sm uppercase tracking-widest">Coming Soon</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-stone-400 mb-1">{name}</h3>
                  <p className="text-sm text-stone-300">Available soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
