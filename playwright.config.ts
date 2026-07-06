import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--headless=new",
            "--enable-unsafe-webgpu",
            "--enable-features=Vulkan",
            "--use-angle=swiftshader",
            "--use-webgpu-adapter=swiftshader",
            "--disable-gpu-sandbox",
            "--ignore-gpu-blocklist",
          ],
        },
      },
    },
  ],
});
