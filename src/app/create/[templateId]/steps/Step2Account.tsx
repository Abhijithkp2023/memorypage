"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Props {
  email: string;
  password: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Account({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onNext,
  onBack,
}: Props) {
  const [showPwd, setShowPwd] = useState(false);

  const valid = email.includes("@") && password.length >= 6;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
        <h2 className="text-2xl font-light text-stone-800 mb-2">Create your account</h2>
        <p className="text-sm text-stone-500 mb-8">
          Your account is created automatically after payment. Already have one?{" "}
          <Link href="/login" className="text-rose-500 hover:underline">
            Log in instead
          </Link>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-300 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
          Your account will be created after successful payment. Use these credentials to log in later.
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl text-stone-600 text-sm font-medium border border-stone-200 hover:border-stone-300 transition-all bg-white"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-2 flex-grow-[2] py-4 rounded-2xl text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #c8896a, #a87060)" }}
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}
