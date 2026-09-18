// src/lib/services/api.ts

import { Platform } from "react-native";

/**
 * =========================================================
 * ENVIRONMENT
 * =========================================================
 */

const ENV_API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "";

const API_KEY =
  process.env.EXPO_PUBLIC_API_KEY ?? "";

/**
 * =========================================================
 * API URL
 * =========================================================
 *
 * iOS Simulator:
 *   http://localhost:4000
 *
 * Android Emulator:
 *   http://10.0.2.2:4000
 *
 * Physical device:
 *   Use your computer's LAN IP instead of localhost.
 *
 * Example:
 *   http://192.168.1.100:4000
 *
 * IMPORTANT:
 * We only replace localhost for Android.
 */

export const API_URL =
  Platform.OS === "android"
    ? ENV_API_URL.replace(
        /^http:\/\/localhost(?=[:/]|$)/,
        "http://10.0.2.2"
      )
    : ENV_API_URL;

/**
 * API key used by existing API calls.
 */
export const API_KEY_VALUE =
  API_KEY;

/**
 * =========================================================
 * API FETCH
 * =========================================================
 *
 * Existing screens can continue using:
 *
 *   fetch(`${API_URL}/maintenance/contribution`, ...)
 *
 * without changing their code.
 *
 * New screens can also use:
 *
 *   apiFetch("/maintenance/contribution")
 *
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
        Accept:
          "application/json",

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
        status:
          response.status,
        response:
          errorText,
      }
    );

    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response;
}
