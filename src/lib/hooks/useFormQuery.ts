// // import { API_URL } from "@/lib/services/api";
// // import { useQuery } from "@tanstack/react-query";
// // import axios from "axios";

// // export interface AxiosHeaders {
// //   [key: string]: string | undefined;
// // }

// // type Props<TVariables, TData> = {
// //   key: unknown[];
// //   url: string;
// //   enabled?: boolean;
// //   headers?: AxiosHeaders;
// //   params?: TVariables;
// // };

// // const useFormQuery = <TData = unknown, TVariables = unknown>({
// //   key,
// //   url,
// //   headers,
// //   enabled = true,
// //   params,
// // }: Props<TVariables, TData>) => {
// //   return useQuery<TData>({
// //     queryKey: key,
// //     enabled,
// //     queryFn: async () => {
// //       const endpoint = url.replace(/^\/+/, "");

// //       const requestUrl = `${API_URL}/${endpoint}`;

// //       console.log("[useFormQuery]");
// //       console.log("API_URL:", API_URL);
// //       console.log("REQUEST URL:", requestUrl);

// //       const res = await axios.get<TData>(requestUrl, {
// //         headers,
// //         params,
// //       });

// //       return res.data;
// //     },
// //   });
// // };

// // export default useFormQuery;


// import { API_URL } from "@/lib/services/api";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export interface AxiosHeaders {
//   [key: string]: string | undefined;
// }

// type Props<TVariables, TData> = {
//   key: unknown[];
//   url: string;
//   enabled?: boolean;
//   headers?: AxiosHeaders;
//   params?: TVariables;
// };

// const useFormQuery = <TData = unknown, TVariables = unknown>({
//   key,
//   url,
//   headers,
//   enabled = true,
//   params,
// }: Props<TVariables, TData>) => {
//   return useQuery<TData>({
//     queryKey: key,
//     enabled,
//     refetchOnMount: "always",
//     refetchOnReconnect: true,
//     queryFn: async () => {
//       const endpoint = url.replace(/^\/+/, "");
//       const requestUrl = `${API_URL}/${endpoint}`;

//       console.log("[useFormQuery]");
//       console.log("API_URL:", API_URL);
//       console.log("REQUEST URL:", requestUrl);
//       console.log("PARAMS:", JSON.stringify(params, null, 2));

//       const res = await axios.get<TData>(requestUrl, {
//         headers,
//         params,
//       });

//       console.log("[useFormQuery] RESULT:", JSON.stringify(res.data, null, 2));

//       return res.data;
//     },
//   });
// };

// export default useFormQuery;


import { API_URL } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface AxiosHeaders{
  [key:string]:string|undefined;
}

type Props<TVariables,TData>={
  key:unknown[];
  url:string;
  enabled?:boolean;
  headers?:AxiosHeaders;
  params?:TVariables;
};

const useFormQuery=<TData=unknown,TVariables=unknown>({
  key,
  url,
  headers,
  enabled=true,
  params,
}:Props<TVariables,TData>)=>{
  return useQuery<TData>({
    queryKey:key,
    enabled,
    staleTime:0,
    refetchOnMount:true,
    refetchOnReconnect:true,
    retry:1,
    queryFn:async()=>{
      const endpoint=url.replace(/^\/+/,"");
      const requestUrl=`${API_URL}/${endpoint}`;

      console.log("[useFormQuery] REQUEST");
      console.log("[useFormQuery] URL:",requestUrl);
      console.log(
        "[useFormQuery] PARAMS:",
        JSON.stringify(params,null,2)
      );
      console.log(
        "[useFormQuery] AUTH:",
        Boolean(headers?.Authorization)
      );

      const response=await axios.get<TData>(
        requestUrl,
        {
          headers,
          params,
        }
      );

      console.log(
        "[useFormQuery] SUCCESS:",
        JSON.stringify(response.data,null,2)
      );

      return response.data;
    },
  });
};

export default useFormQuery;
