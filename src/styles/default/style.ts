const filters = {
  settlements1: ['in', 'type', 1],
  settlements2: ['in', 'type', 2, 'city'],
  settlements3: ['in', 'type', 3, 'town'],
  settlements4: ['in', 'type', 4],
  settlements5: ['in', 'type', 5],
  settlements6: ['!in', 'type', 1, 2, 3, 4, 5, 'city', 'town'],
};

export default (origin: string, stops: any, row: any) => ({
  version: 8,
  name: 'Atlas Default',
  sprite: origin + '/sprites/default/sprite',
  glyphs: origin + '/fonts/{fontstack}/{range}.pbf',
  sources: {
    fieldmaps: {
      bounds: row.bounds_tiles.split(',').map(Number),
      maxzoom: Number(row.maxzoom),
      tiles: [origin + '/tiles/' + row.iso_3 + '/{z}/{x}/{y}.pbf'],
      type: 'vector',
      attribution: '<a href="https://fieldmaps.io">Fieldmaps.io</a>',
    },
  },
  layers: [
    {
      id: 'protected-areas',
      source: 'fieldmaps',
      'source-layer': 'protectedareas',
      type: 'fill',
      paint: { 'fill-color': '#DAE3D9' },
    },
    {
      filter: ['==', 'type', 'wetland'],
      id: 'wetlands',
      source: 'fieldmaps',
      'source-layer': 'lakes',
      type: 'fill',
      paint: { 'fill-color': '#B6DAE7' },
    },
    {
      id: 'rivers',
      paint: {
        'line-color': '#94CCDC',
        'line-width': { stops: stops.rivers, base: 2 },
      },
      source: 'fieldmaps',
      'source-layer': 'rivers',
      type: 'line',
    },
    {
      filter: ['==', 'type', 'water'],
      id: 'lakes',
      source: 'fieldmaps',
      'source-layer': 'lakes',
      type: 'fill',
      paint: { 'fill-color': '#56B3CD' },
    },
    {
      filter: ['in', 'type', 'motorway', 'trunk', 'primary'],
      id: 'roads-primary',
      paint: {
        'line-color': '#F69E61',
        'line-gap-width': 1,
        'line-width': { stops: stops.roadsPrimary, base: 2 },
      },
      source: 'fieldmaps',
      'source-layer': 'roads',
      type: 'line',
    },
    {
      filter: ['==', 'type', 'secondary'],
      id: 'roads-secondary',
      paint: {
        'line-color': '#F69E61',
        'line-width': { stops: stops.roadsSecondary, base: 2 },
      },
      source: 'fieldmaps',
      'source-layer': 'roads',
      type: 'line',
    },
    {
      filter: ['==', 'type', 'tertiary'],
      id: 'roads-tertiary',
      paint: {
        'line-color': '#F69E61',
        'line-dasharray': [2, 2],
        'line-width': { stops: stops.roadsTertiary, base: 2 },
      },
      source: 'fieldmaps',
      'source-layer': 'roads',
      type: 'line',
    },
    {
      id: 'admin0',
      source: 'fieldmaps',
      'source-layer': 'admin0',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-width': { stops: stops.admin0, base: 2 },
      },
    },
    {
      id: 'undetermined-areas',
      source: 'fieldmaps',
      'source-layer': 'undeterminedareas',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-dasharray': [2, 2],
        'line-width': { stops: stops.undeterminedAreas, base: 2 },
      },
    },
    {
      id: 'admin1',
      source: 'fieldmaps',
      'source-layer': 'admin1',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-width': { stops: stops.admin1, base: 2 },
      },
    },
    {
      id: 'admin2',
      source: 'fieldmaps',
      'source-layer': 'admin2',
      type: 'line',
      paint: {
        'line-color': 'black',
        'line-width': { stops: stops.admin2, base: 2 },
      },
    },
    {
      id: 'sea-ports-2',
      minzoom: stops.seaPorts1[1][0],
      layout: {
        'icon-image': 'ferry-11',
      },
      source: 'fieldmaps',
      'source-layer': 'seaports',
      type: 'symbol',
    },
    {
      id: 'sea-ports-1',
      maxzoom: stops.seaPorts1[1][0],
      paint: {
        'circle-color': '#000000',
        'circle-radius': { stops: stops.seaPorts1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'seaports',
      type: 'circle',
    },
    {
      filter: ['==', 'type', 'helipad'],
      id: 'airports-3',
      minzoom: stops.airports1[1][0],
      layout: {
        'icon-image': 'heliport-11',
      },
      source: 'fieldmaps',
      'source-layer': 'airports',
      type: 'symbol',
    },
    {
      filter: ['!=', 'type', 'helipad'],
      id: 'airports-2',
      minzoom: stops.airports1[1][0],
      layout: {
        'icon-image': 'airport-11',
      },
      source: 'fieldmaps',
      'source-layer': 'airports',
      type: 'symbol',
    },
    {
      id: 'financial-services-2',
      minzoom: stops.financialServices1[1][0],
      layout: {
        'icon-image': 'bank-11',
      },
      source: 'fieldmaps',
      'source-layer': 'financialservices',
      type: 'symbol',
    },
    {
      id: 'education-facilities-2',
      minzoom: stops.educationFacilities1[1][0],
      layout: {
        'icon-image': 'college-11',
      },
      source: 'fieldmaps',
      'source-layer': 'educationfacilities',
      type: 'symbol',
    },
    {
      id: 'health-facilities-2',
      minzoom: stops.healthFacilities1[1][0],
      layout: {
        'icon-image': 'hospital-11',
      },
      source: 'fieldmaps',
      'source-layer': 'healthfacilities',
      type: 'symbol',
    },
    {
      filter: filters.settlements6,
      id: 'settlements-6',
      minzoom: stops.settlements6[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements6, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements5,
      id: 'settlements-5',
      minzoom: stops.settlements5[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements5, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements4,
      id: 'settlements-4',
      minzoom: stops.settlements4[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements4, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements3,
      id: 'settlements-3',
      minzoom: stops.settlements3[0][0],
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements3, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements2,
      id: 'settlements-2',
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements2, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements1,
      id: 'settlements-1',
      paint: {
        'circle-color': '#56585A',
        'circle-radius': { stops: stops.settlements1, base: 2 },
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255, 255, 255, 0.9)',
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'circle',
    },
    {
      filter: filters.settlements6,
      id: 'settlements-text-6',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light'],
        'text-size': 12,
      },
      minzoom: stops.settlements6[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements5,
      id: 'settlements-text-5',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light'],
        'text-size': 12,
      },
      minzoom: stops.settlements5[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements4,
      id: 'settlements-text-4',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light'],
        'text-size': 12,
      },
      minzoom: stops.settlements4[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements3,
      id: 'settlements-text-3',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light'],
        'text-size': 14,
      },
      minzoom: stops.settlements3[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements2,
      id: 'settlements-text-2',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light'],
        'text-size': 14,
      },
      minzoom: stops.settlements2[1][0],
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'symbol',
    },
    {
      filter: filters.settlements1,
      id: 'settlements-text-1',
      layout: {
        'text-anchor': 'bottom-left',
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light'],
        'text-size': 14,
      },
      paint: {
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'settlements',
      type: 'symbol',
    },
    {
      id: 'undetermined-areas-text',
      layout: {
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light-italic'],
        'text-line-height': 1,
        'text-max-width': 2,
        'text-size': 16,
      },
      minzoom: stops.admin2[0][0] + 1,
      maxzoom: stops.admin2[1][0],
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'undeterminedareaslabels',
      type: 'symbol',
    },
    {
      id: 'admin2-text',
      layout: {
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light-italic'],
        'text-line-height': 1,
        'text-max-width': 2,
        'text-size': 16,
      },
      minzoom: stops.admin2[0][0] + 1,
      maxzoom: stops.admin2[1][0],
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'admin2labels',
      type: 'symbol',
    },
    {
      id: 'admin1-text',
      layout: {
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light-italic'],
        'text-line-height': 1,
        'text-max-width': 2,
        'text-size': 20,
      },
      minzoom: stops.admin1[1][0],
      maxzoom: stops.admin1[1][0] + 1,
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'admin1labels',
      type: 'symbol',
    },
    {
      id: 'admin0-text',
      layout: {
        'text-field': '{name}',
        'text-font': ['noto-sans-condensed-light-italic'],
        'text-size': 22,
      },
      minzoom: stops.admin0[0][0],
      maxzoom: stops.admin0[1][0],
      paint: {
        'text-color': 'black',
        'text-halo-color': 'rgba(255, 255, 255, 0.9)',
        'text-halo-width': 1.5,
      },
      source: 'fieldmaps',
      'source-layer': 'admin0labels',
      type: 'symbol',
    },
  ],
});