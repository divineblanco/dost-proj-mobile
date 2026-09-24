// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import {
//   resourcesDropdownMaxHeight,
//   resourcesDropdownStyles,
// } from "@/styles/resources/resources-components-styles";
// import { icon, useResponsive } from "@/styles/responsive";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import React, { useMemo, useRef, useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View
// } from "react-native";

// type Resources = {
//   label: string;
//   icon: keyof typeof Feather.glyphMap;
// };

// type ResourcesDropdownProps = {
//   selectedResources: string;
//   setSelectectedResources: (value: string) => void;
// };

// const resources: Resources[] = [
//   { label: "All Categories", icon: "layers" },
//   { label: "Prevention", icon: "shield" },
//   { label: "Testing", icon: "check" },
//   { label: "Treatment", icon: "file-text" },
//   { label: "Support", icon: "heart" },
//   { label: "Awareness", icon: "user" },
//   { label: "Research", icon: "book" },
// ];

// export default function ResourcesDropdown({
//   selectedResources,
//   setSelectectedResources,
// }: ResourcesDropdownProps) {
//   const [open, setOpen] = useState(false);

//   const selectedItem =
//     resources.find((c) => c.label === selectedResources) || null;

//   const triggerRef = useRef<View>(null);

//   const [dropdownPos, setDropdownPos] = useState({
//     top: 0,
//     left: 0,
//     width: 0,
//   });

//   const openDropdown = () => {
//   if (open) {
//     setOpen(false);
//     return;
//   }

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

//   const r = useResponsive();
        
//   const styles = useMemo(() => resourcesDropdownStyles(r), [r]);

//   return (
//     <ThemedView style={styles.container}>
//       {/* BUTTON */}
//       <TouchableOpacity
//         ref={triggerRef}
//         style={styles.dropdownButton}
//         onPress={openDropdown}
//       >
//         <ThemedView style={styles.dropdownContent}>
//           {/* LEFT SIDE (ICON + TEXT) */}
//           <View style={styles.leftContent}>
//             {selectedItem && (
//               <Feather
//                 name={selectedItem.icon}
//                 size={icon(18)}
//                 color="#35408E"
//               />
//             )}

//             <ThemedText style={styles.dropdownText}>
//               {selectedResources || "Select Resources"}
//             </ThemedText>
//           </View>

//           {/* ARROW */}
//           <Ionicons
//             name={open ? "chevron-up-outline" : "chevron-down-outline"}
//             size={icon(16)}
//             color="#35408E"
//           />
//         </ThemedView>
//       </TouchableOpacity>

//       {/* DROPDOWN LIST */}
//       {open && (
//   <Modal
//     visible={open}
//     transparent
//     animationType="fade"
//     supportedOrientations={[
//       "portrait",
//       "landscape",
//     ]}
//   >
//     {/* Outside area */}
//     <TouchableWithoutFeedback onPress={() => setOpen(false)}>
//       <View style={styles.overlay}>
//         {/* Prevent closing when tapping inside */}
//         <TouchableWithoutFeedback>
//           <ThemedView style={[
//                         styles.dropdownMenu,
//                         {
//                           top: dropdownPos.top,
//                           left: dropdownPos.left,
//                           width: dropdownPos.width,
//                         },
//                       ]}>
//             <ScrollView
//               nestedScrollEnabled
//               style={{ maxHeight: resourcesDropdownMaxHeight }}
//             >
//               {resources.map((item) => {
//                 const isActive = selectedResources === item.label;

//                 return (
//                   <TouchableOpacity
//                     key={item.label}
//                     style={[
//                       styles.dropdownItem,
//                       isActive && styles.activeItem,
//                     ]}
//                     onPress={() => {
//                       setSelectectedResources(item.label);
//                       setOpen(false);
//                     }}
//                   >
//                     <Feather
//                       name={item.icon}
//                       size={icon(18)}
//                       color={isActive ? "white" : "#35408E"}
//                     />

//                     <ThemedText
//                       style={[
//                         styles.itemText,
//                         isActive && styles.activeText,
//                       ]}
//                     >
//                       {item.label}
//                     </ThemedText>
//                   </TouchableOpacity>
//                 );
//               })}
//             </ScrollView>
//           </ThemedView>
//         </TouchableWithoutFeedback>
//       </View>
//     </TouchableWithoutFeedback>
//   </Modal>
// )}
//     </ThemedView>
//   );
// }

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { resourcesDropdownMaxHeight, resourcesDropdownStyles } from "@/styles/resources/resources-components-styles";
import { icon, useResponsive } from "@/styles/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type Resources = { label: string; icon: keyof typeof Feather.glyphMap };
type ResourcesDropdownProps = { selectedResources: string; setSelectectedResources: (value: string) => void };

const resources: Resources[] = [
  { label: "All Categories", icon: "layers" },
  { label: "HIV Prevention", icon: "shield" },
  { label: "Treatment Hubs", icon: "map-pin" },
  { label: "HIV Treatment", icon: "activity" },
  { label: "Guidelines", icon: "book-open" },
  { label: "Mental Health", icon: "heart" },
  { label: "Infographics", icon: "image" },
  // { label: "Videos", icon: "video" },
  { label: "Research", icon: "search" },
];

export default function ResourcesDropdown({ selectedResources, setSelectectedResources }: ResourcesDropdownProps) {
  const [open, setOpen] = useState(false);
  const r = useResponsive();
  const styles = useMemo(() => resourcesDropdownStyles(r), [r]);
  const selectedItem = resources.find(item => item.label === selectedResources) || null;
  const triggerRef = useRef<View>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const openDropdown = () => {
    if (open) return setOpen(false);

    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPos({ top: pageY + height + r.spacing(4), left: pageX, width });
      setOpen(true);
    });
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity ref={triggerRef} style={styles.dropdownButton} onPress={openDropdown}>
        <ThemedView style={styles.dropdownContent}>
          <View style={styles.leftContent}>
            {selectedItem && <Feather name={selectedItem.icon} size={icon(18)} color="#35408E" />}
            <ThemedText style={styles.dropdownText}>{selectedResources || "Select Resources"}</ThemedText>
          </View>
          <Ionicons name={open ? "chevron-up-outline" : "chevron-down-outline"} size={icon(16)} color="#35408E" />
        </ThemedView>
      </TouchableOpacity>

      {open && (
        <Modal visible={open} transparent animationType="fade" supportedOrientations={["portrait", "landscape"]}>
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <ThemedView style={[styles.dropdownMenu, { top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }]}>
                  <ScrollView nestedScrollEnabled style={{ maxHeight: resourcesDropdownMaxHeight }}>
                    {resources.map(item => {
                      const isActive = selectedResources === item.label;

                      return (
                        <TouchableOpacity
                          key={item.label}
                          style={[styles.dropdownItem, isActive && styles.activeItem]}
                          onPress={() => {
                            setSelectectedResources(item.label);
                            setOpen(false);
                          }}
                        >
                          <Feather name={item.icon} size={icon(18)} color={isActive ? "white" : "#35408E"} />
                          <ThemedText style={[styles.itemText, isActive && styles.activeText]}>{item.label}</ThemedText>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </ThemedView>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ThemedView>
  );
}
