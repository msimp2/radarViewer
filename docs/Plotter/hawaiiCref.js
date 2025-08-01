let crefLayer = null;

export function addHawaiiCrefLayer(map) {
    if (crefLayer) {
        map.addLayer(crefLayer);
        return;
    }
    crefLayer = L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/hawaii/hawaii_cref_qcd/ows", {
        layers: 'hawaii:hawaii_cref_qcd',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: 'NOAA/NCEP WMS',
        crs: L.CRS.EPSG4326
    });
    crefLayer.addTo(map);
}

export function removeHawaiiCrefLayer(map) {
    if (crefLayer) {
        map.removeLayer(crefLayer);
    }
}