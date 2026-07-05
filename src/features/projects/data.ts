export type ProjectAsset = {
  id: string;
  screenshots: string[];
  liveUrl: string | null;
};

export const projectAssets: ProjectAsset[] = [
  {
    id: "us-billboard-campaign",
    screenshots: [
      "https://picsum.photos/seed/ccu-billboard-1/1200/750",
      "https://picsum.photos/seed/ccu-billboard-2/1200/750",
    ],
    liveUrl: null,
  },
  {
    id: "ecommerce-web-app",
    screenshots: [
      "https://picsum.photos/seed/ccu-ecommerce-1/1200/750",
      "https://picsum.photos/seed/ccu-ecommerce-2/1200/750",
      "https://picsum.photos/seed/ccu-ecommerce-3/1200/750",
    ],
    liveUrl: null,
  },
  {
    id: "community-discord-bot",
    screenshots: [
      "https://picsum.photos/seed/ccu-discordbot-1/1200/750",
      "https://picsum.photos/seed/ccu-discordbot-2/1200/750",
    ],
    liveUrl: null,
  },
];
