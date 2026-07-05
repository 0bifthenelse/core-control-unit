import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { ProjectsPage } from "@/features/projects/components/ProjectsPage";

export default function Projects() {
  return (
    <>
      <NavBarServer />
      <ProjectsPage />
      <Footer />
    </>
  );
}
