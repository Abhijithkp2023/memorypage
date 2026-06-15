import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-sm",
};

export default function OutlineButton({
  href,
  onClick,
  children,
  className = "",
  disabled,
  type = "button",
  size = "md",
}: Props) {
  const base = `inline-flex items-center justify-center gap-2 rounded-2xl font-medium border border-stone-200 bg-white text-stone-700 transition-all hover:border-rose-300 hover:text-rose-600 disabled:opacity-40 ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
