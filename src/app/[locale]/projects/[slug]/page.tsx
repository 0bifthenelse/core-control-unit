import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";
import { projectAssets } from "@/features/projects/data";

export function generateStaticParams() {
  return projectAssets.map((project) => ({ slug: project.id }));
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <NavBarServer />
      <ProjectDetailPage slug={slug} />
      <Footer />
    </>
  );
}
