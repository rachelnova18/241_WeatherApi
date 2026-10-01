# 241_WeatherApi

Tugas Pemrograman Web Services (PWS) - NIM: **241**  
Nama Repository: `241_WeatherApi`

## 📌 Deskripsi Project
Aplikasi web sederhana menggunakan HTML, CSS, dan JavaScript untuk mengambil data geocoding lokasi dari **MapTiler API** (`https://api.maptiler.com/`).

Interface menerima input nama lokasi dan menampilkan data berikut:
- **Lokasi (Input)**
- **Negara**
- **Provinsi**
- **Kecamatan**
- **Longitude**
- **Latitude**

---

## 🌐 Endpoint API (MapTiler)
- **Method**: `GET`
- **URL Endpoint**:
  ```http
  https://api.maptiler.com/geocoding/{query}.json?key=YOUR_API_KEY
  ```

---

## 💻 Cara Menjalankan Project
1. Open `index.html` di browser.
2. Masukkan nama lokasi di kolom input (contoh: `Jakarta`).
3. Klik tombol **Cari Data API**.
