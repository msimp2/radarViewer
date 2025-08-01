let brefLayer = null;

export function addConusBrefLayer(map) {
    if (brefLayer) {
        map.addLayer(brefLayer);
        return;
    }
    brefLayer = L.tileLayer.wms("https://opengeo.ncep.noaa.gov/geoserver/conus/conus_bref_qcd/ows", {
        layers: 'conus:conus_bref_qcd',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: 'NOAA/NCEP WMS',
        crs: L.CRS.EPSG4326
    });
    brefLayer.addTo(map);
}

export function removeConusBrefLayer(map) {
    if (brefLayer) {
        map.removeLayer(brefLayer);
    }
}