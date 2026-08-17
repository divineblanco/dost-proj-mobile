import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },

  scrollContent: {
    paddingBottom: 95,
  },

  container: {
    paddingVertical: 10
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  tabText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 30,
  },

  tabLogout: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 30,
    color: "#E20000",
  },

  tabIcon: {
    paddingRight: 10
  },
  
  dividerLine: {
    backgroundColor: "#c7c7c7",
    padding: 0.5,
    width: "85%",
    alignSelf: "center",
    marginBottom: 15
  },
  
  boxBG: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0E4F0",
    padding: 15,
    elevation: 2,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },


  //PROFILE SETTINGS
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    padding: 20,
  },

  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 999,
  },

  imageShadow: {
    elevation: 3,
    shadowColor: "#1A1F5E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    borderRadius: 999,
  },

  edit: {
    textDecorationLine: "underline",
    fontWeight: "400",
  },

  infoContainer: {
    padding: 15,
  },

  profileInfoBG: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E4F0",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: "transparent",
  },

  infoColumn: {
    flex: 1,
    backgroundColor: "transparent",
  },

  info: {
    fontSize: 15,
    fontWeight: "800",
    flexShrink: 1
  },

  label: {
    fontSize: 14,
    fontWeight: "300",
    color: "#868686",
    marginTop: 2,
  },

  line: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 15,
  },

  //ACTIVITY LOG
  headerContainer: {
    padding: 20,
  },

  headerTxt: {
    fontSize: 12, 
    fontWeight: "400",
    textAlign: "center"
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },

  column: {
    flex: 1,
    gap: 2,
    backgroundColor: "transparent",
  },

  title: {
    fontSize: 17,
    fontWeight: "800"
  },

  desc: {
    fontSize: 11,
    fontWeight: "400",
    flexWrap: "wrap",
    paddingRight: 5
  },

  date: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8d8c8c"
  },

  //DEVICE SESSIONS
  deviceRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
    alignItems: "center"
  },

  row2: {
    flexDirection: "row",
    paddingHorizontal: 35,
    paddingVertical: 15,
    gap: 15,
    alignItems: "center"
  },
  deviceTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBlockStart: 10,
  },

  icon: {
    backgroundColor: "#353f8e2d",
    padding: 20,
    borderRadius: 999
  },

  deviceInfo: {
    flexDirection: "column",
    gap: 5
  },

  device: {
    fontSize: 15,
    fontWeight: "600",
  },

  location: {
    fontSize: 12,
    fontWeight: "400"
  },
  
  deviceContainer: {
    padding: 15,
  },

  terminateTxt: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold"
  },

  instruction: {
    fontSize: 12,
    fontWeight: "400",
    padding: 10
  },

  //LANGUAGE
  languageRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 20,
    alignItems: "center"
  },

  languageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 15,
    lineHeight: 25
  },

  languageContainer: {
    padding: 15
  },

  language: {
    fontSize: 15,
    color: "#333",
  },

  languageSelected: {
    fontWeight: "700",
    color: "#35408E",
  },

  //APPEARANCE
  appearanceRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
    alignItems: "center"
  },

  appearanceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 15,
    lineHeight: 25
  },

  appearanceContainer: {
    padding: 15,
    gap: 10
  },

  mode: {
    fontSize: 15,
    color: "#333",
  },

  modeSelected: {
    fontWeight: "700",
    color: "#35408E",
  },

  sliderRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

  slider: {
    flex: 1,
  },

  smallA: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35408E",
  },

  largeA: {
    fontSize: 28,
    fontWeight: "700",
    color: "#35408E",
    lineHeight: 35
  },

  previewText: {
    marginTop: 18,
    textAlign: "center",
    color: "#35408E",
    fontWeight: "600",
    lineHeight: 40
  },

  //HELP
  reportContainer: {
    padding: 20
  },

  reportBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#c91010c6",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FECACA",
    padding: 14,
    shadowColor: "#c91010c6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
 
  reportBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "transparent",
    flex: 1,
  },
 
  reportIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
 
  reportTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
 
  reportSubtitle: {
    fontSize: 11,
    color: "white",
  },

  helpTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBlockStart: 10,
  },
  
  questionContainer: {
    padding: 15,
    gap: 10
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },

  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    flexWrap: "wrap",
  },

  //ABOUT
  aboutContainer: {
    paddingVertical: 10,
  },

  versionTxt: {
    color: "grey"
  } 
});