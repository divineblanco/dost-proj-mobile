// import type { RewardBadge } from "@/lib/types/rewards";

// export type BadgeProgress = {
//   approvedContributions: number;
//   approvedMisinformation: number;
//   approvedMedia: number;
//   totalPoints: number;
// };

// export function meetsBadgeRequirement(
//   badge: RewardBadge,
//   progress: BadgeProgress
// ): boolean {
//   switch (badge.requirement_type) {
//     case "APPROVED_CONTRIBUTIONS":
//       return (
//         progress.approvedContributions >= badge.requirement_value
//       );

//     case "APPROVED_MISINFORMATION":
//       return (
//         progress.approvedMisinformation >= badge.requirement_value
//       );

//     case "APPROVED_MEDIA":
//       return progress.approvedMedia >= badge.requirement_value;

//     case "TOTAL_POINTS":
//       return progress.totalPoints >= badge.requirement_value;

//     default:
//       return false;
//   }
// }

// export function formatEarnedDate(date?: string | null): string {
//   if (!date) return "Date unavailable";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return "Date unavailable";
//   }

//   return parsed.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// }


import type { RewardBadge } from "@/lib/types/rewards";

export type BadgeProgress = {
  approvedContributions: number;
  approvedMisinformation: number;
  approvedMedia: number;
  totalPoints: number;
};

export type BadgeProgressDetails = {
  current: number;
  target: number;
  percentage: number;
  remaining: number;
};

export function meetsBadgeRequirement(
  badge: RewardBadge,
  progress: BadgeProgress
): boolean {
  const target = Number(badge.requirement_value);

  if (!Number.isFinite(target) || target < 0) {
    return false;
  }

  switch (badge.requirement_type) {
    case "APPROVED_CONTRIBUTIONS":
      return progress.approvedContributions >= target;

    case "APPROVED_MISINFORMATION":
      return progress.approvedMisinformation >= target;

    case "APPROVED_MEDIA":
      return progress.approvedMedia >= target;

    case "TOTAL_POINTS":
      return progress.totalPoints >= target;

    default:
      return false;
  }
}

export function getBadgeProgress(
  badge: RewardBadge,
  progress: BadgeProgress
): BadgeProgressDetails | null {
  const target = Number(badge.requirement_value);

  if (!Number.isFinite(target) || target < 0) {
    return null;
  }

  let current: number;

  switch (badge.requirement_type) {
    case "APPROVED_CONTRIBUTIONS":
      current = progress.approvedContributions;
      break;

    case "APPROVED_MISINFORMATION":
      current = progress.approvedMisinformation;
      break;

    case "APPROVED_MEDIA":
      current = progress.approvedMedia;
      break;

    case "TOTAL_POINTS":
      current = progress.totalPoints;
      break;

    default:
      return null;
  }

  const safeCurrent = Math.max(
    0,
    Number.isFinite(current) ? current : 0
  );

  const percentage =
    target === 0
      ? 100
      : Math.min((safeCurrent / target) * 100, 100);

  return {
    current: Math.min(safeCurrent, target),
    target,
    percentage,
    remaining: Math.max(target - safeCurrent, 0),
  };
}

export function formatEarnedDate(
  date?: string | null
): string {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}