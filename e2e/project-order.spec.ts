import { test, expect } from "@playwright/test";

const projectIds = [
  "master-memory-unit",
  "seculars-online",
  "mots-caches",
  "atmosphere",
  "arbitrage-bot",
  "tui-explorer",
];

test("renders projects in the requested order", async ({ page }) => {
  await page.goto("/fr/projects");
  await expect(page.locator("main section[id]").evaluateAll((sections) => sections.map((section) => section.id))).resolves.toEqual(projectIds);

  await page.goto("/fr");
  await expect(page.locator("section#projets h3").allTextContents()).resolves.toEqual([
    "Master Memory Unit",
    "Seculars Online",
    "Mots Cachés",
    "Atmosphère",
    "Equilibrium",
    "TUI Explorer",
  ]);
});
