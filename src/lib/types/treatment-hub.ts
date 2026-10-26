export type TreatmentHubStatus = "ACTIVE" | "INACTIVE" | "TEMPORARILY_CLOSED";

export interface TreatmentHub {
  treatment_hub_id: string;
  code?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;

  province_name?: string | null;
  province_code?: string | null;

  latitude: number | null;
  longitude: number | null;
  contact_number?: string | null;
  telephone?: string | null;
  email?: string | null;
  website?: string | null;
  facebook?: string | null;
  operating_hours?: string | null;
  status: "ACTIVE" | "INACTIVE" | "TEMPORARILY_CLOSED";
  is_deleted?: boolean;

  provinces?: {
    name?: string | null;
    province_name?: string | null;
    name_1?: string | null;
    iso_1?: string | null;
    cc_1?: string | null;
    ogc_fid?: number | null;
  } | null;

  services?: {
    services: {
      name: string;
      description?: string | null;
    };
  }[];
}

export interface TreatmentHubApiResponse {
  meta?: {
    api_version: string;
    requested_version: string;
    timestamp: string;
  };

  data: {
    edges: {
      node: TreatmentHub;
      cursor: string;
    }[];

    pageInfo: {
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPrevPage?: boolean;
    };

    totalCount: number;
    timestamp?: string;
    success: boolean;
  };
}