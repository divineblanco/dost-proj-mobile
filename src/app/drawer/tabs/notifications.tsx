import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Tab = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  activeColor: string;
  activeBg: string;
};

const TABS: Tab[] = [
  {
    key: 'all',
    label: 'All',
    icon: 'apps-outline',
    color: '#9BA8C0',
    activeColor: '#EEF0FA',
    activeBg: '#35408E',
  },
  {
    key: 'alerts',
    label: 'Alerts',
    icon: 'warning-outline',
    color: '#9BA8C0',
    activeColor: '#FFF0F0',
    activeBg: '#C62828',
  },
  {
    key: 'updates',
    label: 'Updates',
    icon: 'refresh-outline',
    color: '#9BA8C0',
    activeColor: '#E8F3FD',
    activeBg: '#3781C1',
  },
  {
    key: 'rewards',
    label: 'Rewards',
    icon: 'trophy-outline',
    color: '#9BA8C0',
    activeColor: '#FFF4E0',
    activeBg: '#FFB633',
  },
];

// Placeholder notification data
const NOTIFICATIONS = [
  {
    id: 1,
    tab: 'alerts',
    icon: 'warning-outline' as keyof typeof Ionicons.glyphMap,
    iconColor: '#C62828',
    bg: "#FFDBDB",
    border: "#C62828",
    title: 'New HIV Alert in Your Region',
    desc: 'A new advisory has been issued for Region IV-A. Tap to learn more.',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    tab: 'updates',
    icon: 'document-text-outline' as keyof typeof Ionicons.glyphMap,
    iconColor: '#3781C1',
    bg: "#c8e3fd",
    border: '#3781C1',
    title: 'HIV Prevention Guide Updated',
    desc: 'The prevention guide has been updated with new 2026 guidelines.',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 3,
    tab: 'rewards',
    icon: 'trophy-outline' as keyof typeof Ionicons.glyphMap,
    iconColor: '#B36B00',
    bg: '#fee9c0',
    border: '#B36B00',
    title: 'Badge Unlocked: Advocate',
    desc: 'You\'ve earned the Advocate badge for your contributions to the community.',
    time: '3 hrs ago',
    unread: false,
  },
  {
    id: 4,
    tab: 'updates',
    icon: 'refresh-outline' as keyof typeof Ionicons.glyphMap,
    iconColor: '#3781C1',
    bg: "#c8e3fd",
    border: '#3781C1',
    title: 'App Update Available',
    desc: 'A new version of AdvocAid PH is available with improved features.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 5,
    tab: 'alerts',
    icon: 'alert-circle-outline' as keyof typeof Ionicons.glyphMap,
    iconColor: '#C62828',
    bg: "#FFDBDB",
    border: "#C62828",  
    title: 'Misinformation Detected',
    desc: 'A flagged post about HIV treatment is circulating in your area.',
    time: 'Yesterday',
    unread: false,
  },
];

export default function Notifications() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? NOTIFICATIONS
    : NOTIFICATIONS.filter(n => n.tab === activeTab);

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <View style={styles.pageContainer}>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabBtn,
                isActive && { backgroundColor: tab.activeBg },
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={tab.icon}
                size={15}
                color={isActive ? tab.activeColor : tab.color}
              />
              <ThemedText
                style={[
                  styles.tabLabel,
                  { color: isActive ? tab.activeColor : tab.color },
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Section heading */}
      <View style={styles.sectionRow}>
        <View style={styles.sectionLeft}>
          <ThemedText style={styles.sectionTitle}>
            {activeTab === "all"
              ? "All Notifications"
              : TABS.find((t) => t.key === activeTab)?.label}
          </ThemedText>

          {unreadCount > 0 && activeTab === "all" && (
            <View style={styles.unreadBadge}>
              <ThemedText style={styles.unreadBadgeText}>
                {unreadCount} new
              </ThemedText>
            </View>
          )}
        </View>

        {activeTab === "all" && (
          <TouchableOpacity>
            <ThemedText style={styles.markAllText}>
              Mark all as Read
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sectionDivider} />

      {/* Notifications list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={40} color="#D1D5E8" />
            <ThemedText style={styles.emptyText}>No notifications here</ThemedText>
          </View>
        ) : (
          filtered.map((item, index) => (
            <View key={item.id} style={[styles.notifBG, {backgroundColor: "#f8faff", borderColor: item.border}]}>
              <TouchableOpacity
                style={[styles.notifRow, item.unread && styles.notifRowUnread]}
                activeOpacity={0.75}
              >
                {/* Unread dot */}
                {item.unread && <View style={styles.unreadDot} />}

                {/* Icon */}
                <View style={[styles.notifIcon, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={20} color={item.iconColor} />
                </View>

                {/* Text */}
                <View style={styles.notifText}>
                  <ThemedText style={styles.notifTitle} numberOfLines={1}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.notifDesc} numberOfLines={2}>
                    {item.desc}
                  </ThemedText>
                  <ThemedText style={styles.notifTime}>{item.time}</ThemedText>
                </View>

                <Ionicons name="chevron-forward" size={14} color="black" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white"
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F8',
  },

  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    borderRadius: 8,
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },

  tabLabelActive: {
    fontWeight: '700',
  },

  // Section heading
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },

  markAllText: {
    color: "#3781C1",
    fontWeight: "600",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#35408E',
  },

  unreadBadge: {
    backgroundColor: '#EEF0FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },

  unreadBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#35408E',
  },

  sectionDivider: {
    height: 1,
    backgroundColor: '#F0F2F8',
    marginHorizontal: 16,
  },

  // Scroll
  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 100,
    gap: 10
  },

  // Notification rows
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    position: 'relative',
  },

  notifRowUnread: {
    // Subtle left highlight handled via unreadDot
  },

  notifBG: {
    borderRadius: 10,
    padding: 5,
    borderWidth: 0.5,
  },

  unreadDot: {
    position: 'absolute',
    left: 7,
    top: '50%',
    marginTop: -10,
    width: 8,
    height: 8,
    zIndex: 999,
    borderRadius: 4,
    backgroundColor: '#35408E',
  },

  notifIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notifText: {
    flex: 1,
    gap: 2,
  },

  notifTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#35408E',
  },

  notifDesc: {
    fontSize: 12,
    color: '#52565d',
    lineHeight: 17,
  },

  notifTime: {
    fontSize: 11,
    color: '#61646a',
    marginTop: 2,
  },

  rowDivider: {
    height: 1,
    marginTop: 10,
    backgroundColor: '#F0F2F8',
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },

  emptyText: {
    fontSize: 13,
    color: '#9BA8C0',
    fontWeight: '500',
  },
});