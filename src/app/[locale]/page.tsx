import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ContactSection } from "@/features/contact/components/ContactSection";

export default function Home() {
  return (
    <>
      <NavBarServer />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
