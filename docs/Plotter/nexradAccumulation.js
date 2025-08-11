import { NEXRAD } from '../Reference/NEXRAD.js';

let nexradAccumulationLayer = null;

export function addNexradAccumulationLayer(map) {
    if (nexradAccumulationLayer) {
        map.removeLayer(nexradAccumulationLayer);
        nexradAccumulationLayer = null;
    }
    nexradAccumulationLayer = L.layerGroup();

    // Store WMS layers by station name for toggling
    const wmsLayers = {};
    const selectedStations = {};

    NEXRAD.forEach(station => {
        // Circle marker
        const marker = L.circleMarker([station.Latitude, station.Longitude], {
            radius: 6,
            fillColor: '#FF0000',
            color: '#0000FF',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9
        })

        marker.on('click', function () {
            const isSelected = selectedStations[station.Name];
            if (isSelected) {
                marker.setStyle({ fillColor: '#FF0000' });
                selectedStations[station.Name] = false;
            } else {
                marker.setStyle({ fillColor: '#00FF00' });
                selectedStations[station.Name] = true;
            }
        });

        // Toggle WMS layer on marker click
        marker.on('click', function () {
            const stationNameLower = station.Name.toLowerCase();
            if (!wmsLayers[stationNameLower]) {
                // Create and add WMS layer
                const wmsLayer = L.tileLayer.wms(`https://opengeo.ncep.noaa.gov/geoserver/${stationNameLower}/ows`, {
                    layers: `${stationNameLower}_boha`,
                    format: 'image/png',
                    transparent: true,
                    version: '1.3.0',
                    attribution: 'NOAA/NCEP WMS',
                    crs: L.CRS.EPSG4326
                });
                wmsLayer.addTo(map);
                wmsLayers[stationNameLower] = wmsLayer;
            } else {
                // Remove and delete WMS layer
                map.removeLayer(wmsLayers[stationNameLower]);
                delete wmsLayers[stationNameLower];
            }
        });

        nexradAccumulationLayer.addLayer(marker);

        // Label marker (slightly offset to appear above the circle)
        const label = L.marker([station.Latitude, station.Longitude], {
            icon: L.divIcon({
                className: 'nexrad-label',
                html: `<span>${station.Name}</span>`,
                iconSize: [60, 18],
                iconAnchor: [30, 30] // center bottom
            }),
            interactive: false
        });
        nexradAccumulationLayer.addLayer(label);
    });

    nexradAccumulationLayer.addTo(map);
}

export function removeNexradAccumulationLayer(map) {
    if (nexradAccumulationLayer) {
        map.removeLayer(nexradAccumulationLayer);
        nexradAccumulationLayer = null;
    }
}