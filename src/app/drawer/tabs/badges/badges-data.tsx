export type Badge = {
  id: number;
  title: string;
  description: string;
  earnedDate: string;
};

export const BADGES: Badge[] = [
  {
    id: 1,
    title: "First Contribution",
    description: "Made your first community contribution.",
    earnedDate: "May 1, 2026",
  },
  {
    id: 2,
    title: "Resource Sharer",
    description:
      "Shared an educational resource with the community.",
    earnedDate: "May 10, 2026",
  },
  {
    id: 3,
    title: "Knowledge Helper",
    description:
      "Helped another community member find answers.",
    earnedDate: "May 18, 2026",
  },
];