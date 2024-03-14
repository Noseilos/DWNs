import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Mapbox = ({ locations, details }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoibm9zZWlsb3MiLCJhIjoiY2x0NnRscm1sMGFwdzJpbTdmY3Y0bnduYSJ9.OfpiD5hWqBoL0VLC5jRpWA";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/noseilos/clto2zidz01mu01pj8rko7hbo",
      scrollZoom: true,
      pitchWithRotate: false,
      pitch: 60,
      minPitch: 60,
      bearing: -17.6,
      maxZoom: 18.5
    });

    const bounds = new mapboxgl.LngLatBounds();

    const loc = locations[0]

    const el = document.createElement("div");
    el.className = "marker";

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p class="text-black">${details.locationName}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
    
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 200,
        left: 150,
        right: 150,
      },
    });
    map.addControl(new mapboxgl.AttributionControl(), "bottom-right");
    window.addEventListener("resize", () => {
      map.resize();
    });

    return () => map.remove();
  }, [locations]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "600px", overflow: "hidden" }}
    />
  );
};

export default Mapbox;
