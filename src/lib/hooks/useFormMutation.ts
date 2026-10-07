// import { useMutation, UseMutationResult } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
// import { Platform } from "react-native";

// export interface AxiosHeaders {
//   [key: string]: string | undefined;
// }

// type Props<TVariables, TData> = {
//   key: unknown[];
//   url: string;
//   method: "POST" | "PUT" | "DELETE" | "PATCH";
//   headers?: AxiosHeaders;
//   params?: Record<string, string | number | undefined>;
//   isMultipart?: boolean;
// };

// const getApiUrl = () => {
//   const baseUrl = process.env.EXPO_PUBLIC_API_URL;
//   if (!baseUrl) throw new Error("EXPO_PUBLIC_API_URL is not configured");
//   return Platform.OS === "android" ? baseUrl.replace("localhost", "10.0.2.2") : baseUrl;
// };

// const useFormMutation = <TVariables = unknown, TData = unknown>({
//   key,
//   url,
//   method,
//   headers,
//   params,
//   isMultipart = false,
// }: Props<TVariables, TData>): UseMutationResult<TData, AxiosError, TVariables> => {
//   return useMutation<TData, AxiosError, TVariables>({
//     mutationKey: key,
//     mutationFn: async (data: TVariables) => {
//       let requestData: unknown = data;
//       const requestHeaders = { ...headers };

//       if (isMultipart) {
//         const formData = new FormData();
//         Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
//           if (Array.isArray(value)) {
//             value.forEach((v) => formData.append(key, String(v)));
//           } else if (value !== undefined && value !== null) {
//             formData.append(key, String(value));
//           }
//         });
//         requestData = formData;
//       }

//       const baseUrl = getApiUrl().replace(/\/$/, "");
//       const endpoint = url.replace(/^\//, "");
//       const requestUrl = `${baseUrl}/${endpoint}`;

//       console.log("[MUTATION REQUEST]", {
//         url: requestUrl,
//         method,
//         data: isMultipart ? "[FormData]" : JSON.stringify(requestData, null, 2),
//       });

//       const res = await axios({
//         url: requestUrl,
//         method,
//         headers: requestHeaders,
//         params,
//         data: requestData,
//       });

//       console.log("[MUTATION RESPONSE]", {
//         url: requestUrl,
//         status: res.status,
//         data: JSON.stringify(res.data, null, 2),
//       });

//       return res.data as TData;
//     },
//     onSuccess: (data) => {
//       console.log("[MUTATION SUCCESS]", JSON.stringify(data, null, 2));
//     },
//     onError: (error: AxiosError) => {
//       console.log("[MUTATION ERROR]", {
//         message: error.message,
//         status: error.response?.status,
//         url: error.config?.url,
//       });

//       console.log(
//         "[MUTATION ERROR DATA]",
//         JSON.stringify(error.response?.data, null, 2)
//       );
//     },
//   });
// };

// export default useFormMutation;

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

  return Platform.OS === "android"
    ? baseUrl.replace("localhost", "10.0.2.2")
    : baseUrl;
};

const useFormMutation = <TVariables = unknown, TData = unknown>({
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

      if (isMultipart) {
        const formData = new FormData();

        Object.entries(data as Record<string, unknown>).forEach(
          ([key, value]) => {
            if (value == null) {
              return;
            }

            if (Array.isArray(value)) {
              value.forEach((item) => {
                formData.append(key, item as any);
              });
            } else {
              formData.append(key, value as any);
            }
          }
        );

        requestData = formData;
      }

      const requestUrl =
        `${getApiUrl().replace(/\/$/, "")}/` +
        `${url.replace(/^\//, "")}`;

      console.log("[MUTATION REQUEST]", {
        url: requestUrl,
        method,
        data: isMultipart
          ? "[FormData]"
          : JSON.stringify(requestData, null, 2),
      });

      try {
        const res = await axios({
          url: requestUrl,
          method,
          headers,
          params,
          data: requestData,
        });

        console.log("[MUTATION RESPONSE]", {
          url: requestUrl,
          status: res.status,
          data: JSON.stringify(res.data, null, 2),
        });

        return res.data as TData;
      } catch (error) {
        const axiosError = error as AxiosError;

        console.log("[MUTATION ERROR]", {
          message: axiosError.message,
          status: axiosError.response?.status,
          url: axiosError.config?.url,
          data: axiosError.response?.data,
        });

        throw error;
      }
    },

    onSuccess: (data) => {
      console.log(
        "[MUTATION SUCCESS]",
        JSON.stringify(data, null, 2)
      );
    },

    onError: (error) => {
      console.log("[MUTATION ERROR]", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    },
  });
};

export default useFormMutation;
