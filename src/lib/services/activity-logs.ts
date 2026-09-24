import { API_URL } from "@/lib/services/api";
import axios from "axios";

export interface CreateActivityLogPayload {
  type: string;
  description?: string;
  user_id?: string;
}

export async function createActivityLog(
  payload: CreateActivityLogPayload,
  token?: string
) {
  const endpoint = `${API_URL}/maintenance/activity-logs`;

  console.log("[ACTIVITY LOG] Creating activity log");
  console.log("[ACTIVITY LOG] URL:", endpoint);
  console.log("[ACTIVITY LOG] Payload:", payload);
  console.log("[ACTIVITY LOG] Token exists:", Boolean(token));

  const response = await axios.post(endpoint, payload, {
    headers: {
      "x-api-key": "testing",
      "x-api-version": "2026-02-26",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      "Content-Type": "application/json",
    },
  });

  console.log(
    "[ACTIVITY LOG] Created:",
    JSON.stringify(response.data, null, 2)
  );

  return response.data;
}


// import { API_URL } from "@/lib/services/api";
// import axios from "axios";

// export interface CreateActivityLogPayload {
//   type: string;
//   description?: string;
//   user_id?: string;
// }

// export async function createActivityLog(
//   payload: CreateActivityLogPayload,
//   token?: string
// ) {
//   const endpoint =
//     `${API_URL}/maintenance/activity-logs`;

//   console.log(
//     "[ACTIVITY LOG] Creating activity log..."
//   );

//   console.log(
//     "[ACTIVITY LOG] URL:",
//     endpoint
//   );

//   console.log(
//     "[ACTIVITY LOG] Payload:",
//     payload
//   );

//   console.log(
//     "[ACTIVITY LOG] Token exists:",
//     Boolean(token)
//   );

//   const response = await axios.post(
//     endpoint,
//     payload,
//     {
//       headers: {
//         "x-api-key": "testing",
//         "x-api-version": "2026-02-26",
//         "Content-Type": "application/json",

//         ...(token
//           ? {
//               Authorization:
//                 `Bearer ${token}`,
//             }
//           : {}),
//       },
//     }
//   );

//   console.log(
//     "[ACTIVITY LOG] Created:",
//     JSON.stringify(
//       response.data,
//       null,
//       2
//     )
//   );

//   return response.data;
// }
