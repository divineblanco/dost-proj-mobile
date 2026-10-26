// import type { TreatmentHub } from "@/lib/types/treatment-hub";
// import { treatmentHubStyles } from "@/styles/map-styles";
// import { scale, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo } from "react";
// import { Linking, Text, TouchableOpacity, View } from "react-native";

// type Props = {
//   hubs: TreatmentHub[];
//   selectedHubId: string | null;
//   onSelectHub: (hub: TreatmentHub) => void;
// };

// const primary = "#35408E";

// function openLink(url?: string | null) {
//   if (url) Linking.openURL(url).catch(console.error);
// }

// function InfoRow({ icon, text, styles }: {
//   icon: React.ComponentProps<typeof Ionicons>["name"];
//   text: string;
//   styles: ReturnType<typeof treatmentHubStyles>;
// }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoIconBubble}>
//         <Ionicons name={icon} size={scale(14)} color={primary} />
//       </View>
//       <Text style={styles.infoText}>{text}</Text>
//     </View>
//   );
// }

// function ActionButton({ icon, label, onPress, styles }: {
//   icon: React.ComponentProps<typeof Ionicons>["name"];
//   label: string;
//   onPress: () => void;
//   styles: ReturnType<typeof treatmentHubStyles>;
// }) {
//   return (
//     <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={styles.actionButton}>
//       <Ionicons name={icon} size={scale(14)} color={primary} />
//       <Text style={styles.actionLabel}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// export default function TreatmentHubList({ hubs, selectedHubId, onSelectHub }: Props) {
//   const responsive = useResponsive();
//   const styles = useMemo(() => treatmentHubStyles(responsive), [responsive]);

//   if (!hubs.length) {
//     return <Text style={styles.emptyText}>No treatment hubs found in this province.</Text>;
//   }

//   return (
//     <View style={styles.list}>
//       {hubs.map((hub) => {
//         const selected = selectedHubId === hub.treatment_hub_id;
//         const hasCoordinates = typeof hub.latitude === "number" && typeof hub.longitude === "number";
//         const directions = hasCoordinates
//           ? `https://www.google.com/maps/dir/?api=1&destination=${hub.latitude},${hub.longitude}`
//           : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hub.name} ${hub.address ?? ""}`)}`;
//         const services = (hub.services ?? []).map((item) => item.services?.name).filter(Boolean);

//         return (
//           <TouchableOpacity key={hub.treatment_hub_id} activeOpacity={0.9} onPress={() => onSelectHub(hub)} style={[styles.card, selected && styles.cardSelected]}>
//             <View style={styles.accentBar} />
//             <View style={styles.cardInner}>
//               <View style={styles.cardTitleRow}>
//                 <Text style={styles.cardTitle}>{hub.name}</Text>
//               </View>
//               {!!hub.address && <InfoRow icon="location-outline" text={hub.address} styles={styles} />}
//               {!!(hub.contact_number || hub.telephone) && <InfoRow icon="call-outline" text={hub.contact_number || hub.telephone || ""} styles={styles} />}
//               {!!hub.operating_hours && <InfoRow icon="time-outline" text={hub.operating_hours} styles={styles} />}
//               {services.length > 0 && (
//                 <View style={styles.servicesContainer}>
//                   <Text style={styles.servicesTitle}>Services</Text>
//                   <Text style={styles.servicesText}>{services.join(" • ")}</Text>
//                 </View>
//               )}
//               <View style={styles.divider} />
              
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

import type { TreatmentHub } from "@/lib/types/treatment-hub";
import { treatmentHubStyles } from "@/styles/map-styles";
import { scale, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

type Props = {
  hubs: TreatmentHub[];
  selectedHubId: string | null;
  onSelectHub: (hub: TreatmentHub) => void;
};

const primary = "#35408E";

function openLink(url?: string | null) {
  if (url) Linking.openURL(url).catch(console.error);
}

function InfoRow({ icon, text, styles }: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
  styles: ReturnType<typeof treatmentHubStyles>;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconBubble}>
        <Ionicons name={icon} size={scale(14)} color={primary} />
      </View>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function ContactLink({ icon, label, value, onPress, styles }: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onPress: () => void;
  styles: ReturnType<typeof treatmentHubStyles>;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.contactLink}>
      <View style={styles.infoIconBubble}>
        <Ionicons name={icon} size={scale(14)} color={primary} />
      </View>
      <View style={styles.contactLinkContent}>
        <Text style={styles.contactLinkLabel}>{label}</Text>
        <Text style={styles.contactLinkValue}>{value}</Text>
      </View>
      <Ionicons name="open-outline" size={scale(14)} color={primary} />
    </TouchableOpacity>
  );
}

export default function TreatmentHubList({ hubs, selectedHubId, onSelectHub }: Props) {
  const responsive = useResponsive();
  const styles = useMemo(() => treatmentHubStyles(responsive), [responsive]);

  if (!hubs.length) {
    return <Text style={styles.emptyText}>No treatment hubs found in this province.</Text>;
  }

  return (
    <View style={styles.list}>
      {hubs.map((hub) => {
        const selected = selectedHubId === hub.treatment_hub_id;
        const website = hub.website || hub.facebook;
        const services = (hub.services ?? []).map((item) => item.services?.name).filter(Boolean);

        return (
          <TouchableOpacity key={hub.treatment_hub_id} activeOpacity={0.9} onPress={() => onSelectHub(hub)} style={[styles.card, selected && styles.cardSelected]}>
            <View style={styles.accentBar} />
            <View style={styles.cardInner}>
              <View style={styles.cardTitleRow}>
                <Text style={[styles.cardTitle, {color: "#35408E"}]}>{hub.name}</Text>
              </View>
              <View style={styles.divider} />
              {!!hub.address && <InfoRow icon="location-outline" text={hub.address} styles={styles} />}
              {!!(hub.contact_number || hub.telephone) && <InfoRow icon="call-outline" text={hub.contact_number || hub.telephone || ""} styles={styles} />}
              {!!hub.operating_hours && <InfoRow icon="time-outline" text={hub.operating_hours} styles={styles} />}
              {services.length > 0 && (
                <View style={styles.infoRow}>
                    <View style={styles.infoIconBubble}>
                    <Ionicons name="medkit-outline" size={scale(14)} color={primary} />
                    </View>
                    <View style={styles.servicesContainer}>
                    <Text style={styles.servicesText}>{services.join(" • ")}</Text>
                    </View>
                </View>
                )}
              <View style={styles.divider} />
              {(!!hub.email || !!website) && (
                <View style={styles.contactLinksContainer}>
                  {!!hub.email && (
                    <ContactLink
                      icon="mail-outline"
                      label="Email"
                      value={hub.email}
                      onPress={() => openLink(`mailto:${hub.email}`)}
                      styles={styles}
                    />
                  )}
                  {!!website && (
                    <ContactLink
                      icon="globe-outline"
                      label={hub.website ? "Website" : "Facebook / Social Media"}
                      value={website}
                      onPress={() => openLink(website)}
                      styles={styles}
                    />
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}