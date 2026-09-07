// src/lib/services/geomApi.ts

export type GeomItem = {
  id: string | number;
  code: string | number;
  name: string;
  bounds?: unknown;
};

type BackendResponse<T> = {
  success: boolean;
  data: T;
  timestamp: string;
};

type WrappedApiResponse<T> = {
  data: BackendResponse<T>;
  meta: {
    api_version?: string;
    deprecated?: boolean;
    method?: string;
    path?: string;
    query?: Record<string, unknown>;
    requested_version?: string | null;
    status?: number;
    sunset_date?: string | null;
    timestamp?: string;
  };
};

const API_URL = "http://localhost:4000/maintenance/geospatial";

/**
 * Generic API request.
 *
 * IMPORTANT:
 * Your Express responseWrapperMiddleware wraps the controller response.
 *
 * Actual response:
 *
 * {
 *   data: {
 *     success: true,
 *     data: [...]
 *   },
 *   meta: {...}
 * }
 *
 * Therefore we return:
 *
 * json.data.data
 */
async function apiRequest<T>(
  endpoint: string,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  console.log("Geom API request:", url);

  try {
    const response = await fetch(url);

    const responseText = await response.text();

    console.log(
      "Geom API status:",
      response.status,
    );

    if (!response.ok) {
      console.error(
        "Geom API error:",
        responseText,
      );

      throw new Error(
        `API ${response.status}: ${responseText}`,
      );
    }

    let json: WrappedApiResponse<T>;

    try {
      json = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Invalid JSON response from API: ${responseText}`,
      );
    }

    console.log(
      "Geom API response:",
      JSON.stringify(json),
    );

    /**
     * The responseWrapperMiddleware creates:
     *
     * json.data.success
     * json.data.data
     */
    const controllerResponse = json.data;

    if (!controllerResponse) {
      throw new Error(
        "API response is missing data.",
      );
    }

    if (!controllerResponse.success) {
      throw new Error(
        "API returned success: false",
      );
    }

    return controllerResponse.data;
  } catch (error) {
    console.error(
      "Geom API request failed:",
      error,
    );

    throw error;
  }
}

/**
 * =====================================================
 * GET REGIONS
 * =====================================================
 *
 * Backend:
 *
 * GET /maintenance/geospatial/regions
 */
export async function getRegions(): Promise<
  GeomItem[]
> {
  return apiRequest<GeomItem[]>(
    "/regions",
  );
}

/**
 * =====================================================
 * GET PROVINCES
 * =====================================================
 *
 * Backend:
 *
 * GET /maintenance/geospatial/provinces
 *
 * Query:
 *
 * ?region_code=1
 */
export async function getProvinces(
  regionCode: string | number,
): Promise<GeomItem[]> {
  return apiRequest<GeomItem[]>(
    `/provinces?region_code=${encodeURIComponent(
      String(regionCode),
    )}`,
  );
}

/**
 * =====================================================
 * GET MUNICIPALITIES
 * =====================================================
 *
 * Backend:
 *
 * GET /maintenance/geospatial/municipalities
 *
 * Query:
 *
 * ?province_code=123
 */
export async function getMunicipalities(
  provinceCode: string | number,
): Promise<GeomItem[]> {
  return apiRequest<GeomItem[]>(
    `/municipalities?province_code=${encodeURIComponent(
      String(provinceCode),
    )}`,
  );
}

/**
 * =====================================================
 * GET BARANGAYS
 * =====================================================
 *
 * Backend:
 *
 * GET /maintenance/geospatial/barangays
 *
 * Query:
 *
 * ?municipality_code=123
 */
export async function getBarangays(
  municipalityCode: string | number,
): Promise<GeomItem[]> {
  return apiRequest<GeomItem[]>(
    `/barangays?municipality_code=${encodeURIComponent(
      String(municipalityCode),
    )}`,
  );
}
