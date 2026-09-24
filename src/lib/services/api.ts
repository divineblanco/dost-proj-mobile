import { Platform } from "react-native";

const ENV_API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "";

const ENV_SURVEY_URL =
  process.env.EXPO_PUBLIC_SURVEY_URL ?? "";

const API_KEY =
  process.env.EXPO_PUBLIC_API_KEY ?? "";

function replaceLocalhostForAndroid(url: string) {
  const cleanUrl = url.replace(/\/+$/, "");

  if (Platform.OS === "android") {
    return cleanUrl.replace(
      /^http:\/\/localhost(?=[:/]|$)/,
      "http://10.0.2.2"
    );
  }

  return cleanUrl;
}

export const API_URL =
  replaceLocalhostForAndroid(ENV_API_URL);

export const SURVEY_URL =
  replaceLocalhostForAndroid(ENV_SURVEY_URL);

export const API_KEY_VALUE =
  API_KEY;

console.log("=================================");
console.log("PLATFORM:", Platform.OS);
console.log("ENV_API_URL:", ENV_API_URL);
console.log("FINAL API_URL:", API_URL);
console.log("ENV_SURVEY_URL:", ENV_SURVEY_URL);
console.log("FINAL SURVEY_URL:", SURVEY_URL);
console.log("=================================");


/**
 * =========================================================
 * API FETCH
 * =========================================================
 */

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  if (!API_URL) {
    throw new Error(
      "EXPO_PUBLIC_API_URL is not configured."
    );
  }

  const baseUrl =
    API_URL.replace(/\/+$/, "");

  const path =
    endpoint.replace(/^\/+/, "");

  const url =
    `${baseUrl}/${path}`;

  console.log(
    "[API REQUEST]",
    options.method ?? "GET",
    url
  );

  const response =
    await fetch(url, {
      ...options,

      headers: {
        Accept: "application/json",

        "Content-Type":
          "application/json",

        ...(API_KEY_VALUE
          ? {
              "X-API-Key":
                API_KEY_VALUE,
            }
          : {}),

        ...(options.headers || {}),
      },
    });

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "[API ERROR]",
      {
        url,
        status: response.status,
        response: errorText,
      }
    );

    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response;
}


// import { Platform } from "react-native";

// const ENV_API_URL =
//   process.env.EXPO_PUBLIC_API_URL ?? "";

// const API_KEY =
//   process.env.EXPO_PUBLIC_API_KEY ?? "";

// function getApiUrl() {
//   const url = ENV_API_URL.replace(/\/+$/, "");

//   if (Platform.OS === "android") {
//     return url.replace(
//       /^http:\/\/localhost(?=[:/]|$)/,
//       "http://10.0.2.2"
//     );
//   }

//   return url;
// }

// export const API_URL = getApiUrl();

// export const API_KEY_VALUE = API_KEY;

// console.log("=================================");
// console.log("PLATFORM:", Platform.OS);
// console.log("ENV_API_URL:", ENV_API_URL);
// console.log("FINAL API_URL:", API_URL);
// console.log("=================================");

// export async function apiFetch(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<Response> {
//   if (!API_URL) {
//     throw new Error(
//       "EXPO_PUBLIC_API_URL is not configured."
//     );
//   }

//   const baseUrl = API_URL.replace(/\/+$/, "");

//   const path = endpoint.replace(/^\/+/, "");

//   const url = `${baseUrl}/${path}`;

//   console.log(
//     "[API REQUEST]",
//     options.method ?? "GET",
//     url
//   );

//   const response = await fetch(url, {
//     ...options,

//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",

//       ...(API_KEY_VALUE
//         ? {
//             "X-API-Key": API_KEY_VALUE,
//           }
//         : {}),

//       ...(options.headers || {}),
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();

//     console.error("[API ERROR]", {
//       url,
//       status: response.status,
//       response: errorText,
//     });

//     throw new Error(
//       `API request failed: ${response.status} ${response.statusText}`
//     );
//   }

//   return response;
// }
