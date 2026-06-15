"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TemplateConfig, WebsiteData } from "@/types";
import { slugify } from "@/lib/utils";
import Step1Customize from "./steps/Step1Customize";
import Step2Preview from "./steps/Step2Preview";
import Step3Account from "./steps/Step2Account";
import Step4Payment from "./steps/Step3Payment";

interface Props {
  template: TemplateConfig;
  devMode: boolean;
}

// step 0 = Customize, 1 = Preview, 2 = Account, 3 = Payment
const STEPS = ["Customize", "Preview", "Account", "Payment"];

export default function CreateFlow({ template, devMode }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [websiteData, setWebsiteData] = useState<WebsiteData>({
    slug: "",
    template: template.id,
    settings: {
      defaultLanguage: "en",
      enabledLanguages: ["en"],
    },
    sections: { ...template.defaultSections },
    content: JSON.parse(JSON.stringify(template.defaultContent)),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDataChange = (updated: WebsiteData) => {
    const hero = (updated.content.hero?.en ?? {}) as Record<string, string>;
    const names = [hero.groom, hero.bride, hero.person1, hero.person2, hero.name].filter(Boolean);

    // Extract month + year from date field (e.g. "December 14, 2026" → "dec-2026")
    const rawDate = hero.date ?? (updated.content.countdown?.en?.targetDate as string) ?? "";
    // Try "Month DD, YYYY" format first, then ISO "YYYY-MM-DD"
    const longMatch = rawDate.match(/^([A-Za-z]+)\s+\d+,?\s+(20\d{2})/);
    const isoMatch = rawDate.match(/^(20\d{2})-(\d{2})/);
    let yearSuffix = "";
    if (longMatch) {
      yearSuffix = `-${longMatch[1].slice(0, 3).toLowerCase()}-${longMatch[2]}`;
    } else if (isoMatch) {
      const monthNames = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
      const mon = monthNames[parseInt(isoMatch[2], 10) - 1] ?? isoMatch[2];
      yearSuffix = `-${mon}-${isoMatch[1]}`;
    }

    if (names.length >= 2) {
      updated = { ...updated, slug: slugify(`${names[0]} and ${names[1]}${yearSuffix}`) };
    } else if (names.length === 1) {
      updated = { ...updated, slug: slugify(`${names[0]}${yearSuffix}`) };
    }
    setWebsiteData(updated);
  };

  // Preview step is full-bleed — skip the padded container wrapper
  if (step === 1) {
    return (
      <div className="min-h-screen bg-stone-50">
        {/* Step indicator — keep visible above preview */}
        <div className="pt-24 pb-4 px-6">
          <div className="max-w-2xl mx-auto">
            <StepIndicator step={step} />
          </div>
        </div>
        <Step2Preview
          template={template}
          data={websiteData}
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <StepIndicator step={step} />

          {step === 0 && (
            <Step1Customize
              template={template}
              data={websiteData}
              onChange={handleDataChange}
              onSlugChange={() => {}}
              onNext={() => setStep(1)}
            />
          )}
          {step === 2 && (
            <Step3Account
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step4Payment
              template={template}
              data={websiteData}
              email={email}
              password={password}
              devMode={devMode}
              onBack={() => setStep(2)}
              onSuccess={() => router.push(`/dashboard`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                i <= step ? "text-white" : "bg-stone-200 text-stone-400"
              }`}
              style={i <= step ? { background: "linear-gradient(135deg, #c8896a, #a87060)" } : {}}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${
                i === step ? "text-stone-800 font-medium" : "text-stone-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-px ${i < step ? "bg-rose-300" : "bg-stone-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
