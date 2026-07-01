# Changelog

## 2.3.9 — 2026-07-02
### Added
- `ryo upgrade` sekarang menampilkan changelog perubahan di versi baru
### Changed
- Deteksi offline sebelum cek update (tidak perlu menunggu saat tidak ada internet)
- Parse angka di config sekarang menerima desimal dan negatif

## 2.3.8 — 2026-07-02
### Fixed
- Inkonsistensi perintah config di mode interaktif
- Startup lambat: pengecekan update sekarang non-blokir (async)
- `versionGt` sekarang menangani versi pre-release dengan benar
- Shell completion otomatis terdaftar untuk zsh (via bashcompinit) dan fish
- Skrip postinstall mendeteksi shell saat ini sebelum menulis file rc

## 2.3.7 — 2026-07-02
### Added
- Notifikasi update otomatis di setiap perintah CLI (cache 24 jam)
- Perintah `ryo config`: lihat/ubah/hapus konfigurasi pengguna
- `ryo doctor` ditingkatkan: cek Node.js, npm, internet, file proyek
- Utilitas loading spinner (`createSpinner`, `withSpinner`)
### Changed
- Mode interaktif sekarang scroll alami (tanpa alternate buffer)
- Notifikasi update juga muncul di mode interaktif
### Fixed
- Shell completion otomatis terdaftar saat instalasi global

## 2.3.6 — 2026-07-02
### Fixed
- Skrip postinstall tidak error saat direktori konfigurasi OpenCode tidak ada
- Logika instalasi agent OpenCode ditingkatkan
### Changed
- Proyek diganti nama menjadi `ryo-framework` (npm) / "Ryo Framework" (tampilan)

## 2.3.5 — 2026-07-01
### Added
- Instalasi otomatis agent OpenCode via skrip `postinstall`
- Perintah `ryo opencode-setup` untuk instalasi agent manual
- File agent baru (architect, backend, refactor, release, reviewer, tester)
### Fixed
- Mode agent diubah dari `subagent` ke `all` agar muncul di menu utama
