import { createAuthStyles } from "@/styles/auth-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ThemedText } from "../themed-text";

// ── Organizations list ────────────────────────────────────────────
const ORGANIZATIONS = [
  "Philippine Red Cross",
  "AIDS Society of the Philippines",
  "LoveYourself Inc.",
  "Health Action Information Network (HAIN)",
  "Pilipinas Shell Foundation",
  "Philippine Business for Social Progress",
  "TLF Share Collective",
  "Department of Health – Philippines",
  "Other",
];

// ── Organization dropdown ─────────────────────────────────────────
export function OrgDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
    const triggerRef = useRef<View>(null);

    const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    });

    const openDrop = () => {
    if (open) {
        setOpen(false);
        return;
    }

    triggerRef.current?.measure(
        (x, y, width, height, pageX, pageY) => {
        setDropdownPos({
            top: pageY + height + r.spacing(4),
            left: pageX,
            width,
        });

        setOpen(true);
        }
    );
    };

    const r = useResponsive();
    const styles = useMemo(() => createAuthStyles(r), [r]);

  const hasValue = value.length > 0;

  return (
    <View>
      <TouchableOpacity
        ref={triggerRef}
        style={[styles.orgTrigger, hasValue && styles.orgTriggerFilled]}
        onPress={openDrop}
        activeOpacity={0.8}
      >
        <Ionicons name="business-outline" size={icon(16)} color={hasValue ? "#35408E" : "#9BA8C0"} />
        <ThemedText style={[styles.orgTriggerText, hasValue && styles.orgTriggerTextActive]} numberOfLines={1}>
          {hasValue ? value : "Select organization"}
        </ThemedText>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={icon(14)} color={hasValue ? "#35408E" : "#9BA8C0"} />
      </TouchableOpacity>

      <Modal visible={open} transparent statusBarTranslucent
      supportedOrientations={[
        "portrait",
        "landscape",
      ]}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay1}>
            <TouchableWithoutFeedback>
              <View style={[styles.orgDropdown, {
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                },]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {ORGANIZATIONS.map((org) => {
                    const isActive = value === org;
                    return (
                      <TouchableOpacity
                        key={org}
                        style={[styles.orgItem, isActive && styles.orgItemActive]}
                        onPress={() => { onChange(org); setOpen(false); }}
                        activeOpacity={0.75}
                      >
                        <ThemedText style={[styles.orgItemText, isActive && styles.orgItemTextActive]}>
                          {org}
                        </ThemedText>
                        {isActive && <Ionicons name="checkmark" size={icon(14)} color="#35408E" />}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}