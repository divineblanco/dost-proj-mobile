// src/lib/services/educational-resources.ts

import { apiFetch } from "./api";

/**
 * =========================================================
 * TYPES
 * =========================================================
 */

export interface EducationCategory {
  education_category_id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface EducationAttachment {
  education_attachment_id: string;
  education_resource_id: string;
  type: string;
  file_name: string;
  file_url: string;
  mime_type: string | null;
  file_size: number | null;
  order_index: number;
  created_at: string;
}

export interface EducationUserProfile {
  first_name: string;
  last_name: string;
}

export interface EducationUser {
  email: string;
  Profile: EducationUserProfile | null;
}

export interface EducationResource {
  education_resource_id: string;

  content: string | null;
  summary: string | null;

  category: EducationCategory | null;

  title: string;
  slug: string;

  attachments: EducationAttachment[];

  status: string;

  thumbnail: string | null;

  tags: unknown[];

  type: string;

  is_deleted: boolean;

  category_id: string | null;

  external_link: string | null;

  published_at: string | null;

  created_at: string;

  updated_at?: string | null;

  user: EducationUser | null;
}

/**
 * =========================================================
 * API RESPONSE TYPES
 * =========================================================
 */

interface EducationalResourcesListResponse {
  meta?: {
    api_version?: string;
    requested_version?: string | null;
    deprecated?: boolean;
    sunset_date?: string | null;
    timestamp?: string;
    query?: Record<string, unknown>;
    path?: string;
    method?: string;
    status?: number;
  };

  data?: {
    edges?: Array<{
      node?: EducationResource | null;
      cursor?: string;
    }>;

    pageInfo?: {
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
    };

    totalCount?: number;
    timestamp?: string;
    success?: boolean;
  };
}

interface EducationalResourceDetailsResponse {
  meta?: {
    api_version?: string;
    requested_version?: string | null;
    deprecated?: boolean;
    sunset_date?: string | null;
    timestamp?: string;
    query?: Record<string, unknown>;
    path?: string;
    method?: string;
    status?: number;
  };

  data?: {
    timestamp?: string;
    success?: boolean;

    /**
     * Backend may return the resource under one of these
     * properties depending on the controller implementation.
     */
    resource?: EducationResource;

    educational_resource?: EducationResource;

    educationalResource?: EducationResource;

    item?: EducationResource;
  };
}

/**
 * =========================================================
 * ENDPOINTS
 * =========================================================
 */

const EDUCATIONAL_RESOURCES_ENDPOINT =
  "/maintenance/educational-resource";

/**
 * IMPORTANT:
 *
 * This is the endpoint shown by your backend:
 *
 * GET /maintenance/educational-resource/:id
 *
 * Do NOT put the ID into the list endpoint.
 */

/**
 * =========================================================
 * GET ALL EDUCATIONAL RESOURCES
 * =========================================================
 */

export async function getEducationalResources(): Promise<
  EducationResource[]
> {
  try {
    console.log(
      "[EDUCATIONAL RESOURCES] Fetching:",
      EDUCATIONAL_RESOURCES_ENDPOINT
    );

    const response = await apiFetch(
      EDUCATIONAL_RESOURCES_ENDPOINT
    );

    const json =
      (await response.json()) as EducationalResourcesListResponse;

    console.log(
      "[EDUCATIONAL RESOURCES] Raw response:",
      JSON.stringify(json, null, 2)
    );

    const edges = json.data?.edges;

    if (!Array.isArray(edges)) {
      console.error(
        "[EDUCATIONAL RESOURCES] data.edges is not an array:",
        json
      );

      return [];
    }

    const resources = edges
      .map((edge) => edge?.node)
      .filter(
        (resource): resource is EducationResource =>
          Boolean(
            resource &&
              typeof resource === "object" &&
              resource.education_resource_id
          )
      );

    console.log(
      "[EDUCATIONAL RESOURCES] Extracted:",
      resources.length
    );

    return resources;
  } catch (error) {
    console.error(
      "[EDUCATIONAL RESOURCES] FAILED:",
      error
    );

    throw error;
  }
}

/**
 * =========================================================
 * GET PUBLISHED EDUCATIONAL RESOURCES
 * =========================================================
 */

export async function getPublishedEducationalResources(): Promise<
  EducationResource[]
> {
  const resources =
    await getEducationalResources();

  return resources.filter(
    (resource) =>
      resource.status?.toUpperCase() === "PUBLISHED" &&
      resource.is_deleted !== true
  );
}

/**
 * =========================================================
 * GET ONE EDUCATIONAL RESOURCE BY ID
 * =========================================================
 *
 * Backend endpoint:
 *
 * GET /maintenance/educational-resource/:id
 *
 */

export async function getEducationalResourceById(
  id: string
): Promise<EducationResource | null> {
  if (!id) {
    console.error(
      "[EDUCATIONAL RESOURCE DETAILS] Missing ID."
    );

    return null;
  }

  /**
   * Make absolutely sure we only send the ID.
   *
   * If something accidentally passes:
   *
   * /maintenance/educational-resource/abc
   *
   * we extract:
   *
   * abc
   */

  const cleanId = id
    .replace(
      /^\/maintenance\/educational-resource\//,
      ""
    )
    .replace(
      /^\/educational-resource\//,
      ""
    )
    .replace(
      /^\/+/,
      ""
    )
    .trim();

  if (!cleanId) {
    console.error(
      "[EDUCATIONAL RESOURCE DETAILS] Invalid ID:",
      id
    );

    return null;
  }

  const endpoint =
    `${EDUCATIONAL_RESOURCES_ENDPOINT}/${encodeURIComponent(
      cleanId
    )}`;

  console.log(
    "[EDUCATIONAL RESOURCE DETAILS] Fetching:",
    endpoint
  );

  const response =
    await apiFetch(endpoint);

  const json =
    (await response.json()) as EducationalResourceDetailsResponse;

  console.log(
    "[EDUCATIONAL RESOURCE DETAILS] Raw response:",
    JSON.stringify(json, null, 2)
  );

  /**
   * =======================================================
   * IMPORTANT
   * =======================================================
   *
   * Your current backend response is:
   *
   * data: {
   *   timestamp: "...",
   *   success: true
   * }
   *
   * That response DOES NOT contain the resource.
   *
   * Therefore these checks try the common response
   * properties without pretending the resource exists.
   */

  const resource =
    json.data?.resource ??
    json.data?.educational_resource ??
    json.data?.educationalResource ??
    json.data?.item;

  if (
    resource &&
    typeof resource === "object" &&
    resource.education_resource_id
  ) {
    console.log(
      "[EDUCATIONAL RESOURCE DETAILS] Resource found:",
      resource.education_resource_id
    );

    return resource;
  }

  /**
   * =======================================================
   * FALLBACK
   * =======================================================
   *
   * If the detail endpoint returns 200 but does not return
   * the resource itself, fetch the list and locate the ID.
   *
   * This makes the mobile app work even if the backend
   * detail controller currently only returns:
   *
   * {
   *   data: {
   *     success: true
   *   }
   * }
   */

  console.warn(
    "[EDUCATIONAL RESOURCE DETAILS] Detail endpoint did not return resource. Falling back to list endpoint."
  );

  try {
    const resources =
      await getEducationalResources();

    const found =
      resources.find(
        (resource) =>
          String(
            resource.education_resource_id
          ) === String(cleanId)
      ) ?? null;

    if (found) {
      console.log(
        "[EDUCATIONAL RESOURCE DETAILS] Resource found through list fallback:",
        found.education_resource_id
      );
    } else {
      console.error(
        "[EDUCATIONAL RESOURCE DETAILS] Resource not found:",
        cleanId
      );
    }

    return found;
  } catch (fallbackError) {
    console.error(
      "[EDUCATIONAL RESOURCE DETAILS] List fallback failed:",
      fallbackError
    );

    return null;
  }
}
