export type RewardLevel = {
  reward_level_id: string;
  name: string;
  description?: string | null;
  min_points: number;
  order_index: number;
  is_active?: boolean;
};

export type RewardRule = {
  reward_point_rule_id: string;
  action_type: "EXPERIENCE" | "MISINFORMATION" | "MEDIA";
  points: number;
  is_active: boolean;
};

export type RewardBadge = {
  badge_id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon_url?: string | null;
  requirement_type:
    | "TOTAL_POINTS"
    | "APPROVED_CONTRIBUTIONS"
    | "APPROVED_MISINFORMATION"
    | "APPROVED_MEDIA";
  requirement_value: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type EarnedBadge = {
  user_badge_id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: RewardBadge;
};

export type RewardTransaction = {
  reward_transaction_id: string;
  user_id: string;
  contribution_id: string;
  action_type: "EXPERIENCE" | "MISINFORMATION" | "MEDIA";
  points: number;
  created_at: string;
};

export type UserReward = {
  user_reward_id: string;
  user_id: string;
  total_points: number;
  current_level_id?: string | null;
};

export type Contribution = {
  contribution_id: string;
  type: string;
  content: string;
  classification?: "PENDING" | "MISINFORMATION" | "FACTUAL" | null;
  classification_method?: "MANUAL" | "AI" | "HYBRID" | null;
  status: "PENDING" | "APPROVED" | "DECLINED";
  is_deleted: boolean;
  image_url?: string | null;
  source_url?: string | null;
  created_at?: string | null;
  user_id?: string;
};

export type ApiEdge<T> = {
  node: T | null;
  cursor?: string;
};

export type ApiList<T> = {
  data?: {
    edges?: ApiEdge<T>[];
    items?: T[];
    nodes?: T[];
    totalCount?: number;
    success?: boolean;
  } | T[];
  edges?: ApiEdge<T>[];
  items?: T[];
  nodes?: T[];
  success?: boolean;
};

export function extractItems<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const result = response as Record<string, any>;
  const data = result.data;

  if (Array.isArray(data)) {
    return data as T[];
  }

  const edges = result.edges ?? data?.edges;

  if (Array.isArray(edges)) {
    return edges
      .map((edge: ApiEdge<T>) => edge?.node)
      .filter((node: T | null): node is T => node != null);
  }

  const items =
    result.items ??
    result.nodes ??
    data?.items ??
    data?.nodes;

  return Array.isArray(items) ? (items as T[]) : [];
}

export function getCurrentLevel(
  points: number,
  levels: RewardLevel[]
): RewardLevel | undefined {
  return [...levels]
    .filter((level) => level.is_active !== false)
    .sort(
      (a, b) =>
        a.min_points - b.min_points ||
        a.order_index - b.order_index
    )
    .filter((level) => points >= level.min_points)
    .at(-1);
}

export function getNextLevel(
  points: number,
  levels: RewardLevel[]
): RewardLevel | undefined {
  return [...levels]
    .filter(
      (level) =>
        level.is_active !== false &&
        level.min_points > points
    )
    .sort((a, b) => a.min_points - b.min_points)[0];
}
