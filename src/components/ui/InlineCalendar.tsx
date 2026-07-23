"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function InlineCalendar({
  selected,
  onSelect,
  minDate,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const min = minDate ? startOfDay(minDate) : today;
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(selected ?? min));

  const cells = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const leadingBlanks = (first.getDay() + 6) % 7; // Monday-first grid
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const days: (Date | null)[] = Array.from({ length: leadingBlanks }, () => null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
    }
    return days;
  }, [viewMonth]);

  const monthLabel = viewMonth.toLocaleDateString("uk-UA", {
    month: "long",
    year: "numeric",
  });

  const canGoBack = startOfMonth(viewMonth) > startOfMonth(min);

  return (
    <div className="rounded-2xl border border-border bg-white/[0.03] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          data-cursor-hover
          disabled={!canGoBack}
          onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30"
          aria-label="Попередній місяць"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="font-body text-sm capitalize tracking-wide text-white">
          {monthLabel}
        </span>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-gold hover:text-gold"
          aria-label="Наступний місяць"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {WEEKDAYS.map((w) => (
          <span
            key={w}
            className="text-center font-body text-[10px] uppercase tracking-widest text-secondary"
          >
            {w}
          </span>
        ))}

        {cells.map((day, i) => {
          if (!day) return <span key={`blank-${i}`} />;
          const disabled = day < min;
          const isSelected = selected && isSameDay(day, selected);
          const isToday = isSameDay(day, today);

          return (
            <button
              type="button"
              key={day.toISOString()}
              data-cursor-hover
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={cn(
                "mx-auto flex h-9 w-9 items-center justify-center rounded-full font-body text-sm transition-colors duration-200",
                disabled && "cursor-not-allowed text-white/15",
                !disabled && !isSelected && "text-white/85 hover:bg-gold/10 hover:text-gold",
                isSelected && "bg-gold font-semibold text-bg",
                !isSelected && isToday && !disabled && "ring-1 ring-inset ring-gold/40",
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
