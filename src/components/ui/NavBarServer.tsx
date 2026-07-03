import { getTranslations, getLocale } from "next-intl/server";
import { NavBar } from "./NavBar";

export async function NavBarServer() {
  const t = await getTranslations("nav");
  const locale = await getLocale();
  const links = [
    { href: "#services", label: t("services") },
    { href: "#projets", label: t("projects") },
    { href: "#apropos", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];
  return <NavBar links={links} cta={t("cta")} locale={locale} />;
}
