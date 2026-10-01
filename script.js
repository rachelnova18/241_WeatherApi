// MapTiler API Key
const API_KEY = 'd501GZ1G89jS1OaQc69A'; // Key MapTiler

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

// Function to Fetch API Data from MapTiler / OpenStreetMap
async function fetchLocationData(query) {
    // Show Loading
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');

    const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${API_KEY}`;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=geojson&addressdetails=1&limit=1`;

    try {
        let response = await fetch(maptilerUrl);
        let data = null;

        // Jika MapTiler API key 403 / Forbidden / invalid, gunakan OpenStreetMap fallback
        if (!response.ok) {
            response = await fetch(nominatimUrl);
        }

        data = await response.json();

        if (!data || !data.features || data.features.length === 0) {
            showError(`Lokasi "${query}" tidak ditemukan.`);
            return;
        }

        const feature = data.features[0];
        const coordinates = feature.geometry.coordinates; // [longitude, latitude]
        const lng = coordinates[0];
        const lat = coordinates[1];


        // Extract Negara, Provinsi, Kecamatan
        const details = parseGeoContext(feature);

        // Display Data
        valInput.textContent = query;
        valNegara.textContent = details.country || 'Indonesia';
        valProvinsi.textContent = details.province || 'DKI Jakarta';
        valKecamatan.textContent = details.district || 'Pusat / Gambir';
        valLongitude.textContent = lng.toFixed(6);
        valLatitude.textContent = lat.toFixed(6);

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
