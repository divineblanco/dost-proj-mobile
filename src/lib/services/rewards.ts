import {
    API_KEY_VALUE,
    API_URL,
} from "@/lib/services/api";

export type RewardsResponse = {
  total_points: number;

  rank: number | null;
  total_users: number;

  approved_contributions: number;
  approved_misinformation_reports: number;
  uploaded_media: number;

  points_breakdown: {
    experience: number;
    misinformation: number;
    media: number;
  };
};

export type LeaderboardUser = {
  rank: number;
  user_id: string;
  name: string;
  points: number;
  avatar_url?: string | null;
  is_current_user?: boolean;
};

export type LeaderboardResponse = {
  users: LeaderboardUser[];
  current_user_rank: number | null;
  total_users: number;
};

export type UserBadge = {
  badge_id: string;
  name: string;
  description: string;
  icon?: string | null;
  earned_at: string;
};

async function rewardsFetch<T>(
  endpoint: string,
  token: string
): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is missing."
    );
  }

  if (!API_KEY_VALUE) {
    throw new Error(
      "EXPO_PUBLIC_API_KEY is missing."
    );
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-API-Key":
          process.env.EXPO_PUBLIC_API_KEY ?? "",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        result?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return result;
}

export async function getMyRewards(
  token: string
): Promise<RewardsResponse> {
  const result = await rewardsFetch<{
    data?: RewardsResponse;
  }>("/rewards/me", token);

  return result.data ?? (result as unknown as RewardsResponse);
}

export async function getLeaderboard(
  token: string
): Promise<LeaderboardResponse> {
  const result = await rewardsFetch<{
    data?: LeaderboardResponse;
  }>("/rewards/leaderboard", token);

  return result.data ??
    (result as unknown as LeaderboardResponse);
}

export async function getMyBadges(
  token: string
): Promise<UserBadge[]> {
  const result = await rewardsFetch<{
    data?: UserBadge[];
  }>("/rewards/badges/me", token);

  return result.data ?? [];
}
