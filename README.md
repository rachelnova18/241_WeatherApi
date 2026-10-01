# 241_WeatherApi

Tugas Pemrograman Web Services (PWS) - NIM: **241**  
Nama Repository: `241_WeatherApi`

## 📌 Deskripsi Project
Aplikasi web sederhana menggunakan HTML, CSS, dan JavaScript untuk mengambil dan menampilkan data lokasi & koordinat dari **MapTiler Geocoding API** (`https://api.maptiler.com/`).

Interface ini menerima input nama lokasi dan menampilkan data geografis berikut:
- **Lokasi (Input)**
- **Negara**
- **Provinsi**
- **Kecamatan / Distrik**
- **Longitude**
- **Latitude**

---

## 📷 Screenshot Hasil Data GET (Browser & Postman)

### 1. Tampilan Hasil GET Data di Browser
![Hasil GET Browser](screenshots/browser_result.png)

### 2. Tampilan Request & Response di Postman
![Hasil Postman API](screenshots/postman_result.png)

---

## 🚀 Fitur Utama
1. **Pencarian Lokasi Interaktif**: Mengambil koordinat dan hierarki wilayah dari MapTiler API secara real-time.
2. **Penanganan Context Wilayah**: Otomatis mengekstrak nama negara, provinsi, dan kecamatan dari struktur GeoJSON.
3. **Format Output Sederhana & Raw JSON**: Menampilkan data dalam tabel rapi dan memberikan preview JSON response persis seperti pada Postman.

---

## 🌐 Endpoint API
- **API Provider**: MapTiler Geocoding Service
- **Endpoint URL**:
  ```http
  GET https://api.maptiler.com/geocoding/{query}.json?key=YOUR_API_KEY
  ```
- **Contoh Request (Postman)**:
  ```http
  GET https://api.maptiler.com/geocoding/Jakarta.json?key=d501GZ1G89jS1OaQc69A
  ```

### Sample Response Output (JSON)
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [106.8456, -6.2088]
      },
      "properties": {
        "name": "Jakarta",
        "context": [
          { "id": "country.1", "text": "Indonesia" },
          { "id": "region.2", "text": "DKI Jakarta" },
          { "id": "district.3", "text": "Gambir" }
        ]
      }
    }
  ]
}
```

---

## 💻 Cara Menjalankan Project
1. Clone atau download repository ini:
   ```bash
   git clone https://github.com/USERNAME/241_WeatherApi.git
   ```
2. Buka berkas `index.html` di browser (Chrome, Edge, Firefox).
3. Masukkan nama lokasi (contoh: *Jakarta*, *Bandung*, *Surabaya*) lalu klik tombol **Cari Data API**.

---

## 📜 Riwayat Git Commit
Repository ini memiliki minimal 5 commit sesuai ketentuan:
1. `feat: initialize project structure and basic HTML interface`
2. `style: add clean and readable layout styling`
3. `feat: implement MapTiler API fetch and context parsing`
4. `feat: add raw JSON response display for Postman verification`
5. `docs: update README.md with screenshots and API documentation`
