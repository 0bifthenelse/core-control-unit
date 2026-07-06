export type ProjectAsset = {
  id: string;
  screenshots: string[];
  liveUrl: string | null;
  repoUrl: string | null;
};

export const projectAssets: ProjectAsset[] = [
  {
    id: "seculars-online",
    screenshots: ["/secularsonline-preview1.png", "/secularsonline-preview2.png"],
    liveUrl: "http://167.233.24.127/",
    repoUrl: "https://github.com/Illumineis/release",
  },
];
