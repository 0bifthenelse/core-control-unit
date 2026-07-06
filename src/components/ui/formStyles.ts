// Shared form primitives so the Contact and GDPR forms stay pixel-identical.

export const LABEL_STYLE =
  "block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2";

export const INPUT_STYLE =
  "w-full bg-[#0d0f12] border border-[#1e2330] px-4 py-3 text-xs text-[#e8eaf0] focus:border-[#ff7d27] focus:outline-none transition-colors placeholder:text-[#5a6070]";

export const CLIP_INPUT = {
  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
};

export const BUTTON_STYLE =
  "w-full bg-[#ff7d27] py-4 text-xs uppercase tracking-widest text-black font-bold hover:bg-[#e06b1a] transition-colors duration-200";

export const CLIP_BUTTON = {
  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
};
