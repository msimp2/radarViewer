let brefLayer = null;

export function addHawaiiBrefLayer(map) {
    if (brefLayer) {
        map.addLayer(brefLayer);
        return;
    }
    brefLayer = L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/hawaii/hawaii_bref_qcd/ows", {
        layers: 'hawaii:hawaii_bref_qcd',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: 'NOAA/NCEP WMS',
        crs: L.CRS.EPSG4326
    });
    brefLayer.addTo(map);
}

export function removeHawaiiBrefLayer(map) {
    if (brefLayer) {
        map.removeLayer(brefLayer);
    }
}