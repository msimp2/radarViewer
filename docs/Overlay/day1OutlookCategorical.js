let day1OutlookLayer = null;

export async function addDay1OutlookCategoricalLayer(map) {
    const url = 'https://www.spc.noaa.gov/products/outlook/day1otlk_cat.lyr.geojson';
    const response = await fetch(url);
    const geojson = await response.json();

    // Style function for GeoJSON features
    function style(feature) {
        if (feature.properties && feature.properties.LABEL === 'TSTM') {
            return { color: '#262626', fillColor: '#90ee90', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === 'MRGL') {
            return { color: '#262626', fillColor: '#3eb248', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === 'SLGT') {
            return { color: '#262626', fillColor: '#efff7f', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === 'ENH') {
            return { color: '#262626', fillColor: '#fc9c0c', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === 'MDT') {
            return { color: '#262626', fillColor: '#ff3232', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === 'HIGH') {
            return { color: '#262626', fillColor: '#ff75d0', fillOpacity: 0.5, weight: 2 };
        }
        return { color: '#333', fillColor: '#fff', fillOpacity: 0.2, weight: 1 };
    }

    day1OutlookLayer = L.geoJSON(geojson, { style }).addTo(map);
}

export function removeDay1OutlookCategoricalLayer(map) {
    if (day1OutlookLayer) {
        map.removeLayer(day1OutlookLayer);
        day1OutlookLayer = null;
    }
}