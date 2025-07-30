import { showGrid, hideGrid } from './Overlay/latlon.js';
import { setupBasemapSelector } from './Overlay/basemap.js';

import { addStatesLayer, removeStatesLayer, updateStatesLayerColor } from './Overlay/states.js';
import { addCountiesLayer, removeCountiesLayer, updateCountiesLayerColor, updateCountiesNamesVisibility } from './Overlay/counties.js';

import { addDay1OutlookCategoricalLayer, removeDay1OutlookCategoricalLayer } from './Overlay/day1OutlookCategorical.js';
import { addDay1OutlookTornadoLayer, removeDay1OutlookTornadoLayer } from './Overlay/day1OutlookTornado.js';
import { addDay1OutlookHailLayer, removeDay1OutlookHailLayer } from './Overlay/day1OutlookHail.js';
import { addDay1OutlookWindLayer, removeDay1OutlookWindLayer } from './Overlay/day1OutlookWind.js';
import { addDay1OutlookDryTstormLayer, removeDay1OutlookDryTstormLayer } from './Overlay/day1OutlookDryTstorm.js';
import { addCurrentTornadoWarnLayer, removeCurrentTornadoWarnLayer } from './Overlay/currentTornadoWarn.js';
import { addCurrentSevereWarnLayer, removeCurrentSevereWarnLayer } from './Overlay/currentSevereWarn.js';
import { addCurrentFlashFloodWarnLayer, removeCurrentFlashFloodWarnLayer } from './Overlay/currentFlashFloodWarn.js';

import { addConusBrefLayer, removeConusBrefLayer } from './Plotter/conusBref.js';
import { addAlaskaBrefLayer, removeAlaskaBrefLayer } from './Plotter/alaskaBref.js';

import { addConusCrefLayer, removeConusCrefLayer } from './Plotter/conusCref.js';

import { addNexradLayer, removeNexradLayer } from './Overlay/nexrad.js';
import { addTdwrLayer, removeTdwrLayer } from './Overlay/tdwr.js';

var map = L.map('map').setView([40, -100], 6);
setupBasemapSelector(map);
window.map = map;


function pad(n) {
    return n < 10 ? '0' + n : n;
}

function updateClocks() {
    const now = new Date();

    // Local time (24-hour)
    const localHours = pad(now.getHours());
    const localMinutes = pad(now.getMinutes());
    const localSeconds = pad(now.getSeconds());
    const localTime = `${localHours}:${localMinutes}:${localSeconds}`;
    const localClockElem = document.getElementById('local-clock');
    if (localClockElem) {
        localClockElem.textContent = `Local: ${localTime}`;
    }

    // UTC time (24-hour)
    const utcHours = pad(now.getUTCHours());
    const utcMinutes = pad(now.getUTCMinutes());
    const utcSeconds = pad(now.getUTCSeconds());
    const utcTime = `${utcHours}:${utcMinutes}:${utcSeconds}`;
    const utcClockElem = document.getElementById('utc-clock');
    if (utcClockElem) {
        utcClockElem.textContent = `UTC: ${utcTime}`;
    }
}

// Start the clocks when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateClocks();
    setInterval(updateClocks, 1000);
});

// --- END CLOCKS ---

const tileLayerUrls = {
    default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
};

let currentTileLayer = L.tileLayer(tileLayerUrls.default, {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let gridVisible = false;
let gridColor = '#888888';

const basemapSelector = document.getElementById('basemap-selector');
const latlonGridColorInput = document.getElementById('gridColorInput');
const latlonGridToggleCheckbox = document.getElementById('toggleGridCheckbox');

// Checkbox toggles lat/lon grid visibility
latlonGridToggleCheckbox.addEventListener('change', function () {
    gridVisible = this.checked;
    if (gridVisible) {
        showGrid(map, gridColor);
    } else {
        hideGrid(map);
    }
});

// Update grid color and show grid if visible when color input changes
latlonGridColorInput.addEventListener('input', () => {
    gridColor = latlonGridColorInput.value;
    if (gridVisible) {
        showGrid(map, gridColor);
    }
});

// Show lat/lon grid when map moves, if visible
map.on('moveend', function () {
    if (gridVisible) {
        showGrid(map, gridColor);
    }
});

// States
const statesCheckbox = document.getElementById('states-checkbox');
const statesColorInput = document.getElementById('statesColorInput');

statesCheckbox.addEventListener('change', function () {
    if (statesCheckbox.checked) {
        addStatesLayer(map, statesColorInput.value);
    } else {
        removeStatesLayer(map);
    }
});

statesColorInput.addEventListener('input', function () {
    if (statesCheckbox.checked) {
        updateStatesLayerColor(map, statesColorInput.value);
    }
});

// Counties
const countiesCheckbox = document.getElementById('counties-checkbox');
const countiesColorInput = document.getElementById('countiesColorInput');
const countiesNamesCheckbox = document.getElementById('counties-names-checkbox');

countiesCheckbox.addEventListener('change', function () {
    if (countiesCheckbox.checked) {
        addCountiesLayer(map, countiesColorInput.value, countiesNamesCheckbox.checked);
    } else {
        removeCountiesLayer(map);
    }
});

countiesColorInput.addEventListener('input', function () {
    if (countiesCheckbox.checked) {
        updateCountiesLayerColor(map, countiesColorInput.value);
    }
});

countiesNamesCheckbox.addEventListener('change', function () {
    if (countiesCheckbox.checked) {
        updateCountiesNamesVisibility(map, countiesNamesCheckbox.checked);
    }
});

// Day 1 Categorical Outlook
const day1CategoricalCheckbox = document.getElementById('day1-outlook-categorical-checkbox');
day1CategoricalCheckbox.addEventListener('change', function () {
    if (day1CategoricalCheckbox.checked) {
        addDay1OutlookCategoricalLayer(map);
    } else {
        removeDay1OutlookCategoricalLayer(map);
    }
});

// Day 1 Tornado Outlook
const day1TornadoCheckbox = document.getElementById('day1-outlook-tornado-checkbox');
day1TornadoCheckbox.addEventListener('change', function () {
    if (day1TornadoCheckbox.checked) {
        addDay1OutlookTornadoLayer(map);
    } else {
        removeDay1OutlookTornadoLayer(map);
    }
});

// Day 1 Hail Outlook
const day1HailCheckbox = document.getElementById('day1-outlook-hail-checkbox');
day1HailCheckbox.addEventListener('change', function () {
    if (day1HailCheckbox.checked) {
        addDay1OutlookHailLayer(map);
    } else {
        removeDay1OutlookHailLayer(map);
    }
});

// Day 1 Wind Outlook
const day1WindCheckbox = document.getElementById('day1-outlook-wind-checkbox');
day1WindCheckbox.addEventListener('change', function () {
    if (day1WindCheckbox.checked) {
        addDay1OutlookWindLayer(map);
    } else {
        removeDay1OutlookWindLayer(map);
    }
});

// Day 1 Dry Tstorm Outlook
const day1DryTstormCheckbox = document.getElementById('day1-outlook-drytstorm-checkbox');
day1DryTstormCheckbox.addEventListener('change', function () {
    if (day1DryTstormCheckbox.checked) {
        addDay1OutlookDryTstormLayer(map);
    } else {
        removeDay1OutlookDryTstormLayer(map);
    }
});

// Current Tornado Warnings
const currentTornadoWarnCheckbox = document.getElementById('current-tornado-warn-checkbox');
currentTornadoWarnCheckbox.addEventListener('change', function () {
    if (currentTornadoWarnCheckbox.checked) {
        addCurrentTornadoWarnLayer(map);
    } else {
        removeCurrentTornadoWarnLayer(map);
    }
});

// Current Severe Warnings
const currentSevereWarnCheckbox = document.getElementById('current-severe-warn-checkbox');
currentSevereWarnCheckbox.addEventListener('change', function () {
    if (currentSevereWarnCheckbox.checked) {
        addCurrentSevereWarnLayer(map);
    } else {
        removeCurrentSevereWarnLayer(map);
    }
});

// Current Flash Flood Warnings
const currentFlashFloodWarnCheckbox = document.getElementById('current-flashflood-warn-checkbox');
currentFlashFloodWarnCheckbox.addEventListener('change', function () {
    if (currentFlashFloodWarnCheckbox.checked) {
        addCurrentFlashFloodWarnLayer(map);
    } else {
        removeCurrentFlashFloodWarnLayer(map);
    }
});

// NEXRAD
const nexradCheckbox = document.getElementById('nexrad-checkbox');
nexradCheckbox.addEventListener('change', function () {
    if (nexradCheckbox.checked) {
        addNexradLayer(map);
    } else {
        removeNexradLayer(map);
    }
});

// TDWR
const tdwrCheckbox = document.getElementById('tdwr-checkbox');
tdwrCheckbox.addEventListener('change', function () {
    if (tdwrCheckbox.checked) {
        addTdwrLayer(map);
    } else {
        removeTdwrLayer(map);
    }
});

////////////////////////
// MOSAICKED LAYERS BREF
////////////////////////

// CONUS
const conusBrefCheckbox = document.getElementById('conus-bref-checkbox');
conusBrefCheckbox.addEventListener('change', function () {
    if (conusBrefCheckbox.checked) {
        addConusBrefLayer(map);
    } else {
        removeConusBrefLayer(map);
    }
});

// ALASKA
const alaskaBrefCheckbox = document.getElementById('alaska-bref-checkbox');
alaskaBrefCheckbox.addEventListener('change', function () {
    if (alaskaBrefCheckbox.checked) {
        addAlaskaBrefLayer(map);
    } else {
        removeAlaskaBrefLayer(map);
    }
});


// MOSAICKED LAYERS CREF
const conusCrefCheckbox = document.getElementById('conus-cref-checkbox');
conusCrefCheckbox.addEventListener('change', function () {
    if (conusCrefCheckbox.checked) {
        addConusCrefLayer(map);
    } else {
        removeConusCrefLayer(map);
    }
});
