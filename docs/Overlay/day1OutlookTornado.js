let day1TornadoLayer = null;

export async function addDay1OutlookTornadoLayer(map) {
    const url = 'https://www.spc.noaa.gov/products/outlook/day1otlk_torn.lyr.geojson';
    const response = await fetch(url);
    const geojson = await response.json();

    // Style function for GeoJSON features
    function style(feature) {
        if (feature.properties && feature.properties.LABEL === '0.02') {
            return { color: '#262626', fillColor: '#3eb248', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === '0.05') {
            return { color: '#262626', fillColor: '#b2743e', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === '0.1') {
            return { color: '#262626', fillColor: '#fcfc0c', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === '0.15') {
            return { color: '#262626', fillColor: '#ff0000', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === '0.30') {
            return { color: '#262626', fillColor: '#ff7fd0', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === '0.45') {
            return { color: '#262626', fillColor: '#5d00ff', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === '0.60') {
            return { color: '#262626', fillColor: '#0011ff', fillOpacity: 0.5, weight: 2 };
        }
        if (feature.properties && feature.properties.LABEL === 'Sig') {
            return { color: '#262626', fillColor: '#262626', fillOpacity: 0.5, weight: 2 };
        }

        return { color: '#333', fillColor: '#fff', fillOpacity: 0.2, weight: 1 };
    }
    function formatDateTime(value) {
        if (!value || value.length !== 12) return value || '';
        return `${value.substring(0, 8)}-${value.substring(8, 12)}`;
    }

    function onEachFeature(feature, layer) {
        if (feature.properties) {
            const { VALID, EXPIRE, ISSUE, LABEL2 } = feature.properties;
            const popupContent = `
                <strong>ISSUED:</strong> ${formatDateTime(ISSUE)}<br>
                <strong>VALID:</strong> ${formatDateTime(VALID)}<br>
                <strong>EXPIRE:</strong> ${formatDateTime(EXPIRE)}<br>
                <strong>Percent:</strong> ${LABEL2 || ''}
            `;
            layer.bindPopup(popupContent);
        }
    }

    day1TornadoLayer = L.geoJSON(geojson, { style, onEachFeature }).addTo(map);
}

export function removeDay1OutlookTornadoLayer(map) {
    if (day1TornadoLayer) {
        map.removeLayer(day1TornadoLayer);
        day1TornadoLayer = null;
    }
}