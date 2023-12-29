import type { FillLayer } from "react-map-gl";

export const countiesLayer: FillLayer = {
  id: "counties",
  type: "fill",
  "source-layer": "original",
  paint: {
    "fill-outline-color": "rgba(0,0,0,0.1)",
    "fill-color": "rgba(0,0,0,0.1)",
  },
};
