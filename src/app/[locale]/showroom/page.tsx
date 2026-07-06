import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { ShowroomPage } from "@/features/showroom/components/ShowroomPage";

export default function Showroom() {
  return (
    <>
      <NavBarServer />
      <ShowroomPage />
      <Footer />
    </>
  );
}
