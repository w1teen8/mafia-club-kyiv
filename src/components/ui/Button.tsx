"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { scrollToTarget } from "@/lib/lenis-singleton";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  className?: string;
  icon?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  external?: boolean;
};

export function Button({
  children,
  variant = "primary",
  href,
  className,
  icon = true,
  onClick,
  type = "button",
  external,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-body text-sm uppercase tracking-[0.2em] transition-colors duration-300";

  const variants = {
    primary: "bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-bg hover:brightness-110",
    outline: "border border-gold/50 text-white hover:border-gold hover:bg-gold/10",
    ghost: "text-white hover:text-gold",
  };

  function handleClick(e: React.MouseEvent) {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      scrollToTarget(href, -80);
    }
    onClick?.();
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], className);

  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a
          href={href}
          onClick={handleClick}
          className={classes}
          data-cursor-hover
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      ) : (
        <button type={type} onClick={handleClick} className={classes} data-cursor-hover>
          {content}
        </button>
      )}
    </Magnetic>
  );
}
