import { getTranslations, getLocale } from "next-intl/server";
import { NavBar } from "./NavBar";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
export async function NavBarServer() {
  const t = await getTranslations("nav");
  const locale = await getLocale();
  const links = [
    { href: "#services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/showroom", label: t("showroom") },
    { href: "#apropos", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];
  return <NavBar links={links} cta={t("cta")} menuLabel={t("menu")} homeLabel={t("home")} locale={locale} />;
}
