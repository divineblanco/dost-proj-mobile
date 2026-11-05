
import { authNoticeModal } from "@/styles/auth-styles";
import { useResponsive } from "@/styles/responsive";
import React, { useMemo } from "react";
import {
    Modal,
    Pressable,
    Text,
    View
} from "react-native";

export interface AuthNotice {
  type: "login" | "logout";
  title: string;
  quote: string;
}

interface AuthNoticeModalProps {
  notice: AuthNotice | null;
  onClose: () => void;
}

export default function AuthNoticeModal({
  notice,
  onClose,
}: AuthNoticeModalProps) {

      const r = useResponsive();
      const styles = useMemo(() => authNoticeModal(r), [r]);
      
  return (
    <Modal
      visible={Boolean(notice)}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
      supportedOrientations={[
      "portrait",
      "landscape",
    ]}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Close button in the upper-right corner */}
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Close message"
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>
              {notice?.type === "login" ? "✦" : "♥"}
            </Text>
          </View>

          <Text style={styles.brand}>ADVOCAID PH</Text>

          <Text style={styles.title}>
            {notice?.title}
          </Text>

          <View style={styles.quoteContainer}>
            
            <Text style={styles.quote}>
                <Text style={styles.quoteMark}>“</Text> 
                    {notice?.quote} 
                <Text style={styles.quoteMark}>“</Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}