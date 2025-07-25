let currentTornadoWarnLayer = null;

function getCurrentUtcIsoMinute() {
    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const min = String(now.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

export async function addCurrentTornadoWarnLayer(map) {

    // Use current UTC time in the URL
    const currentTime = getCurrentUtcIsoMinute();
    const url = `https://mesonet.agron.iastate.edu/cgi-bin/request/gis/watchwarn.py?accept=shapefile&at=${currentTime}Z&timeopt=2&limitps=yes&phenomena=TO&significance=W`;

    // Attempt to get the url
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer(); // ⚠️ Important: use arrayBuffer
    const geojson = await shp(arrayBuffer); // shpjs handles it properly

    // Filter features with GTYPE === 'P'
    const filteredGeojson = {
        ...geojson,
        features: geojson.features.filter(f => f.properties && f.properties.GTYPE === 'P')
    };

    function formatDateTime(value) {
        if (!value || value.length !== 12) return value || '';
        return `${value.substring(0, 8)}-${value.substring(8, 12)}`;
    }

    // Add filtered GeoJSON layer to Leaflet with popups
    currentTornadoWarnLayer = L.geoJSON(filteredGeojson, {
        style: function () {
            return {
                color: '#262626',        // outline color
                fillColor: '#ff0000',    // fill color
                fillOpacity: 0.4,    // adjust as needed
                weight: 2            // outline thickness
            };
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                const { WFO, ISSUED, EXPIRED, TORNTAG } = feature.properties;
                const popupContent = `
                    <strong>WFO:</strong> ${WFO ?? ''}<br>
                    <strong>Issued:</strong> ${formatDateTime(ISSUED)}<br>
                    <strong>Expires:</strong> ${formatDateTime(EXPIRED)}<br>
                    <strong>Tornado Tag:</strong> ${TORNTAG ?? ''}
                `;
                layer.bindPopup(popupContent);
            }
        }
    }).addTo(map);
}


export function removeCurrentTornadoWarnLayer(map) {
    if (currentTornadoWarnLayer) {
        map.removeLayer(currentTornadoWarnLayer);
        currentTornadoWarnLayer = null;
    }
}