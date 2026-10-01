# 241_WeatherApi

Tugas Pemrograman Web Services (PWS) - NIM: **241**  
Nama Repository: `241_WeatherApi`

## 📌 Deskripsi Project
Aplikasi web sederhana menggunakan HTML, CSS, dan JavaScript untuk mengambil data geocoding & koordinat lokasi dari **Geocoding API**.

Interface menerima input nama lokasi dan menampilkan data berikut:
- **Lokasi (Input)**
- **Negara**
- **Provinsi**
- **Kecamatan**
- **Longitude**
- **Latitude**

---

## 🌐 Endpoint API (Postman GET)
- **Method**: `GET`
- **URL Endpoint (Format Ringkas)**:
  ```http
  https://geocoding-api.open-meteo.com/v1/search?name=Jakarta&count=1
  ```

### Sample Response Output di Postman (JSON Ringkas):
```json
{
  "results": [
    {
      "name": "Jakarta",
      "latitude": -6.21462,
      "longitude": 106.84513,
      "country": "Indonesia",
      "admin1": "DKI Jakarta"
    }
  ]
}
```

---

## 💻 Cara Menjalankan Project
1. Buka `index.html` di browser.
2. Masukkan nama lokasi di kolom input (contoh: `Jakarta`, `Bandung`, `Surabaya`).
3. Klik tombol **Cari Data API**.

---

## 📝 Catatan Tambahan
- Data disajikan secara *real-time* dari Geocoding Service API.
- Project dikembangkan untuk Pemrograman Web Services (PWS) NIM: **241**.
