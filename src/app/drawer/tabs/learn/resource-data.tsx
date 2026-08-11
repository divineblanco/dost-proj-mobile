import { MaterialType } from "@/components/dropdown/material-dropdown";

export type ResourceItem = {
  id: string;
  icon: string;
  title: string;
  label: string;
  description: string;
  content: string;

  materialType: MaterialType;

  labelBg: string;
  labelColor: string;
  accentColor: string;
};

export const resourcesData: ResourceItem[] = [
  {
    id: "prevention",
    icon: "shield-alert-outline",
    title: "HIV Prevention Guide",
    label: "Prevention",
    description: "Essential information about prevention methods.",
    content:
        "HIV prevention includes condoms, PrEP, PEP, and regular testing...",
    labelBg: "#EEF0FA",
    labelColor: "#35408E",
    accentColor: "#35408E",
    materialType: "Article" as MaterialType,
  },
  {
    id: "testing",
    icon: "stethoscope",
    title: "Understanding HIV Testing",
    label: "Testing",
    description: "Learn about different testing methods and what results mean.",
    content: "Testing helps detect HIV early for better treatment...",
    labelBg: "#FFF0F0",
    labelColor: "#C62828",
    accentColor: "#E53935",
    materialType: "Infographic" as MaterialType,
  },
  {
    id: "treatment",
    icon: "pill",
    title: "HIV Treatment Options",
    label: "Treatment",
    description: "Overview of current treatment approaches and medications.",
    content: "ART suppresses viral load and improves health...",
    labelBg: "#FFF4EC",
    labelColor: "#E65100",
    accentColor: "#FF9800",
    materialType: "Article" as MaterialType,
  },
  {
    id: "support",
    icon: "hand-heart",
    title: "Living Positively with HIV",
    label: "Support",
    description: "Support resources and health management.",
    content: "Support groups and healthy lifestyle are important...",
    labelBg: "#F8F0FF",
    labelColor: "#6A1B9A",
    accentColor: "#9C27B0",
    materialType: "Catalog" as MaterialType,
  },
  {
    id: "awareness",
    icon: "account-group",
    title: "HIV Awareness in Communities",
    label: "Awareness",
    description: "Educational materials for community outreach programs.",
    content: "Awareness reduces stigma and improves care access...",
    labelBg: "#F5EFE9",
    labelColor: "#5D4037",
    accentColor: "#8D6E63",
    materialType: "Infographic" as MaterialType,
  },
  {
    id: "research",
    icon: "book-open-page-variant",
    title: "Latest HIV Research Findings",
    label: "Research",
    description: "Summary of recent scientific advances in HIV research.",
    content: "Research focuses on vaccines and long-term cures...",
    labelBg: "#FFFCE8",
    labelColor: "#F57F17",
    accentColor: "#D4A000",
    materialType: "Article" as MaterialType,
  },
];