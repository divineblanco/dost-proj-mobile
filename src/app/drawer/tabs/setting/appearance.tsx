// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { useResponsive } from "@/styles/responsive";
// import { settingsStyles } from "@/styles/settings/settings-styles";
// import Slider from "@react-native-community/slider";
// import React, { useMemo, useState } from "react";
// import {
//   ScrollView
// } from "react-native";

// export default function Appearance() {
//   const [fontSize, setFontSize] = useState(16);

//       const r = useResponsive();
            
//       const styles = useMemo(() => settingsStyles(r), [r]);

//   return (
//     <ScrollView
//       style={styles.pageContainer}
//       contentContainerStyle={styles.scrollContent}
//     >
//       <ThemedView>
//         <ThemedView style={styles.headerContainer}>
//           <ThemedText style={styles.headerTxt}>
//             You can change the app’s appearance to your preference.
//           </ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.dividerLine}></ThemedView>

//         <ThemedView style={styles.appearanceContainer}>
//           <ThemedView style={styles.boxBG}>
//             <ThemedText style={styles.title}>
//               Font Size
//             </ThemedText>
//             <ThemedView style={styles.sliderRow}>
//               <ThemedText style={styles.smallA}>Aa</ThemedText>

//               <Slider
//                 style={styles.slider}
//                 minimumValue={12}
//                 maximumValue={24}
//                 step={1}
//                 value={fontSize}
//                 onValueChange={setFontSize}
//                 minimumTrackTintColor="#35408E"
//                 maximumTrackTintColor="#D1D5DB"
//                 thumbTintColor="#35408E"
//               />

//               <ThemedText style={styles.largeA}>Aa</ThemedText>
//             </ThemedView>

//             <ThemedText
//               style={[
//                 styles.previewText,
//                 {
//                   fontSize,
//                 },
//               ]}
//             >
//               Preview Text
//             </ThemedText>
//           </ThemedView>
//         </ThemedView>    

//       </ThemedView>
//     </ScrollView>
//   );
// }

import { useAppearance } from "@/components/context/AppearanceContext";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useResponsive } from "@/styles/responsive";
import { settingsStyles } from "@/styles/settings/settings-styles";
import Slider from "@react-native-community/slider";
import React, { useMemo } from "react";
import { ScrollView } from "react-native";

export default function Appearance() {
  const {
    fontSize,
    setFontSize,
  } = useAppearance();

  const r = useResponsive();

  const styles = useMemo(
    () => settingsStyles(r),
    [r]
  );

  return (
    <ScrollView
      style={styles.pageContainer}
      contentContainerStyle={styles.scrollContent}
    >
      <ThemedView>

        <ThemedView style={styles.headerContainer}>
          <ThemedText style={styles.headerTxt}>
            You can change the app’s appearance to your preference.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.dividerLine} />

        <ThemedView style={styles.appearanceContainer}>

          <ThemedView style={styles.boxBG}>

            <ThemedText style={styles.title}>
              Font Size
            </ThemedText>

            <ThemedView style={styles.sliderRow}>

              <ThemedText style={styles.smallA}>
                Aa
              </ThemedText>

              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                minimumTrackTintColor="#35408E"
                maximumTrackTintColor="#D1D5DB"
                thumbTintColor="#35408E"
              />

              <ThemedText style={styles.largeA}>
                Aa
              </ThemedText>

            </ThemedView>

            <ThemedText style={styles.previewText}>
              Preview Text
            </ThemedText>

          </ThemedView>

        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
}
