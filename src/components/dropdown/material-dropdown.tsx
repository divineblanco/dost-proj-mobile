// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { resourcesDropdownStyles } from "@/styles/resources/resources-components-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useRef, useState } from "react";
// import {
//   Modal,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View
// } from "react-native";

// export type MaterialType = "Article" | "Infographic" | "Catalogue";

// const OPTIONS: { key: MaterialType; icons: keyof typeof Ionicons.glyphMap}[] = [
//   { key: "Article",     icons: "document-text-outline" },
//   { key: "Infographic", icons: "image-outline" },
//   { key: "Catalogue",     icons: "list-outline" },
// ];

// type Props = {
//   selected: MaterialType[];
//   onChange: (updated: MaterialType[]) => void;
// };

// export function MaterialTypeDropdown({ selected, onChange }: Props) {
//   const [open, setOpen] = useState(false);
//   const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
//   const triggerRef = useRef<View>(null);

//   const toggle = (key: MaterialType) => {
//     if (selected.includes(key)) {
//       onChange(selected.filter((k) => k !== key));
//     } else {
//       onChange([...selected, key]);
//     }
//   };

// const openDropdown = () => {
//   triggerRef.current?.measure(
//     (x, y, width, height, pageX, pageY) => {
//       setDropdownPos({
//         top: pageY + height + r.spacing(4),
//         left: pageX,
//         width,
//       });

//       setOpen(true);
//     }
//   );
// };

//   const hasSelection = selected.length > 0;
//   const label = hasSelection
//     ? selected.length === 1
//       ? selected[0]
//       : `${selected.length} types`
//     : "Material Type";

//     const r = useResponsive();  
//     const styles = useMemo(() => resourcesDropdownStyles(r), [r]);
    

//   return (
//     <View style={styles.container}>
//       {/* Trigger */}
//       <TouchableOpacity
//         ref={triggerRef}
//         style={styles.dropdownButton}
//         onPress={openDropdown}
//         >
//   <ThemedView style={styles.dropdownContent}>
//     <View style={styles.leftContent}>
//       <Ionicons
//         name="layers-outline"
//         size={icon(18)}
//         color="#35408E"
//       />

//       <ThemedText
//         numberOfLines={1}
//         style={styles.dropdownText}
//       >
//         {label}
//       </ThemedText>

//       {hasSelection && (
//         <ThemedView style={styles.countBadge}>
//           <ThemedText style={styles.countText}>
//             {selected.length}
//           </ThemedText>
//         </ThemedView>
//       )}
//     </View>

//     <Ionicons
//       name={open ? "chevron-up-outline" : "chevron-down-outline"}
//       size={icon(16)}
//       color="#35408E"
//     />
//   </ThemedView>
// </TouchableOpacity>

//       {/* Dropdown via Modal so it overlays everything */}
//       <Modal visible={open} transparent animationType="fade" statusBarTranslucent 
//       supportedOrientations={[
//         "portrait",
//         "landscape",
//       ]}>
//         <TouchableWithoutFeedback onPress={() => setOpen(false)}>
//           <View style={styles.modalOverlay}>
//             <TouchableWithoutFeedback>
//               <View
//                 style={[
//                   styles.dropdown,
//                   {
//                     top: dropdownPos.top,
//                     left: dropdownPos.left,
//                     width: dropdownPos.width,
//                   },
//                 ]}
//               >

//                 {/* Options */}
//                 {OPTIONS.map(({ key, icons }) => {
//                   const isChecked = selected.includes(key);
//                   return (
//                     <TouchableOpacity
//                       key={key}
//                       style={[styles.option, isChecked && styles.optionActive]}
//                       onPress={() => toggle(key)}
//                       activeOpacity={0.75}
//                     >
//                       {/* Icon bubble */}
//                       <View style={[styles.optionIcon, { backgroundColor: "#EEF0FA" }]}>
//                         <Ionicons name={icons} size={icon(18)} color="#35408E"/>
//                       </View>

//                       {/* Label */}
//                       <ThemedText
//                         style={[styles.optionLabel, isChecked && { color: "#35408E", fontWeight: "700" }]}
//                       >
//                         {key}
//                       </ThemedText>

//                       {/* Checkbox */}
//                       <View style={[styles.checkbox, isChecked && { backgroundColor: "#35408E", borderColor: "#35408E" }]}>
//                         {isChecked && (
//                           <Ionicons name="checkmark" size={icon(11)} color="#FFFFFF" />
//                         )}
//                       </View>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { resourcesDropdownStyles } from "@/styles/resources/resources-components-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export type MaterialType = "Article" | "Infographic" | "Catalogue" | "Video" | "Document" | "Webinar" | "Podcast" | "External Link";

const OPTIONS: { key: MaterialType; icons: keyof typeof Ionicons.glyphMap }[] = [
  { key: "Article", icons: "document-text-outline" },
  { key: "Infographic", icons: "image-outline" },
  { key: "Catalogue", icons: "list-outline" },
  { key: "Video", icons: "videocam-outline" },
  { key: "Document", icons: "document-outline" },
  { key: "Webinar", icons: "desktop-outline" },
  { key: "Podcast", icons: "mic-outline" },
  { key: "External Link", icons: "open-outline" },
];

type Props = { selected: MaterialType[]; onChange: (updated: MaterialType[]) => void };

export function MaterialTypeDropdown({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<View>(null);
  const r = useResponsive();
  const styles = useMemo(() => resourcesDropdownStyles(r), [r]);

  const toggle = (key: MaterialType) =>
    onChange(selected.includes(key) ? selected.filter(item => item !== key) : [...selected, key]);

  const openDropdown = () => {
    if (open) return setOpen(false);

    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPos({ top: pageY + height + r.spacing(4), left: pageX, width });
      setOpen(true);
    });
  };

  const hasSelection = selected.length > 0;
  const label = hasSelection ? (selected.length === 1 ? selected[0] : `${selected.length} types`) : "Material Type";

  return (
    <View style={styles.container}>
      <TouchableOpacity ref={triggerRef} style={styles.dropdownButton} onPress={openDropdown}>
        <ThemedView style={styles.dropdownContent}>
          <View style={styles.leftContent}>
            <Ionicons name="layers-outline" size={icon(18)} color="#35408E" />
            <ThemedText numberOfLines={1} style={styles.dropdownText}>{label}</ThemedText>
            {hasSelection && (
              <ThemedView style={styles.countBadge}>
                <ThemedText style={styles.countText}>{selected.length}</ThemedText>
              </ThemedView>
            )}
          </View>
          <Ionicons name={open ? "chevron-up-outline" : "chevron-down-outline"} size={icon(16)} color="#35408E" />
        </ThemedView>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" statusBarTranslucent supportedOrientations={["portrait", "landscape"]}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.dropdown, { top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }]}>
                {OPTIONS.map(({ key, icons }) => {
                  const isChecked = selected.includes(key);

                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.option, isChecked && styles.optionActive]}
                      onPress={() => toggle(key)}
                      activeOpacity={0.75}
                    >
                      <View style={[styles.optionIcon, { backgroundColor: "#EEF0FA" }]}>
                        <Ionicons name={icons} size={icon(18)} color="#35408E" />
                      </View>

                      <ThemedText
                        style={[
                          styles.optionLabel,
                          isChecked && { color: "#35408E", fontWeight: "700" },
                        ]}
                      >
                        {key}
                      </ThemedText>

                      <View
                        style={[
                          styles.checkbox,
                          isChecked && { backgroundColor: "#35408E", borderColor: "#35408E" },
                        ]}
                      >
                        {isChecked && <Ionicons name="checkmark" size={icon(11)} color="#FFFFFF" />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
