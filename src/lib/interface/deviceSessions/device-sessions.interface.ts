// import { MetaInterface } from "../meta.interface";

// export interface DeviceSessionsInterface {
//   device_sessions_id: string;
//   device_name: string;
//   ip_address: string;
//   is_deleted: boolean;
//   is_revoked: boolean;
//   created_at: unknown;
//   updated_at: unknown;
//   user_id: string;
//   browser: string;
//   device_type: string;
//   os: string;
//   user_agent: string;
// }

// export interface DeviceSessionsResult {
//   meta: MetaInterface;
//   data: {
//     edges: {
//       node: DeviceSessionsInterface;
//       cursor: string;
//     }[];
//     pageInfo: {
//       startCursor: string;
//       endCursor: string;
//       hasNextPage: boolean;
//       hasPrevPage: boolean;
//     };
//     totalCount: number;
//     timestamp: string;
//     success: boolean;
//   };
// }

import { MetaInterface } from "../meta.interface";

export interface DeviceSessionsInterface {
  device_sessions_id: string;

  device_name: string;

  ip_address: string;

  is_deleted: boolean;

  is_revoked: boolean;

  created_at: string;

  updated_at: string;

  user_id: string;

  browser: string;

  device_type: string;

  os: string;

  os_version?: string;

  user_agent: string;

  /**
   * Optional fields.
   * These are recommended for identifying the current session.
   */
  platform?: "WEB" | "ANDROID" | "IOS" | string;

  is_current?: boolean;

  last_active_at?: string | null;
}

export interface DeviceSessionsResult {
  meta: MetaInterface;

  data: {
    edges: {
      node: DeviceSessionsInterface;

      cursor: string;
    }[];

    pageInfo: {
      startCursor: string;

      endCursor: string;

      hasNextPage: boolean;

      hasPrevPage: boolean;
    };

    totalCount: number;

    timestamp: string;

    success: boolean;
  };
}
