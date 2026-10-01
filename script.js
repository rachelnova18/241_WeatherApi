// MapTiler API Key
const API_KEY = '3fMhg8HBafjMTdP5OrpG'; // Key MapTiler Resmi


// DOM Elements
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

const valInput = document.getElementById('valInput');
const valNegara = document.getElementById('valNegara');
const valProvinsi = document.getElementById('valProvinsi');
const valKecamatan = document.getElementById('valKecamatan');
const valLongitude = document.getElementById('valLongitude');
const valLatitude = document.getElementById('valLatitude');


// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // Search on load
    fetchLocationData('Jakarta');

    searchBtn.addEventListener('click', () => {
        const query = locationInput.value.trim();
        if (query) {
            fetchLocationData(query);
        }
    });

    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = locationInput.value.trim();
            if (query) {
                fetchLocationData(query);
            }
        }
    });
});

// Function to Fetch API Data from Geocoding API
async function fetchLocationData(query) {
    // Show Loading
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');

    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`;
    const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${API_KEY}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data && data.results && data.results.length > 0) {
            const item = data.results[0];
            valInput.textContent = query;
            valNegara.textContent = item.country || 'Indonesia';
            valProvinsi.textContent = item.admin1 || 'DKI Jakarta';
            valKecamatan.textContent = item.admin2 || item.admin3 || item.name || 'Pusat / Distrik';
            valLongitude.textContent = item.longitude.toFixed(6);
            valLatitude.textContent = item.latitude.toFixed(6);
        } else {
            // Fallback ke MapTiler
            let res2 = await fetch(maptilerUrl);
            let data2 = await res2.json();

            if (data2 && data2.features && data2.features.length > 0) {
                const feature = data2.features[0];
                const coords = feature.geometry.coordinates;
                const details = parseGeoContext(feature);
                valInput.textContent = query;
                valNegara.textContent = details.country || 'Indonesia';
                valProvinsi.textContent = details.province || 'DKI Jakarta';
                valKecamatan.textContent = details.district || 'Pusat';
                valLongitude.textContent = coords[0].toFixed(6);
                valLatitude.textContent = coords[1].toFixed(6);
            } else {
                showError(`Lokasi "${query}" tidak ditemukan.`);
                return;
            }
        }

        loadingDiv.classList.add('hidden');

    } catch (err) {
        showError('Gagal mengambil data dari API: ' + err.message);
    }
}


// Helper Extract Geo Context
function parseGeoContext(feature) {
    let country = '';
    let province = '';
    let district = '';

    if (feature.properties && feature.properties.context) {
        feature.properties.context.forEach(item => {
            const id = item.id || '';
            const text = item.text || item.name || '';

            if (id.includes('country')) country = text;
            if (id.includes('region') || id.includes('province')) province = text;
            if (id.includes('district') || id.includes('locality')) district = text;
        });
    }

    if (feature.properties && feature.properties.address) {
        const addr = feature.properties.address;
        country = country || addr.country || '';
        province = province || addr.state || addr.region || '';
        district = district || addr.suburb || addr.city_district || addr.city || '';
    }

    return { country, province, district };
}

function showError(msg) {
    loadingDiv.classList.add('hidden');
    errorDiv.classList.remove('hidden');
    errorDiv.textContent = msg;
}
