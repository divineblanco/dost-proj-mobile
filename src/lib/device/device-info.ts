// // src/lib/device/device-info.ts

// import * as Device from "expo-device";
// import { Platform } from "react-native";

// export function getMobileDeviceInfo() {
//   return {
//     device_name:
//       Device.modelName ??
//       Device.deviceName ??
//       "Unknown Device",

//     device_type:
//       Device.deviceType === Device.DeviceType.TABLET
//         ? "tablet"
//         : "mobile",

//     os:
//       Device.osName ??
//       Platform.OS,

//     os_version:
//       Device.osVersion ??
//       "Unknown",

//     browser:
//       "App",

//     user_agent:
//       `${Device.modelName ?? "Unknown Device"} / ${
//         Device.osName ?? Platform.OS
//       } ${Device.osVersion ?? ""}`,
//   };
// }

// src/lib/device/device-info.ts

import * as Device from "expo-device";
import { Platform } from "react-native";

export function getMobileDeviceInfo() {
  const platform =
    Platform.OS === "ios"
      ? "IOS"
      : Platform.OS === "android"
        ? "ANDROID"
        : "WEB";

  const deviceName =
    Device.modelName ??
    Device.deviceName ??
    "Unknown Device";

  const osName =
    Device.osName ??
    Platform.OS;

  const osVersion =
    Device.osVersion ??
    "Unknown";

  const deviceType =
    Device.deviceType === Device.DeviceType.TABLET
      ? "tablet"
      : "mobile";

  return {
    device_name: deviceName,

    device_type: deviceType,

    platform,

    os: osName,

    os_version: osVersion,

    browser: "AdvocAID PH App",

    user_agent:
      `${deviceName} / ${osName} ${osVersion}`,
  };
}
