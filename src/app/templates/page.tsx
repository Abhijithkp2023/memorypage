import { TEMPLATES } from "@/templates/registry";
import Navbar from "@/components/Navbar";
import TemplatesGrid from "./TemplatesGrid";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-300 mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-3">Templates</p>
            <h1 className="text-4xl md:text-5xl font-light text-stone-800 mb-4">
              Choose your{" "}
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                perfect template
              </span>
            </h1>
            <p className="text-stone-500 max-w-lg mx-auto">
              Each template is crafted by designers to make your event website unforgettable.
            </p>
          </div>

          <TemplatesGrid templates={TEMPLATES} />
        </div>
      </div>
    </div>
  );
}
