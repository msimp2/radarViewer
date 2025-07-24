let day1DryTstormLayer = null;

export async function addDay1OutlookDryTstormLayer(map) {
    const url = 'https://www.spc.noaa.gov/products/fire_wx/day1fw_dryt.lyr.geojson';
    const response = await fetch(url);
    const geojson = await response.json();

    // Style function for GeoJSON features
    function style(feature) {

        if (feature.properties && feature.properties.LABEL === 'IDRT') {
            return { color: '#262626', fillColor: '#9d4e15', fillOpacity: 0.5, weight: 2 };
        }

        if (feature.properties && feature.properties.LABEL === 'SDRT') {
            return { color: '#262626', fillColor: '#ff7f7f', fillOpacity: 0.5, weight: 2 };
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

    day1DryTstormLayer = L.geoJSON(geojson, { style, onEachFeature }).addTo(map);
}

export function removeDay1OutlookDryTstormLayer(map) {
    if (day1DryTstormLayer) {
        map.removeLayer(day1DryTstormLayer);
        day1DryTstormLayer = null;
    }
}