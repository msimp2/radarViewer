let brefLayer = null;

export function addCaribbeanBrefLayer(map) {
    if (brefLayer) {
        map.addLayer(brefLayer);
        return;
    }
    brefLayer = L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/caribbean/caribbean_bref_qcd/ows", {
        layers: 'caribbean:caribbean_bref_qcd',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: 'NOAA/NCEP WMS',
        crs: L.CRS.EPSG4326
    });
    brefLayer.addTo(map);
}

export function removeCaribbeanBrefLayer(map) {
    if (brefLayer) {
        map.removeLayer(brefLayer);
    }
}