"use client";

import { FormEvent } from "react";
import { HudPanel } from "@/components/ui/HudPanel";
import { LABEL_STYLE, INPUT_STYLE, CLIP_INPUT, BUTTON_STYLE, CLIP_BUTTON } from "@/components/ui/formStyles";

interface ContactFormProps {
  panelLabel: string;
  labelName: string;
  placeholderName: string;
  labelEmail: string;
  placeholderEmail: string;
  labelProject: string;
  placeholderProject: string;
  submit: string;
  emailSubject: string;
}

export function ContactForm({
  panelLabel,
  labelName,
  placeholderName,
  labelEmail,
  placeholderEmail,
  labelProject,
  placeholderProject,
  submit,
  emailSubject,
}: ContactFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const project = (form.elements.namedItem("project") as HTMLTextAreaElement).value;

    const body = [
      `${labelName}: ${name}`,
      `${labelEmail}: ${email}`,
      "",
      `${labelProject}:`,
      project,
    ].join("\n");

    window.location.href =
      "mailto:business@ccunit.net?subject=" +
      encodeURIComponent(emailSubject) +
      "&body=" +
      encodeURIComponent(body);
  }

  return (
    <HudPanel label={panelLabel} className="p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={LABEL_STYLE}>{labelName}</label>
          <input
            type="text"
            name="name"
            required
            className={INPUT_STYLE}
            placeholder={placeholderName}
            style={CLIP_INPUT}
          />
        </div>
        <div>
          <label className={LABEL_STYLE}>{labelEmail}</label>
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
          <label className={LABEL_STYLE}>{labelProject}</label>
          <textarea
            name="project"
            required
            rows={5}
            className={`${INPUT_STYLE} resize-none`}
            placeholder={placeholderProject}
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
