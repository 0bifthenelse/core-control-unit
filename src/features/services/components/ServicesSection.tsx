import { getTranslations } from "next-intl/server";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
type ServiceItem = { title: string; description: string; price: string };
type ValueItem = { label: string; desc: string };

const ICONS = [
  <path key="web" d="M2 5h20v14H2zM2 9h20M6 13h6M6 16h4" />,
  <path key="billboard" d="M3 4h18v10H3zM7 14v6M17 14v6M2 20h20" />,
  <path key="game" d="M6 9h4M8 7v4M15 10h.01M18 8h.01M8 5h8a5 5 0 015 5v4a5 5 0 01-5 5c-1 0-1.5-.5-2-1l-1-1a3 3 0 00-4 0l-1 1c-.5.5-1 1-2 1a5 5 0 01-5-5v-4a5 5 0 015-5z" />,
  <path key="book" d="M4 4h7a3 3 0 013 3v13a3 3 0 00-3-3H4z M20 4h-7a3 3 0 00-3 3v13a3 3 0 013-3h7z" />,
  <path key="code" d="M8 6l-6 6 6 6M16 6l6 6-6 6M13 4l-2 16" />,
  <path key="shield" d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z M9 12l2 2 4-4" />,
  <path key="ai" d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9zM5 16l.7 1.8L7.5 18.5l-1.8.7L5 21l-.7-1.8L2.5 18.5l1.8-.7z" strokeLinejoin="round" />,
  <path key="flashloan" d="M13 2 4 14h6l-1 8 9-12h-6z" strokeLinejoin="round" />,
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
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-sm text-text-muted max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(({ label, desc }) => (
            <div key={label} className="border-l-2 border-[#ff7d27] pl-4 py-2">
              <div className="text-xs font-bold uppercase tracking-widest text-text-primary mb-1">{label}</div>
              <div className="text-xs text-text-muted">{desc}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {items.map(({ title, description, price }, i) => {
            const wide = i >= items.length - 2;
            const inHouse = i === items.length - 1;
            return (
            <HudPanel
              key={title}
              wrapperClassName={wide ? "lg:col-span-2" : ""}
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
                  aria-hidden="true"
                >
                  {ICONS[i]}
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-3">{title}</h3>
              <p className={`text-xs text-text-muted leading-relaxed${wide ? " max-w-3xl" : ""}`}>{description}</p>
              {inHouse ? (
                <span className="mt-auto pt-4 inline-block text-[10px] font-mono text-[#ff7d27] tracking-widest">{price}</span>
              ) : (
                <a
                  href="#contact"
                  className="mt-auto pt-4 inline-block w-fit text-[10px] font-mono text-[#ff7d27] tracking-widest hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7d27]"
                >
                  {price}
                </a>
              )}
            </HudPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
