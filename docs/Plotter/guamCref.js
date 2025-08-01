let crefLayer = null;

export function addGuamCrefLayer(map) {
    if (crefLayer) {
        map.addLayer(crefLayer);
        return;
    }
    crefLayer = L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/guam/guam_cref_qcd/ows", {
        layers: 'guam:guam_cref_qcd',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: 'NOAA/NCEP WMS',
        crs: L.CRS.EPSG4326
    });
    crefLayer.addTo(map);
}

export function removeGuamCrefLayer(map) {
    if (crefLayer) {
        map.removeLayer(crefLayer);
    }
}