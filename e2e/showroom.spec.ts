import { test, expect } from "@playwright/test";

test("showroom canvas renders via WebGPU, not WebGL", async ({ page }) => {
  await page.goto("/showroom");

  const canvas = page.locator("canvas");
  await expect(canvas).toBeVisible();

  const contexts = await canvas.evaluate((el: HTMLCanvasElement) => ({
    webgpu: el.getContext("webgpu") !== null,
    webgl2: el.getContext("webgl2") !== null,
    webgl: el.getContext("webgl") !== null,
  }));

  expect(contexts.webgpu).toBe(true);
  expect(contexts.webgl2).toBe(false);
  expect(contexts.webgl).toBe(false);

  await page.waitForTimeout(300);

  const contextsAfter = await canvas.evaluate((el: HTMLCanvasElement) => ({
    webgpu: el.getContext("webgpu") !== null,
    webgl2: el.getContext("webgl2") !== null,
  }));

  expect(contextsAfter.webgpu).toBe(true);
  expect(contextsAfter.webgl2).toBe(false);
});
