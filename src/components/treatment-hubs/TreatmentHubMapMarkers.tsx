import type { TreatmentHub } from "@/lib/types/treatment-hub";
import type { MapMarker } from "react-native-leaflet-view";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]!);

export default function TreatmentHubMapMarkers({
  hubs,
}: {
  hubs: TreatmentHub[];
}): MapMarker[] {
  return hubs.flatMap((hub) => {
    const lat = Number(hub.latitude);
    const lng = Number(hub.longitude);

    if (
      hub.latitude == null ||
      hub.longitude == null ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      Math.abs(lat) > 90 ||
      Math.abs(lng) > 180
    ) {
      return [];
    }

    return [{
      id: `hub-${hub.treatment_hub_id}`,
      position: { lat, lng },
      icon: "📍",
      size: [32, 32] as [number, number],
      popup: {
        id: `hub-popup-${hub.treatment_hub_id}`,
        content:
          `<strong>${escapeHtml(hub.name)}</strong><br/>` +
          escapeHtml(hub.address ?? "Address unavailable"),
      },
    }];
  });
}