import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const Mapbox = ({ locations }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoibm9zZWlsb3MiLCJhIjoiY2x0NnRscm1sMGFwdzJpbTdmY3Y0bnduYSJ9.OfpiD5hWqBoL0VLC5jRpWA';

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/noseilos/clt6v0y6100gf01o89dta3o4w',
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      new mapboxgl.Popup({
        offset: 10,
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 150,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });

    return () => map.remove();
  }, [locations]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Mapbox;
