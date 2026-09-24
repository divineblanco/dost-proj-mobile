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

//   if (!baseUrl) {
//     throw new Error("EXPO_PUBLIC_API_URL is not configured");
//   }

//   // Android Emulator cannot use localhost to reach the host machine.
//   if (Platform.OS === "android") {
//     return baseUrl.replace("localhost", "10.0.2.2");
//   }

//   return baseUrl;
// };

// const useFormMutation = <
//   TVariables = unknown,
//   TData = unknown
// >({
//   key,
//   url,
//   method,
//   headers,
//   params,
//   isMultipart = false,
// }: Props<TVariables, TData>): UseMutationResult<
//   TData,
//   AxiosError,
//   TVariables
// > => {
//   return useMutation<TData, AxiosError, TVariables>({
//     mutationKey: key,

//     mutationFn: async (data: TVariables) => {
//       let requestData: unknown = data;

//       const requestHeaders = {
//         ...headers,
//       };

//       if (isMultipart) {
//         const formData = new FormData();

//         Object.entries(
//           data as Record<string, unknown>
//         ).forEach(([key, value]) => {
//           if (Array.isArray(value)) {
//             value.forEach((v) => {
//               formData.append(key, String(v));
//             });
//           } else if (
//             value !== undefined &&
//             value !== null
//           ) {
//             formData.append(key, String(value));
//           }
//         });

//         requestData = formData;

//         // Let React Native/Axios set the multipart boundary.
//         // Don't manually set Content-Type.
//       }

//       const baseUrl = getApiUrl()
//         .replace(/\/$/, "");

//       const endpoint = url.replace(/^\//, "");

//       const requestUrl = `${baseUrl}/${endpoint}`;

//       const res = await axios({
//         url: requestUrl,
//         method,
//         headers: requestHeaders,
//         params,
//         data: requestData,
//       });

//       return res.data as TData;
//     },

//     onSuccess: (data) => {
//   console.log("[MUTATION SUCCESS]", {
//     key,
//     method,
//     url,
//     data,
//   });
// },


//     onError: (error: AxiosError) => {
//       console.log("Mutation Error:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//         url: error.config?.url,
//       });
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
  if (!baseUrl) throw new Error("EXPO_PUBLIC_API_URL is not configured");
  return Platform.OS === "android" ? baseUrl.replace("localhost", "10.0.2.2") : baseUrl;
};

const useFormMutation = <TVariables = unknown, TData = unknown>({
  key,
  url,
  method,
  headers,
  params,
  isMultipart = false,
}: Props<TVariables, TData>): UseMutationResult<TData, AxiosError, TVariables> => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationKey: key,
    mutationFn: async (data: TVariables) => {
      let requestData: unknown = data;
      const requestHeaders = { ...headers };

      if (isMultipart) {
        const formData = new FormData();
        Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, String(v)));
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        requestData = formData;
      }

      const baseUrl = getApiUrl().replace(/\/$/, "");
      const endpoint = url.replace(/^\//, "");
      const requestUrl = `${baseUrl}/${endpoint}`;

      console.log("[MUTATION REQUEST]", {
        url: requestUrl,
        method,
        data: isMultipart ? "[FormData]" : JSON.stringify(requestData, null, 2),
      });

      const res = await axios({
        url: requestUrl,
        method,
        headers: requestHeaders,
        params,
        data: requestData,
      });

      console.log("[MUTATION RESPONSE]", {
        url: requestUrl,
        status: res.status,
        data: JSON.stringify(res.data, null, 2),
      });

      return res.data as TData;
    },
    onSuccess: (data) => {
      console.log("[MUTATION SUCCESS]", JSON.stringify(data, null, 2));
    },
    onError: (error: AxiosError) => {
      console.log("[MUTATION ERROR]", {
        message: error.message,
        status: error.response?.status,
        url: error.config?.url,
      });

      console.log(
        "[MUTATION ERROR DATA]",
        JSON.stringify(error.response?.data, null, 2)
      );
    },
  });
};

export default useFormMutation;
