"use client";

import { HudPanel } from "@/components/ui/HudPanel";
import { LABEL_STYLE, INPUT_STYLE, CLIP_INPUT, BUTTON_STYLE, CLIP_BUTTON } from "@/components/ui/formStyles";

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
          <label className={LABEL_STYLE}>
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
          <label className={LABEL_STYLE}>
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
          <label className={LABEL_STYLE}>
            {labelType}
          </label>
          <select
            name="type"
            required
            className={`${INPUT_STYLE} appearance-none cursor-pointer`}
            style={CLIP_INPUT}
          >
            <option value="">...</option>
            {types.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_STYLE}>
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
        <button type="submit" className={BUTTON_STYLE} style={CLIP_BUTTON}>
          {submit}
        </button>
      </form>
    </HudPanel>
  );
}
