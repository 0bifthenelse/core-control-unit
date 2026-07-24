export type ProjectAsset = {
  id: string;
  screenshots: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  buyUrl?: string;
  buyUrlIt?: string;
  buyUrlUs?: string;
  usEditionInReview?: boolean;
  private?: boolean;
  portrait?: boolean;
};

export const projectAssets: ProjectAsset[] = [
  {
    id: "seculars-online",
    screenshots: ["/secularsonline-preview1.png", "/secularsonline-preview2.png"],
    liveUrl: "https://www.secularsonline.com",
    repoUrl: "https://github.com/Illumineis/release",
  },
  {
    id: "atmosphere",
    screenshots: ["/atmosphere-preview.png"],
    liveUrl: null,
    repoUrl: null,
    private: true,
  },
  {
    id: "arbitrage-bot",
    screenshots: ["/arbitrage-bot-preview.png"],
    liveUrl: null,
    repoUrl: null,
    private: true,
  },
  {
    id: "mots-caches",
    screenshots: ["/mots-caches-preview1.png", "/mots-caches-preview2.png", "/mots-caches-preview3.png"],
    liveUrl: null,
    repoUrl: null,
    buyUrl: "https://www.amazon.fr/dp/B0H9B33P2Y",
    buyUrlIt: "https://www.amazon.it/dp/B0H9RXD3NN",
    usEditionInReview: true,
    portrait: true,
  },
  {
    id: "tui-explorer",
    screenshots: ["/tui-explorer-preview1.png", "/tui-explorer-preview2.png"],
    liveUrl: null,
    repoUrl: "https://github.com/0bifthenelse/tui-explorer",
  },
];
