import {
    EducationResource,
} from "./educational-resources";

import {
    ResourceItem,
} from "@/components/cards/resources-card";

import {
    MaterialType,
} from "@/components/dropdown/material-dropdown";


/**
 * =========================================================
 * CATEGORY STYLES
 * =========================================================
 */

const CATEGORY_STYLES: Record<
  string,
  {
    label: string;
    icon: string;
    labelBg: string;
    labelColor: string;
    accentColor: string;
  }
> = {

  "hiv prevention": {
    label: "HIV Prevention",
    icon: "shield-alert-outline",
    labelBg: "#EEF0FA",
    labelColor: "#35408E",
    accentColor: "#35408E",
  },

  "treatment hubs": {
    label: "Treatment Hubs",
    icon: "map-marker-radius",
    labelBg: "#FFF0F0",
    labelColor: "#C62828",
    accentColor: "#E53935",
  },

  "hiv treatment": {
    label: "HIV Treatment",
    icon: "pill",
    labelBg: "#FFF4EC",
    labelColor: "#E65100",
    accentColor: "#FF9800",
  },

  guidelines: {
    label: "Guidelines",
    icon: "book-open-page-variant",
    labelBg: "#F8F0FF",
    labelColor: "#6A1B9A",
    accentColor: "#9C27B0",
  },

  research: {
    label: "Research",
    icon: "flask-outline",
    labelBg: "#EEF7F0",
    labelColor: "#2E7D32",
    accentColor: "#43A047",
  },

  "mental health": {
    label: "Mental Health",
    icon: "head-heart-outline",
    labelBg: "#F5EFE9",
    labelColor: "#5D4037",
    accentColor: "#8D6E63",
  },

  infographics: {
    label: "Infographics",
    icon: "chart-box-outline",
    labelBg: "#FFFCE8",
    labelColor: "#F57F17",
    accentColor: "#D4A000",
  },

  videos: {
    label: "Videos",
    icon: "video-outline",
    labelBg: "#EEF7F0",
    labelColor: "#2E7D32",
    accentColor: "#43A047",
  },
};


/**
 * =========================================================
 * DEFAULT CATEGORY STYLE
 * =========================================================
 */

const DEFAULT_CATEGORY_STYLE = {
  label: "General",
  labelBg: "#EEF0FA",
  labelColor: "#35408E",
  accentColor: "#35408E",
  icon: "book-open-page-variant",
};


/**
 * =========================================================
 * GET CATEGORY STYLE
 * =========================================================
 */

function getCategoryStyle(
  categoryName?: string | null
) {
  if (!categoryName) {
    return DEFAULT_CATEGORY_STYLE;
  }

  const normalizedName =
    categoryName
      .trim()
      .toLowerCase();

  return (
    CATEGORY_STYLES[
      normalizedName
    ] ??
    DEFAULT_CATEGORY_STYLE
  );
}


/**
 * =========================================================
 * MAP MATERIAL TYPE
 * =========================================================
 */

function mapMaterialType(
  type?: string | null
): MaterialType {

  switch (
    type?.trim().toUpperCase()
  ) {

    case "ARTICLE":
      return "Article";

    case "VIDEO":
      return "Video";

    case "DOCUMENT":
      return "Document";

    case "CATALOGUE":
      return "Catalogue";

    case "INFOGRAPHIC":
      return "Infographic";

    case "WEBINAR":
      return "Webinar";

    case "PODCAST":
      return "Podcast";

    case "EXTERNAL_LINK":
      return "External Link";

    default:
      return "Article";
  }
}


/**
 * =========================================================
 * CLEAN TEXT
 * =========================================================
 */

function cleanText(
  value?: string | null
): string {

  if (
    !value ||
    value === "undefined" ||
    value === "null"
  ) {
    return "";
  }

  return value.trim();
}


/**
 * =========================================================
 * MAP ONE EDUCATIONAL RESOURCE
 * =========================================================
 */

export function mapEducationResource(
  resource: EducationResource
): ResourceItem {

  const categoryName =
    cleanText(
      resource.category?.name
    ) ||
    "General";

  const categoryStyle =
    getCategoryStyle(
      categoryName
    );


  const summary =
    cleanText(
      resource.summary
    );

  const resourceContent =
    cleanText(
      resource.content
    );


  const description =
    summary ||
    resourceContent ||
    "";


  const content =
    resourceContent ||
    summary ||
    "";


  return {

    id:
      resource.education_resource_id,

    icon:
      categoryStyle.icon,

    title:
      resource.title?.trim() ||
      "Untitled Resource",

    label:
      categoryStyle.label,

    description,

    content,

    materialType:
      mapMaterialType(
        resource.type
      ),

    labelBg:
      categoryStyle.labelBg,

    labelColor:
      categoryStyle.labelColor,

    accentColor:
      categoryStyle.accentColor,
  };
}


/**
 * =========================================================
 * MAP MULTIPLE EDUCATIONAL RESOURCES
 * =========================================================
 */

export function mapEducationResources(
  resources:
    EducationResource[] | null | undefined
): ResourceItem[] {

  if (
    !Array.isArray(resources)
  ) {
    return [];
  }

  return resources
    .filter(
      (
        resource
      ): resource is EducationResource =>
        Boolean(
          resource?.education_resource_id
        )
    )
    .map(
      mapEducationResource
    );
}
