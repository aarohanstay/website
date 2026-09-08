"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  label: string;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  placeholder?: string;
}

export function CustomDatePicker({
  label,
  selectedDate,
  onSelectDate,
  minDate = new Date(),
  placeholder = "Select date",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isDateDisabled = (day: number) => {
    const target = new Date(currentYear, currentMonth, day);
    const startOfMinDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return target < startOfMinDate;
  };

  const isSameDay = (d1: Date | null, year: number, month: number, day: number) => {
    if (!d1) return false;
    return d1.getFullYear() === year && d1.getMonth() === month && d1.getDate() === day;
  };

  const formatDateStr = (date: Date | null) => {
    if (!date) return placeholder;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? "z-[100]" : "z-50"}`}>
      {/* Tappable whole box button container */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl sm:rounded-full bg-white/10 border border-white/15 hover:bg-white/15 hover:border-amber-500/50 transition-all cursor-pointer select-none group shadow-lg text-left"
      >
        <div className="flex items-center gap-3 min-w-0 pointer-events-none">
          <CalendarIcon className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left truncate">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              {label}
            </span>
            <span className="text-xs font-bold text-white truncate">
              {formatDateStr(selectedDate)}
            </span>
          </div>
        </div>
      </button>

      {/* Floating Dark Calendar Popover with z-[9999] */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 z-[9999] p-4 rounded-3xl bg-[#0d1322]/95 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200 min-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-white">
            <span>
              {monthNames[currentMonth]} {currentYear}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-[10px] text-amber-400 font-medium mb-2">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDateDisabled(day);
              const selected = isSameDay(selectedDate, currentYear, currentMonth, day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectDate(new Date(currentYear, currentMonth, day));
                    setIsOpen(false);
                  }}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all cursor-pointer ${
                    selected
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30"
                      : disabled
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-200 hover:bg-amber-500/20 hover:text-amber-300"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
