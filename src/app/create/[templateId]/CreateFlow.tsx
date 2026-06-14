"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TemplateConfig, WebsiteData } from "@/types";
import { slugify } from "@/lib/utils";
import Step1Customize from "./steps/Step1Customize";
import Step2Account from "./steps/Step2Account";
import Step3Payment from "./steps/Step3Payment";

interface Props {
  template: TemplateConfig;
  devMode: boolean;
}

const STEPS = ["Customize", "Account", "Payment"];

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

  const handleSlugFromName = (groom: string, bride: string) => {
    if (groom && bride) {
      setWebsiteData((prev) => ({
        ...prev,
        slug: slugify(`${groom} weds ${bride}`),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-12">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      i <= step
                        ? "text-white"
                        : "bg-stone-200 text-stone-400"
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

          {step === 0 && (
            <Step1Customize
              template={template}
              data={websiteData}
              onChange={setWebsiteData}
              onSlugChange={handleSlugFromName}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <Step2Account
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <Step3Payment
              template={template}
              data={websiteData}
              email={email}
              password={password}
              devMode={devMode}
              onBack={() => setStep(1)}
              onSuccess={() => router.push(`/dashboard`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
