/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoibm9zZWlsb3MiLCJhIjoiY2x0NnRscm1sMGFwdzJpbTdmY3Y0bnduYSJ9.OfpiD5hWqBoL0VLC5jRpWA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/noseilos/clt6v0y6100gf01o89dta3o4w', // style URL
    scrollZoom: false,
    // center: [121.03530459678788, 14.509581313116637], // starting position [lng, lat]
    // zoom: 17.2, // starting zoom
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
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day: ${loc.day}, ${loc.description}</p>`)
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
};
