export type Coordinate = [number, number];

export function getGeometryCoordinates(
  geometry: any
): Coordinate[] {
  if (!geometry?.coordinates) {
    return [];
  }

  if (geometry.type === "Polygon") {
    return geometry.coordinates
      .flat(1)
      .filter(
        (coordinate: any): coordinate is Coordinate =>
          Array.isArray(coordinate) &&
          coordinate.length >= 2 &&
          Number.isFinite(Number(coordinate[0])) &&
          Number.isFinite(Number(coordinate[1]))
      )
      .map(
        (coordinate: any) => [
          Number(coordinate[0]),
          Number(coordinate[1]),
        ] as Coordinate
      );
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .flat(2)
      .filter(
        (coordinate: any): coordinate is Coordinate =>
          Array.isArray(coordinate) &&
          coordinate.length >= 2 &&
          Number.isFinite(Number(coordinate[0])) &&
          Number.isFinite(Number(coordinate[1]))
      )
      .map(
        (coordinate: any) => [
          Number(coordinate[0]),
          Number(coordinate[1]),
        ] as Coordinate
      );
  }

  return [];
}

export function getCenterFromGeometry(
  geometry: any
): Coordinate | null {
  const coordinates = getGeometryCoordinates(geometry);

  if (!coordinates.length) {
    return null;
  }

  const lngs = coordinates.map(
    ([lng]) => lng
  );

  const lats = coordinates.map(
    ([, lat]) => lat
  );

  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  return [
    (minLng + maxLng) / 2,
    (minLat + maxLat) / 2,
  ];
}

export function getBoundsFromGeometry(
  geometry: any
): [[number, number], [number, number]] | null {
  const coordinates = getGeometryCoordinates(geometry);

  if (!coordinates.length) {
    return null;
  }

  const lngs = coordinates.map(
    ([lng]) => lng
  );

  const lats = coordinates.map(
    ([, lat]) => lat
  );

  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}
