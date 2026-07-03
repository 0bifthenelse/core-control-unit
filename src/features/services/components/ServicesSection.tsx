import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";

const services = [
  {
    code: "SVC-01",
    title: "Architecture Système",
    description:
      "Conception d'infrastructures logicielles robustes et scalables. Microservices, monolithes modulaires, systèmes distribués.",
  },
  {
    code: "SVC-02",
    title: "Développement Web",
    description:
      "Applications web haute performance avec les technologies modernes. React, Next.js, API REST et GraphQL.",
  },
  {
    code: "SVC-03",
    title: "Ingénierie Back-end",
    description:
      "Services métier critiques en Rust, Node.js ou Python. Optimisation des performances, sécurité et résilience.",
  },
  {
    code: "SVC-04",
    title: "Conseil Technique",
    description:
      "Audit de codebase, choix de stack, revue d'architecture. Accompagnement des équipes produit et technique.",
  },
  {
    code: "SVC-05",
    title: "Intégration & DevOps",
    description:
      "Pipelines CI/CD, containerisation Docker/Kubernetes, déploiement cloud et monitoring applicatif.",
  },
  {
    code: "SVC-06",
    title: "Solutions Sur Mesure",
    description:
      "Développement d'outils métier, automatisations, parsers, systèmes embarqués et CLIs spécialisés.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">Catalogue</span>
          <AccentLine className="mt-3 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight">
            Services
          </h2>
          <p className="mt-4 text-sm text-[#5a6070] max-w-md">
            Des solutions d'ingénierie complètes pour vos projets numériques les plus exigeants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ code, title, description }) => (
            <HudPanel key={code} className="p-6 hover:border-[#ff7d27]/40 transition-colors duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#ff7d27] tracking-widest">{code}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff7d27] opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8eaf0] mb-3">{title}</h3>
              <p className="text-xs text-[#5a6070] leading-relaxed">{description}</p>
            </HudPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
