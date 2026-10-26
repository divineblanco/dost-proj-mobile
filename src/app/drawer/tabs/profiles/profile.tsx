import BadgeCard from "@/components/cards/badge-card";
import ResourcesDownload from "@/components/cards/downloaded-resources";
import MyDiscussions from "@/components/cards/my-discussions";
import { SurveyCard } from "@/components/cards/profile-survey";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/lib/auth/AuthProvider";
import useFormMutation from "@/lib/hooks/useFormMutation";
import useFormQuery from "@/lib/hooks/useFormQuery";
import { UserByIdInterface } from "@/lib/interface/user/user.interface";
import { Contribution, RewardBadge, RewardLevel, RewardRule, extractItems, getCurrentLevel, getNextLevel } from "@/lib/types/rewards";
import { profileStyles } from "@/styles/profile/profile-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Image, ScrollView, TouchableOpacity } from "react-native";

interface ActivityLogPayload {
  type: string;
  description?: string;
  user_id: string;
}

const API_HEADERS = {
  "x-api-key": "testing",
  "x-api-version": "2026-02-26",
  "Content-Type": "application/json",
};

const formatMemberSince = (date?: string | null) => {
  if (!date) return "Member since —";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "Member since —";

  return `Member since ${parsedDate.toLocaleDateString("en-US", {
    month: "numeric", day: "numeric", year: "numeric",
  })}`;
};

export default function Profile() {
  const r = useResponsive();
  const styles = useMemo(() => profileStyles(r), [r]);
  const { user, token, clearSession, isLoading: authLoading } = useAuth();
  const currentUserId = String(user?.user_id ?? "").trim();
  const enabled = Boolean(token && currentUserId);

  const headers = {
    "x-api-key": "testing",
    "x-api-version": "2026-02-26",
     "Authorization": `Bearer ${token}`  
  }

  const { data: userResponse, isLoading: isUserLoading, isError: isUserError, error: userError } =
    useFormQuery<UserByIdInterface>({
      key: ["users", currentUserId], url: "maintenance/users", enabled, headers,
    });

  const userDetails = userResponse?.data?.edges?.find((edge) => edge.node?.user_id === currentUserId)?.node;

  const { data: levelsResponse, isLoading: isLevelsLoading } = useFormQuery<unknown>({
    key: ["reward-levels"], url: "maintenance/rewards", enabled: Boolean(token), headers,
  });

  const { data: rulesResponse, isLoading: isRulesLoading } = useFormQuery<unknown>({
    key: ["reward-point-rules"], url: "maintenance/rewards/rule", enabled: Boolean(token), headers,
  });

  const { data: badgesResponse, isLoading: isBadgesLoading, isError: isBadgesError, error: badgesError } =
    useFormQuery<unknown>({
      key: ["reward-badges"], url: "maintenance/rewards/badge", enabled: Boolean(token), headers,
    });

  const { data: contributionsResponse, isLoading: isContributionsLoading } = useFormQuery<unknown>({
    key: ["my-contributions", currentUserId],
    url: "maintenance/contribution",
    enabled,
    headers,
    params: { limit: 100, orderBy: "created_at", sortBy: "desc", user_id: currentUserId },
  });

  const levels = useMemo(() => extractItems<RewardLevel>(levelsResponse), [levelsResponse]);
  const rules = useMemo(() => extractItems<RewardRule>(rulesResponse), [rulesResponse]);
  const badges = useMemo(() => extractItems<RewardBadge>(badgesResponse).filter((badge) => badge != null), [badgesResponse]);
  const contributions = useMemo(
    () => extractItems<Contribution>(contributionsResponse).filter((item) => !item.is_deleted),
    [contributionsResponse]
  );

  const approvedItems = contributions.filter((item) => item.status === "APPROVED");
  const approvedContributions = approvedItems.filter((item) => item.classification !== "MISINFORMATION").length;
  const approvedMisinformation = approvedItems.filter((item) => item.classification === "MISINFORMATION").length;
  const approvedMedia = approvedItems.filter((item) => Boolean(item.image_url || item.source_url)).length;

  const totalPoints = useMemo(() => {
    const activeRules = rules.filter((rule) => rule.is_active);
    const getPoints = (actionType: RewardRule["action_type"]) =>
      activeRules.find((rule) => rule.action_type === actionType)?.points ?? 0;

    return approvedContributions * getPoints("EXPERIENCE")
      + approvedMisinformation * getPoints("MISINFORMATION")
      + approvedMedia * getPoints("MEDIA");
  }, [rules, approvedContributions, approvedMisinformation, approvedMedia]);

  const currentLevel = useMemo(() => getCurrentLevel(totalPoints, levels), [totalPoints, levels]);
  const nextLevel = useMemo(() => getNextLevel(totalPoints, levels), [totalPoints, levels]);
  const pointsToNextLevel = nextLevel ? Math.max(0, nextLevel.min_points - totalPoints) : 0;

  const progress = nextLevel
    ? Math.min(100, Math.max(0,
        ((totalPoints - (currentLevel?.min_points ?? 0)) /
          Math.max(1, nextLevel.min_points - (currentLevel?.min_points ?? 0))) * 100
      ))
    : currentLevel ? 100 : 0;

  const isRewardsLoading = isLevelsLoading || isRulesLoading || isBadgesLoading || isContributionsLoading;
  const profileImageUrl = userDetails?.Profile?.image_url || user?.Profile?.image_url || null;

  const { mutateAsync: logActivity } = useFormMutation<ActivityLogPayload, unknown>({
    key: ["activity-log", "logout"], url: "maintenance/activity-logs", method: "POST", headers,
  });

  const handleLogout = async () => {
    try {
      if (currentUserId && token) {
        await logActivity({
          type: "LOGGED OUT",
          description: "User logged out of the application.",
          user_id: currentUserId,
        });
      }
    } catch (error) {
      console.error("[LOGOUT] Activity log failed:", error);
    } finally {
      await clearSession();
      router.replace("/");
    }
  };

  if (authLoading || isUserLoading) {
    return (
      <ThemedView style={styles.pageContainer}>
        <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="small" color="#35408E" />
          <ThemedText style={{ marginTop: 10 }}>Loading profile...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  if (isUserError) console.error("[PROFILE] Failed to load user:", userError);
  if (isBadgesError) console.error("[PROFILE] Failed to load badges:", badgesError);

  const firstName = userDetails?.Profile?.first_name || user?.Profile?.first_name || "First Name";
  const role = userDetails?.role?.name || user?.Role?.name || "General Public";
  const location = userDetails?.Profile?.location || user?.Profile?.location || "No Location Set";
  const memberSince = formatMemberSince(userDetails?.created_at);
  const levelName = currentLevel?.name ?? "Newcomer";

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <ThemedView>
        <ThemedView style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.push("/drawer/tabs/setting/settings")}>
            <Feather name="settings" size={icon(20)} color="#35408E" style={styles.settings} />
          </TouchableOpacity>

          <ThemedView style={styles.profileContainer}>
            <ThemedView style={{ alignItems: "center" }}>
              <ThemedView style={styles.imageShadow}>
                {profileImageUrl ? (
                  <Image
                    source={{ uri: profileImageUrl }}
                    style={styles.profileImg}
                    resizeMode="cover"
                    onError={(event) => console.error("[PROFILE] Avatar failed to load:", event.nativeEvent)}
                  />
                ) : (
                  <ThemedView style={styles.profilePlaceholder}>
                    <Ionicons name="person" size={icon(45)} color="#9A9A9A" />
                  </ThemedView>
                )}
              </ThemedView>

              <ThemedView style={styles.levelBadge}>
                <ThemedText style={styles.levelText}>{isRewardsLoading ? "Loading level..." : levelName}</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.profileInfo}>
              <ThemedView style={styles.nameRow}>
                <ThemedText style={styles.userName}>{firstName}</ThemedText>
              </ThemedView>

              <ThemedText style={styles.role}>{role}</ThemedText>

              <ThemedView style={styles.infoRow}>
                <Ionicons name="location-outline" size={icon(15)} color="#6a6a6dd6" />
                <ThemedText style={styles.infoText}>{location}</ThemedText>
              </ThemedView>

              <ThemedView style={styles.infoRow}>
                <Ionicons name="calendar-clear-outline" size={icon(15)} color="#6a6a6dd6" />
                <ThemedText style={styles.infoText}>{memberSince}</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.moreContainer}>
          <BadgeCard
            returnTo="/drawer/tabs/profiles/profile"
            badges={badges}
            approvedContributions={approvedContributions}
            approvedMisinformation={approvedMisinformation}
            approvedMedia={approvedMedia}
            totalPoints={totalPoints}
          />

          {isBadgesLoading && (
            <ThemedView style={{ alignItems: "center", paddingVertical: 8 }}>
              <ActivityIndicator size="small" color="#35408E" />
              <ThemedText style={{ marginTop: 6 }}>Loading badges...</ThemedText>
            </ThemedView>
          )}

          <ResourcesDownload />
          <MyDiscussions />
          <SurveyCard />

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={icon(25)} color="white" />
            <ThemedText style={styles.logoutTxt}>Log Out</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}