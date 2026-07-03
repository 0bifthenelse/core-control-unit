import { AccentLine } from "@/components/ui/AccentLine";

const values = [
  { label: "Fiabilité", desc: "Code de production, pas de démos." },
  { label: "Précision", desc: "Architecture explicite, zéro magie." },
  { label: "Vélocité", desc: "Livraison rapide sans sacrifier la qualité." },
  { label: "Transparence", desc: "Communication directe, estimations honnêtes." },
];

export function AboutSection() {
  return (
    <section id="apropos" className="py-24 px-6 border-t border-[#1e2330]">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">Identité</span>
          <AccentLine className="mt-3 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight mb-6">
            À propos
          </h2>
          <div className="space-y-4 text-sm text-[#5a6070] leading-relaxed">
            <p>
              Core Control Unit est une société française d'ingénierie logicielle fondée sur un principe
              simple : livrer du code qui fonctionne, qui tient, et qui s'adapte.
            </p>
            <p>
              Nous intervenons sur des projets complexes — architectures système, applications critiques,
              outils métier — en gardant une approche senior, sans overhead inutile.
            </p>
            <p>
              Basés en France, nous travaillons en remote avec des équipes européennes et internationales,
              en mode projet ou en renfort d'équipe existante.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map(({ label, desc }) => (
            <div key={label} className="border-l-2 border-[#ff7d27] pl-4 py-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#e8eaf0] mb-1">{label}</div>
              <div className="text-xs text-[#5a6070]">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
