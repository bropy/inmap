import { useEffect, useState } from "react";

type LatLng = [number, number];

export default function useTactilePaths(bounds?: [number, number, number, number]) {
  const [paths, setPaths] = useState<LatLng[][]>([]);

  useEffect(() => {
    const bbox = bounds || [49.82, 24.00, 49.86, 24.06]; // Lviv
    const query = `
      [out:json][timeout:25];
      (
        way["tactile_paving"="yes"](${bbox.join(",")});
      );
      out body;
      >;
      out skel qt;
    `;

    const fetchLocal = fetch("/data/tactile-paths.json").then((res) => res.json());
    const fetchOnline = fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        const nodes: Record<string, LatLng> = {};
        data.elements.forEach((el: any) => {
          if (el.type === "node") {
            nodes[el.id] = [el.lat, el.lon];
          }
        });

        const overpassPaths = data.elements
          .filter((el: any) => el.type === "way")
          .map((way: any) => way.nodes.map((nodeId: number) => nodes[nodeId]))
          .filter((path: LatLng[]) => path.every(Boolean));

        return overpassPaths;
      });

    Promise.all([fetchLocal, fetchOnline])
      .then(([localPaths, overpassPaths]) => {
        setPaths([...localPaths, ...overpassPaths]);
      });
  }, [bounds]);

  return paths;
}
