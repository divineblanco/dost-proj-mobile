import {
    API_URL
} from "@/lib/services/api";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.warn("EXPO_PUBLIC_API_URL is not configured.");
}

async function apiGet<T>(endpoint: string): Promise<T> {
  const baseUrl = API_URL?.replace(/\/$/, "");

  const response = await fetch(
    `${baseUrl}/${endpoint.replace(/^\//, "")}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      `GET ${endpoint} failed: ${response.status} ${message}`
    );
  }

  return response.json();
}

export type GeoJsonFeature = {
  type: "Feature";
  properties?: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any;
  };
};

export type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
};

export type GeomResponse = {
  data: {
    regions: GeoJsonFeatureCollection;
    provinces: GeoJsonFeatureCollection;
    municipalities: GeoJsonFeatureCollection;
    barangays?: GeoJsonFeatureCollection;
  };
};

export type Province = {
  code: string;
  name: string;
  bounds?: any;
};

export type Region = {
  region_code: string;
  region_name: string;
  bounds?: any;
  provinces: Province[];
};

export type HierarchyResponse = {
  data: {
    data: Region[];
  };
};

export async function getGeospatialData(): Promise<GeomResponse> {
  return apiGet<GeomResponse>(
    "maintenance/geospatial/geom"
  );
}

export async function getGeospatialHierarchy(): Promise<HierarchyResponse> {
  return apiGet<HierarchyResponse>(
    "maintenance/geospatial/hierarchy"
  );
}
