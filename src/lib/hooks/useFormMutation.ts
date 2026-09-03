import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Platform } from "react-native";

export interface AxiosHeaders {
  [key: string]: string | undefined;
}

type Props<TVariables, TData> = {
  key: unknown[];
  url: string;
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: AxiosHeaders;
  params?: Record<string, string | number | undefined>;
  isMultipart?: boolean;
};

const getApiUrl = () => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("EXPO_PUBLIC_API_URL is not configured");
  }

  // Android Emulator cannot use localhost to reach the host machine.
  if (Platform.OS === "android") {
    return baseUrl.replace("localhost", "10.0.2.2");
  }

  return baseUrl;
};

const useFormMutation = <
  TVariables = unknown,
  TData = unknown
>({
  key,
  url,
  method,
  headers,
  params,
  isMultipart = false,
}: Props<TVariables, TData>): UseMutationResult<
  TData,
  AxiosError,
  TVariables
> => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationKey: key,

    mutationFn: async (data: TVariables) => {
      let requestData: unknown = data;

      const requestHeaders = {
        ...headers,
      };

      if (isMultipart) {
        const formData = new FormData();

        Object.entries(
          data as Record<string, unknown>
        ).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              formData.append(key, String(v));
            });
          } else if (
            value !== undefined &&
            value !== null
          ) {
            formData.append(key, String(value));
          }
        });

        requestData = formData;

        // Let React Native/Axios set the multipart boundary.
        // Don't manually set Content-Type.
      }

      const baseUrl = getApiUrl()
        .replace(/\/$/, "");

      const endpoint = url.replace(/^\//, "");

      const requestUrl = `${baseUrl}/${endpoint}`;

      const res = await axios({
        url: requestUrl,
        method,
        headers: requestHeaders,
        params,
        data: requestData,
      });

      return res.data as TData;
    },

    onSuccess: (data) => {
      console.log("Mutation Success", data);
    },

    onError: (error: AxiosError) => {
      console.log("Mutation Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    },
  });
};

export default useFormMutation;
