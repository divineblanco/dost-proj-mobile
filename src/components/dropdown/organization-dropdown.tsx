// import { createAuthStyles } from "@/styles/auth-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import { useMemo, useRef, useState } from "react";
// import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
// import { ThemedText } from "../themed-text";

// // ── Organizations list ────────────────────────────────────────────
// const ORGANIZATIONS = [
//   "Department of Health",
//   "National University",
//   "Philippine Red Cross",
//   "AIDS Society of the Philippines",
//   "LoveYourself Inc.",
//   "Health Action Information Network (HAIN)",
//   "Pilipinas Shell Foundation",
//   "Philippine Business for Social Progress",
//   "TLF Share Collective",
//   "Department of Health – Philippines",
//   "Other",
// ];

// // ── Organization dropdown ─────────────────────────────────────────
// export function OrgDropdown({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   const [open, setOpen] = useState(false);
//     const triggerRef = useRef<View>(null);

//     const [dropdownPos, setDropdownPos] = useState({
//     top: 0,
//     left: 0,
//     width: 0,
//     });

//     const openDrop = () => {
//     if (open) {
//         setOpen(false);
//         return;
//     }

//     triggerRef.current?.measure(
//         (x, y, width, height, pageX, pageY) => {
//         setDropdownPos({
//             top: pageY + height + r.spacing(4),
//             left: pageX,
//             width,
//         });

//         setOpen(true);
//         }
//     );
//     };

//     const r = useResponsive();
//     const styles = useMemo(() => createAuthStyles(r), [r]);

//   const hasValue = value.length > 0;

//   return (
//     <View>
//       <TouchableOpacity
//         ref={triggerRef}
//         style={[styles.orgTrigger, hasValue && styles.orgTriggerFilled]}
//         onPress={openDrop}
//         activeOpacity={0.8}
//       >
//         <Ionicons name="business-outline" size={icon(16)} color={hasValue ? "#35408E" : "#9BA8C0"} />
//         <ThemedText style={[styles.orgTriggerText, hasValue && styles.orgTriggerTextActive]} numberOfLines={1}>
//           {hasValue ? value : "Select organization"}
//         </ThemedText>
//         <Ionicons name={open ? "chevron-up" : "chevron-down"} size={icon(14)} color={hasValue ? "#35408E" : "#9BA8C0"} />
//       </TouchableOpacity>

//       <Modal visible={open} transparent statusBarTranslucent
//       supportedOrientations={[
//         "portrait",
//         "landscape",
//       ]}>
//         <TouchableWithoutFeedback onPress={() => setOpen(false)}>
//           <View style={styles.modalOverlay1}>
//             <TouchableWithoutFeedback>
//               <View style={[styles.orgDropdown, {
//                     top: dropdownPos.top,
//                     left: dropdownPos.left,
//                     width: dropdownPos.width,
//                 },]}>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                   {ORGANIZATIONS.map((org) => {
//                     const isActive = value === org;
//                     return (
//                       <TouchableOpacity
//                         key={org}
//                         style={[styles.orgItem, isActive && styles.orgItemActive]}
//                         onPress={() => { onChange(org); setOpen(false); }}
//                         activeOpacity={0.75}
//                       >
//                         <ThemedText style={[styles.orgItemText, isActive && styles.orgItemTextActive]}>
//                           {org}
//                         </ThemedText>
//                         {isActive && <Ionicons name="checkmark" size={icon(14)} color="#35408E" />}
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </ScrollView>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// }

import useFormQuery from "@/lib/hooks/useFormQuery";
import { createAuthStyles } from "@/styles/auth-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

type Organization = {
  organization_id: string;
  name: string;
  slug?: string;
  description?: string;
  is_deleted?: boolean;
};

type OrganizationResponse = {
  data?: {
    edges?: Array<{
      node: Organization;
      cursor: string;
    }>;
    pageInfo?: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    totalCount?: number;
    timestamp?: string;
    success?: boolean;
  };
};

type Props = {
  value: string | null;
  onChange: (organization: Organization) => void;
};

export function OrgDropdown({ value, onChange }: Props) {
  const r = useResponsive();
  const styles = useMemo(() => createAuthStyles(r), [r]);

  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const triggerRef = useRef<View>(null);

  const { data, isLoading, isError, error } = useFormQuery<
    OrganizationResponse,
    Record<string, never>
  >({
    key: ["maintenance-organizations"],
    url: "/maintenance/organization",
    enabled: true,
  });

  const organizations = useMemo(
    () =>
      (data?.data?.edges ?? [])
        .map(edge => edge.node)
        .filter(organization => !organization.is_deleted),
    [data]
  );

  const selectedOrganization = useMemo(
    () =>
      value
        ? organizations.find(
            organization => organization.organization_id === value
          ) ?? null
        : null,
    [organizations, value]
  );

  const hasValue = Boolean(selectedOrganization);

  const openDrop = () => {
    if (open) {
      setOpen(false);
      return;
    }

    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPos({
        top: pageY + height + r.spacing(4),
        left: pageX,
        width,
      });
      setOpen(true);
    });
  };

  if (isError) {
    console.log("[OrgDropdown] Failed to load organizations:", error);
  }

  return (
    <View>
      <TouchableOpacity
        ref={triggerRef}
        style={[styles.orgTrigger, hasValue && styles.orgTriggerFilled]}
        onPress={openDrop}
        activeOpacity={0.8}
        disabled={isLoading}
      >
        <Ionicons
          name="business-outline"
          size={icon(16)}
          color={hasValue ? "#35408E" : "#9BA8C0"}
        />

        <ThemedText
          style={[styles.orgTriggerText, hasValue && styles.orgTriggerTextActive]}
          numberOfLines={1}
        >
          {isLoading
            ? "Loading organizations..."
            : selectedOrganization?.name ?? "Select organization"}
        </ThemedText>

        {isLoading ? (
          <ActivityIndicator size="small" color="#35408E" />
        ) : (
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={icon(14)}
            color={hasValue ? "#35408E" : "#9BA8C0"}
          />
        )}
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        statusBarTranslucent
        supportedOrientations={["portrait", "landscape"]}
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay1}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.orgDropdown,
                  {
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                  },
                ]}
              >
                {isError && (
                  <View style={{ padding: r.spacing(12) }}>
                    <ThemedText style={{ color: "#E53935", textAlign: "center" }}>
                      Unable to load organizations.
                    </ThemedText>
                  </View>
                )}

                {!isLoading && !isError && !organizations.length && (
                  <View style={{ padding: r.spacing(12) }}>
                    <ThemedText style={{ color: "#9BA8C0", textAlign: "center" }}>
                      No organizations available.
                    </ThemedText>
                  </View>
                )}

                {!isLoading && !isError && organizations.length > 0 && (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {organizations.map(organization => {
                      const isActive = value === organization.organization_id;

                      return (
                        <TouchableOpacity
                          key={organization.organization_id}
                          style={[
                            styles.orgItem,
                            isActive && styles.orgItemActive,
                          ]}
                          onPress={() => {
                            onChange(organization);
                            setOpen(false);
                          }}
                          activeOpacity={0.75}
                        >
                          <ThemedText
                            style={[
                              styles.orgItemText,
                              isActive && styles.orgItemTextActive,
                            ]}
                          >
                            {organization.name}
                          </ThemedText>

                          {isActive && (
                            <Ionicons
                              name="checkmark"
                              size={icon(14)}
                              color="#35408E"
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
