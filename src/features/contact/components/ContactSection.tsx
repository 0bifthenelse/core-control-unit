import { AccentLine } from "@/components/ui/AccentLine";
import { HudPanel } from "@/components/ui/HudPanel";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-[#1e2330]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">Transmission</span>
          <AccentLine className="mt-3 mb-6 max-w-xs mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight">
            Démarrer un projet
          </h2>
          <p className="mt-4 text-sm text-[#5a6070] max-w-sm mx-auto">
            Décrivez votre projet. Nous vous répondons sous 48h.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <HudPanel label="FORMULAIRE DE CONTACT" className="p-8">
            <form
              action="mailto:contact@corecontrolunit.fr"
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nom"
                  required
                  className="w-full bg-[#0d0f12] border border-[#1e2330] px-4 py-3 text-xs text-[#e8eaf0] focus:border-[#ff7d27] focus:outline-none transition-colors placeholder:text-[#5a6070]"
                  placeholder="Jean Dupont"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#0d0f12] border border-[#1e2330] px-4 py-3 text-xs text-[#e8eaf0] focus:border-[#ff7d27] focus:outline-none transition-colors placeholder:text-[#5a6070]"
                  placeholder="jean@entreprise.fr"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#5a6070] mb-2">
                  Projet
                </label>
                <textarea
                  name="projet"
                  required
                  rows={5}
                  className="w-full bg-[#0d0f12] border border-[#1e2330] px-4 py-3 text-xs text-[#e8eaf0] focus:border-[#ff7d27] focus:outline-none transition-colors resize-none placeholder:text-[#5a6070]"
                  placeholder="Décrivez votre projet, votre stack actuelle, vos contraintes..."
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ff7d27] py-4 text-xs uppercase tracking-widest text-black font-bold hover:bg-[#e06b1a] transition-colors duration-200"
                style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
              >
                Envoyer la transmission
              </button>
            </form>
          </HudPanel>
        </div>
      </div>
    </section>
  );
}
