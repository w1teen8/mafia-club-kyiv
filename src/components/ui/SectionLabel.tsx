import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-gold/60" />
      <span
        className={cn(
          "font-body text-xs uppercase tracking-[0.4em]",
          light ? "text-bg" : "text-gold",
        )}
      >
        {children}
      </span>
    </div>
  );
}
