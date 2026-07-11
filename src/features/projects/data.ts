export type ProjectAsset = {
  id: string;
  screenshots: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  private?: boolean;
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
];
