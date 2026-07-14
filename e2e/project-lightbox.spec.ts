import { test, expect } from "@playwright/test";

for (const route of ["/projects", "/projects/seculars-online"]) {
  test(`opens Seculars Online screenshots accessibly on ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/fr${route}`);

    const previewOne = page.locator('button[aria-label="Open Seculars Online preview 1 fullscreen"]');
    const previewTwo = page.locator('button[aria-label="Open Seculars Online preview 2 fullscreen"]:visible').first();

    await expect(previewOne).toBeVisible();
    await previewOne.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img", { name: "Seculars Online preview 1" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close image preview" })).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(previewOne).toBeFocused();

    await previewTwo.click();
    await expect(page.getByRole("dialog").getByRole("img", { name: "Seculars Online preview 2" })).toBeVisible();
    await page.getByRole("dialog").click({ position: { x: 4, y: 890 } });
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(previewTwo).toBeFocused();
  });
}
