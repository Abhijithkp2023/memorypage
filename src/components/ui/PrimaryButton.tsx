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

export default function PrimaryButton({
  href,
  onClick,
  children,
  className = "",
  disabled,
  type = "button",
  size = "md",
}: Props) {
  const base = `inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all hover:opacity-90 disabled:opacity-40 ${sizes[size]} ${className}`;
  const style = { background: "linear-gradient(135deg, #c8896a, #a87060)", color: "#fff" };

  if (href) {
    return (
      <Link href={href} className={base} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base} style={style}>
      {children}
    </button>
  );
}
