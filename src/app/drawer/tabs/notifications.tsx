import { ThemedText } from '@/components/themed-text';
import { notificationStyles } from '@/styles/notifications-styles';
import { icon, useResponsive } from '@/styles/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

type Tab = {
  key: string;
  label: string;
  icons: keyof typeof Ionicons.glyphMap;
  color: string;
  activeColor: string;
  activeBg: string;
};

const TABS: Tab[] = [
  {
    key: 'all',
    label: 'All',
    icons: 'apps-outline',
    color: '#9BA8C0',
    activeColor: '#EEF0FA',
    activeBg: '#35408E',
  },
  {
    key: 'alerts',
    label: 'Alerts',
    icons: 'warning-outline',
    color: '#9BA8C0',
    activeColor: '#FFF0F0',
    activeBg: '#C62828',
  },
  {
    key: 'updates',
    label: 'Updates',
    icons: 'refresh-outline',
    color: '#9BA8C0',
    activeColor: '#E8F3FD',
    activeBg: '#3781C1',
  },
  {
    key: 'rewards',
    label: 'Rewards',
    icons: 'trophy-outline',
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
    icons: 'warning-outline' as keyof typeof Ionicons.glyphMap,
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
    icons: 'document-text-outline' as keyof typeof Ionicons.glyphMap,
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
    icons: 'trophy-outline' as keyof typeof Ionicons.glyphMap,
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
    icons: 'refresh-outline' as keyof typeof Ionicons.glyphMap,
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
    icons: 'alert-circle-outline' as keyof typeof Ionicons.glyphMap,
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

  const r = useResponsive();
        
  const styles = useMemo(() => notificationStyles(r), [r]);

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
                name={tab.icons}
                size={icon(15)}
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
                  <Ionicons name={item.icons} size={icon(20)} color={item.iconColor} />
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

                <Ionicons name="chevron-forward" size={icon(14)} color="black" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}