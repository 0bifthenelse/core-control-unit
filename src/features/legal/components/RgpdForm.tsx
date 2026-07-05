"use client";

import { HudPanel } from "@/components/ui/HudPanel";

const INPUT_STYLE =
  "w-full bg-[#0d0f12] border border-[#1e2330] px-4 py-3 text-xs text-[#e8eaf0] focus:border-[#ff7d27] focus:outline-none transition-colors placeholder:text-[#5a6070]";
const CLIP_INPUT = {
  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
};

interface RgpdFormProps {
  panelLabel: string;
  labelName: string;
  placeholderName: string;
  labelEmail: string;
  placeholderEmail: string;
  labelType: string;
  types: { value: string; label: string }[];
  labelMessage: string;
  placeholderMessage: string;
  submit: string;
}

export function RgpdForm({
  panelLabel,
  labelName,
  placeholderName,
  labelEmail,
  placeholderEmail,
  labelType,
  types,
  labelMessage,
  placeholderMessage,
  submit,
}: RgpdFormProps) {
  return (
    <HudPanel label={panelLabel} className="p-8">
      <form
        action="mailto:contact@ccunit.net"
        method="post"
        encType="text/plain"
        className="space-y-5"
      >
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
            {labelName}
          </label>
          <input
            type="text"
            name="nom"
            required
            className={INPUT_STYLE}
            placeholder={placeholderName}
            style={CLIP_INPUT}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
            {labelEmail}
          </label>
          <input
            type="email"
            name="email"
            required
            className={INPUT_STYLE}
            placeholder={placeholderEmail}
            style={CLIP_INPUT}
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
            {labelType}
          </label>
          <select
            name="type"
            required
            className={`${INPUT_STYLE} appearance-none cursor-pointer`}
            style={CLIP_INPUT}
          >
            <option value="">—</option>
            {types.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
            {labelMessage}
          </label>
          <textarea
            name="message"
            required
            rows={5}
            className={`${INPUT_STYLE} resize-none`}
            placeholder={placeholderMessage}
            style={CLIP_INPUT}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#ff7d27] py-4 text-xs uppercase tracking-widest text-black font-bold hover:bg-[#e06b1a] transition-colors duration-200"
          style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
        >
          {submit}
        </button>
      </form>
    </HudPanel>
  );
}
