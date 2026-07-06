import { getTranslations } from "next-intl/server";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";

type ServiceItem = { title: string; description: string; price: string };
type ValueItem = { label: string; desc: string };

const ICONS = [
  <path key="web" d="M2 5h20v14H2zM2 9h20M6 13h6M6 16h4" />,
  <path key="billboard" d="M3 4h18v10H3zM7 14v6M17 14v6M2 20h20" />,
  <path key="app" d="M9 3H4v5M20 9V4h-5M4 16v5h5M15 21h5v-5M8 12l3 3 5-6" />,
  <path key="shield" d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z M9 12l2 2 4-4" />,
  <path key="code" d="M8 6l-6 6 6 6M16 6l6 6-6 6M13 4l-2 16" />,
  <path key="web3" d="M9 12a5 5 0 015-5h1a4 4 0 010 8h-1M15 12a5 5 0 01-5 5H9a4 4 0 010-8h1" />,
];

export async function ServicesSection() {
  const t = await getTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const values = t.raw("values") as ValueItem[];

  return (
    <section id="services" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8eaf0] uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-sm text-[#5a6070] max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(({ label, desc }) => (
            <div key={label} className="border-l-2 border-[#ff7d27] pl-4 py-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#e8eaf0] mb-1">{label}</div>
              <div className="text-xs text-[#5a6070]">{desc}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ title, description, price }, i) => (
            <HudPanel
              key={title}
              className={`flex flex-col h-full p-6 transition-all duration-300 group hover:-translate-y-1 ${
                i === 1
                  ? "border-[#ff7d27]/50 shadow-[0_0_24px_rgba(255,125,39,0.12)] hover:border-[#ff7d27]"
                  : "hover:border-[#ff7d27]/70 hover:shadow-[0_0_16px_rgba(255,125,39,0.08)]"
              }`}
            >
              <div className="mb-4 text-[#ff7d27]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[i]}
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8eaf0] mb-3">{title}</h3>
              <p className="text-xs text-[#5a6070] leading-relaxed">{description}</p>
              <span className="mt-auto pt-4 inline-block text-[10px] font-mono text-[#ff7d27] tracking-widest">{price}</span>
            </HudPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
