import { ChevronDown, Code2 } from "lucide-react";
import { LANGUAGES } from "../constants/Languages";

export default function LanguageSelector({
  label,
  value,
  onChange,
  exclude,
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
        {label}
      </span>

      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-indigo-500">
          <Code2 size={17} />
        </div>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm font-semibold text-slate-800 shadow-sm outline-none transition duration-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:py-3.5 sm:text-base"
          aria-label={label}
        >
          {LANGUAGES.filter(
            (language) => language !== exclude || language === value
          ).map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-200 group-focus-within:rotate-180"
        />
      </div>
    </label>
  );
}