# DOKUMEN REFERENSI UTAMA

 
iii 
 
PERSETUJUAN DAN PENGESAHAN 
LAPORAN KERJA PRAKTEK 
 
NIM   : 230040123 
Nama   : Made Dwi Mahesa Paramaarta 
Jenjang Studi  : Strata Satu (S1) 
Program Studi  : Teknologi Informasi 
Judul Kerja Praktek : Rancang Bangun Arsitektur Multi-Agent Asynchronous 
untuk Otomasi Task Berbasis LLM di PT Timedoor 
Indonesia 
 
 
Disetujui Oleh: 
 
 
 
 
 
 
 
 
  
Tanggal ……………………………… 
 
Pembina 
 
 
 
(I Nyoman Darma Kotama, S.T., M.T.) 
Tanggal ……………………………… 
 
Pembimbing 
 
 
 
(Ni Wayan Setiasih, S.Sn., M.Sn.) 
 
Tanggal ……………………………… 
Ketua Program Studi 
 
 
 
(I Wayan Ardiyasa, S.Kom., M.MSI.) 
 
 
iv 
 
Halaman ini sengaja dikosongkan  
 
v 
 
KATA PENGANTAR 
Berkat rahmat Tuhan Yang Maha Esa penulis dapat menyelesaikan 
Laporan Kerja Praktek yang berjudul “ Rancang Bangun Arsitektur Multi -Agent 
Asynchronous untuk Otomasi Task Berbasis L LM di  PT Timedoor Indonesia ” 
sesuai dengan yang direncanakan. Selanjutnya penulis menyampaikan terima  
kasih kepada: 
1. Bapak Rektor ITB STIKOM Bali Dr. Dadang Hermawan, S.E., M.M., Ak. 
2. Bapak Dr. Roy Rudolf Huizen, S.T., M.T. selaku Wakil Rektor I. 
3. Ibu Dr. Ni Luh Putri Srinadi, S.E., M.M.Kom.  selaku Wakil Rektor II ITB 
STIKOM Bali yang telah memberikan dukungan sehingga penulisan 
Laporan Kerja Praktek ini terselesaikan. 
4. Ibu Ni Ketut Dewi Ari Jayanti, S.T., M.Kom.  selaku Dekan Fakultas 
Informatika dan Komputer ITB STIKOM Bali yang telah memberikan 
dukungan sehingga penulisan Laporan Kerja Praktek ini terselesaikan. 
5. Bapak I Wayan Ardiyasa, S.Kom., M.MSI  selaku Ketua Program Studi 
Teknologi Informasi ITB STIKOM Bali. 
6. Bapak I Nyoman Darma Kotama S.T., M.T.  selaku Pembina yang telah 
membimbing penulis selama melaksanakan Kerja Praktek. 
7. Ibu Ni Wayan Setiasih, S.Sn., M.Sn. selaku Dosen Pembimbing yang turut 
membimbing dalam penyelesaian penulisan ini. 
8. Semua teman penulis dan berbagai pihak yang memberikan dukungan dan 
bantuan kepada penulis. 
 Semoga penulisan Laporan Kerja Praktek ini bermanfaat bagi pihak yang 
berkepentingan. Akhir kata penulis sampaikan terima kasih kepada semua pihak 
yang terkait dalam laporan ini. 
 
 
Denpasar, 27 Juni 2026 
 
 
 
 
          Penulis 
  
 
vi 
 
Halaman ini sengaja dikosongkan 
  
 
vii 
 
DAFTAR ISI 
 
HALAMAN PENGESAHAN ................................ ................................ .................. iii 
KATA PENGANTAR ................................ ................................ ............................ v 
DAFTAR ISI ................................ ................................ ................................ ........ vii 
DAFTAR TABEL ................................ ................................ ................................ . ix 
DAFTAR GAMBAR ................................ ................................ ............................. xi 
DAFTAR LAMPIRAN ................................ ................................ ......................... xiii 
BAB I PENDAHULUAN................................ ................................ ........................ 1 
1.1 Latar Belakang ................................ ................................ ..................... 1 
1.2 Rumusan Masalah ................................ ................................ ................ 3 
1.3 Tujuan Kerja Praktek ................................ ................................ ............ 3 
1.4 Manfaat Kerja Praktek ................................ ................................ .......... 3 
1.5 Ruang Lingkup Kerja Praktek ................................ ...............................  4 
1.6 Metode Kerja Praktek ................................ ................................ ........... 4 
1.6.1 Lokasi Kerja Praktek ................................ ................................ ... 4 
1.6.2 Waktu Pelaksanaan Kerja Praktek ................................ .............. 5 
1.6.3 Teknik Pengumpulan Data ................................ .......................... 5 
BAB II TINJAUAN UMUM PERUSAHAAN ................................ ........................... 7 
2.1 Sejarah Perusahaan ................................ ................................ ............. 7 
2.2 Visi, Misi, dan Nilai Inti Perusahaan ................................ ...................... 8 
2.2.1 Visi Perusahaan ................................ ................................ .......... 8 
2.2.2 Misi Perusahaan ................................ ................................ ......... 8 
2.2.3 Nilai Perusahaan ................................ ................................ ......... 8 
2.3 Struktur Organisasi ................................ ................................ ............... 9 
BAB III LANDASAN TEORI ................................ ................................ ............... 11 
3.1 Large Language Model (LLM) ................................ ............................. 11 
3.1.1 Definisi dan Karakteristik Agen Berbasis LLM ........................... 11 
3.1.2 Paradigma ReAct: Reasoning and Acting ................................ . 11 
3.2 Multi-Agent System (MAS) ................................ ................................ .. 12 
3.2.1 Definisi Formal dan Karakteristik ................................ ............... 12 
3.2.2 Pola Koordinasi dan Sinkronisasi Temporal ..............................  12 
3.2.3 Tantangan dalam MAS Berbasis LLM ................................ ....... 12 
3.3 Orkestrasi Asinkron pada MAS Berbasis LLM ................................ .... 13 
3.3.1 Kebutuhan Eksekusi Asinkron dan Paralel ................................  13 
3.3.2 Centralized Asynchronous Isolated Delegation (CAID) ............. 13 
3.4 Task Broker dan Manajemen Status ................................ ................... 14 
 
viii 
 
3.4.1 Peran Task Broker dalam Arsitektur Terdistribusi...................... 14 
3.4.2 SQLite sebagai Embedded Task Broker ................................ ... 14 
3.5 Metode Kanban sebagai Model Status Tugas ................................ ..... 15 
3.5.1 Prinsip Dasar Kanban ................................ ...............................  15 
3.5.2 Adaptasi Kanban sebagai Mesin Status pada Sistem Agen ...... 15 
3.6 Hermes Agent Framework ................................ ................................ .. 16 
3.6.1 Arsitektur dan Kapabilitas Utama ................................ .............. 16 
3.6.2 Abstraksi Profil dan Isolasi Agen ................................ ............... 16 
3.6.3 Native Kanban Tools sebagai Protokol Komunikasi Agen ......... 16 
BAB IV HASIL DAN PEMBAHASAN ................................ ................................ .. 19 
4.1 Hasil Perancangan Arsitektur Sistem ................................ .................. 19 
4.1.1 Arsitektur Keseluruhan ................................ ................................ ..... 19 
4.1.2 Skema Task Broker ................................ ................................ ... 20 
4.1.3 Profil Agent yang Diimplementasikan ................................ ........ 23 
4.2 Implementasi Komponen Utama ................................ ......................... 24 
4.2.1 Orchestrator Agent ................................ ................................ .... 24 
4.2.2 Worker Agent ................................ ................................ ............ 26 
4.2.3 Agent Specialist Builder ................................ ............................ 27 
4.2.4 Skill Management via Symlink ................................ ................... 29 
4.3 Pengujian Sistem ................................ ................................ ................ 31 
4.3.1 Skenario Pengujian ................................ ................................ ... 31 
4.3.2 Pengujian Non-Blocking Delegation ................................ .......... 33 
4.3.3 Pengujian Notifikasi Push-Based ................................ .............. 34 
4.3.4 Pengujian Symlink Skill Management................................ ........ 35 
4.3.5 Pengujian Deteksi Pelanggaran Protokol ................................ .. 36 
4.3.6 Pengujian Pembuatan Agen Baru via agent-specialist-builder .. 38 
4.4 Pembahasan................................ ................................ ....................... 39 
4.4.1 Analisis Prinsip CAID ................................ ................................  39 
4.4.2 Pemilihan SQLite sebagai Task Broker ................................ ..... 39 
4.4.3 Imperative vs Declarative SOUL.md................................ .......... 40 
4.4.4 Token Budget sebagai Constraint Arsitektur ............................. 40 
4.4.5 Keterbatasan Sistem ................................ ................................ . 41 
4.5 Evaluasi terhadap Rumusan Masalah ................................ ................. 41 
BAB V PENUTUP ................................ ................................ ..............................  43 
5.1 Kesimpulan ................................ ................................ ......................... 43 
5.2 Saran ................................ ................................ ................................ .. 43 
DAFTAR PUSTAKA ................................ ................................ ........................... 45 
 
 
ix 
 
DAFTAR TABEL 
 
Tabel 4.1 Skema Tabel kanban.db ................................ ................................ .... 20 
Tabel 4.2 Daftar Profil Agent yang Diimplementasikan ................................ ...... 23 
Tabel 4.3 Perbandingan Copy File vs Symlink pada Manajemen Skills ............. 29 
Tabel 4.4 Skenario Pengujian Sistem Multi-Agent ................................ ............. 31 
Tabel 4.5 Hasil Pengujian Metrik terhadap Sistem Baru ................................ .... 33 
Tabel 4.6 Evaluasi Pencapaian Rumusan Masalah ................................ ........... 41 
 
  
 
x 
 
Halaman ini sengaja dikosongkan 
  
 
xi 
 
DAFTAR GAMBAR 
 
Gambar 1.1 Lokasi Kerja Praktek PT Timedoor Indonesia ................................ ... 5 
Gambar 2.1 Struktur Organisasi PT Timedoor Indonesia ................................ ..... 9 
Gambar 4.1 Hermes End-to-end Architecture ................................ .................... 19 
Gambar 4.2 Diagram Status Siklus Hidup Tugas pada Sistem Hermes Agent ... 22 
Gambar 4.3 Flow Diagram Keputusan Orchestrator ................................ .......... 25 
Gambar 4.4 Screenshot Percakapan WhatsApp ................................ ................ 26 
Gambar 4.5 Diagram Siklus Hidup Worker ................................ ........................ 27 
Gambar 4.6 Diagram Alur 7-Langkah agent-specialist-builder ........................... 28 
Gambar 4.7 Screenshot Terminal Struktur Direktori Symlink ............................. 31 
Gambar 4.8 Screenshot WhatsApp Notifikasi Otomatis Hasil Task .................... 35 
Gambar 4.9 Screenshot Terminal Verifikasi Symlink dan Skills Size ................. 36 
Gambar 4.10 Screenshot Terminal Verifikasi Symlink dan Skills Size ............... 36 
Gambar 4.11 Screenshot Notifikasi Task Failed kepada User ........................... 37 
Gambar 4.12 SOUL.md dan Notifikasi Hasil Pembuatan Agen Baru ................. 38 
 
  
 
xii 
 
Halaman ini sengaja dikosongkan  
 
xiii 
 
DAFTAR LAMPIRAN 
 
Lampiran 1 Screenshot Percakapan WhatsApp ................................ ................. 47 
Lampiran 2 Screenshot WhatsApp Notifikasi Otomatis Hasil Task ..................... 48 
 
  
 
xiv 
 
Halaman ini sengaja dikosongkan 
 
 
1 
 
BAB I 
PENDAHULUAN 
 
1.1 Latar Belakang 
Perkembangan Large Language Model  (LLM) dalam tiga tahun  terakhir 
telah membawa perubahan besar pada arah perkembangan kecerdasan buatan , 
dari sistem yang sekadar menghasilkan teks menjadi agen otonom yang mampu 
merencanakan, bernalar, dan mengeksekusi tugas secara mandiri. Pergeseran ini 
diwujudkan melalui paradigma ReAct ( Reasoning and Acting ), yang 
memungkinkan model bahasa menggabungkan penalaran dan tindakan dalam 
satu siklus untuk berinteraksi dengan sumber eksternal seperti basis pengetahuan 
maupun API ( Application Programming Interface ), sehingga agen bersifat aktif -
eksekutif, bukan sekadar pasif -responsif. Hal ini membuka peluang b agi industri 
teknologi untuk mengotomasi pekerjaan  kompleks seperti riset, penulisan kode, 
dan orkestrasi alur kerja, tidak hanya pekerjaan berulang berbasis aturan [1]. 
Seiring adopsi yang meluas dan kompleksitas tugas yang terus meningkat, 
pendekatan single-agent menampakkan keterbatasan struktural , kapasitas 
konteks terbatas, akumulasi kesalahan pada pipeline panjang, dan yang paling 
krusial, sifat blocking yang membekukan antarmuka pengguna selama eksekusi 
berjalan. Sebagai respons, sistem LLM-Based Multi-Agent (LMA) memanfaatkan 
beberapa agen spesialis dengan tanggung jawab unik yang bekerja kolaboratif 
untuk mendorong pemikiran divergen, faktualitas penalaran, dan val idasi 
menyeluruh. Nilai utamanya terletak pada pembagian domain tanggung jawab dan 
eksekusi paralel, bukan peningkatan kecerdasan tiap agen [2]. Dalam konteks 
kerja praktek ini, keterbatasan blocking tersebut sangat nyata , agen yang 
mengerjakan pipeline panjang seperti riset teknologi atau pembuatan artikel blog 
membekukan seluruh interaksi pengguna hingga tugas selesai, hambatan 
produktivitas nyata di lingkungan kerja dinamis seperti divisi AI R&D Timedoor 
Indonesia. 
Timedoor Indonesia, perusahaan pengembang perangkat lunak yang 
menangani beragam proyek klien secara simultan, menghadapi kebutuhan untuk 
mengotomasi alur kerja internal lintas domain. Di divisi AI Research and 
Development, pekerjaan sehari-hari berpusat pada pembangunan agen berbasis 
LLM, mulai dari agen pembuatan artikel blog perusahaan (riset hingga publikasi di 
WordPress) hingga agen untuk riset teknologi dan pengembangan prototype. Dari 
2 
 
 
pengalaman ini muncul kebutuhan yang lebih mendasar, bukan sekadar satu agen 
untuk satu pipeline, melainkan template arsitektur yang dapat dipakai dan 
dipersonalisasi berulang untuk berbagai kebutuhan. Tanpa arsitektur referensi 
yang terstandarisasi, setiap kebutuhan baru memaksa pembangunan sistem dari 
nol, sehingga meningkatkan biaya pengembangan dan menghilangkan 
konsistensi kerja antar-agen di dalam organisasi. 
Solusi atas permasalahan ini mengarah pada rancangan Multi-Agent 
System (MAS) berpola orkestrasi asinkron, di mana satu agen orkestrator 
mendistribusikan tugas ke agen-agen spesialis yang berjalan paralel tanpa saling 
memblokir. Relevansi pendekatan ini didukung oleh DynTaskMAS, framework 
yang mengorkestrasikan operasi asinkr on dan paralel dalam MAS berbasis LLM 
menggunakan graf tugas dinamis. Dibandingkan pemrosesan sekuensial 
tradisional, DynTaskMAS mencatat pengurangan waktu eksekusi 21 -33% yang 
makin signifikan seiring naiknya kompleksitas tugas, serta peningkatan utilisasi 
sumber daya 35,4% [3]. Meskipun kondisi eksperimental tersebut berbeda dari 
lingkungan Timedoor yang mengandalkan API LLM eksternal pada mesin tunggal, 
pola peningkatan efisiensi pada tugas kompleks tetap relevan, mengingat pipeline 
artikel blog dan riset teknologi di Timedoor  adalah tugas multi -step dan multi -
domain yang paling diuntungkan oleh dekomposisi paralel. Hermes Agent 
Framework dipilih sebagai fondasi implementasi karena secara langsung 
mendukung kebutuhan tersebut . Hermes menyediakan kemampuan 
mendelegasikan tugas d an menjalankan sub -agen terisolasi secara paralel, 
dengan dukungan multi -platform gateway termasuk WhatsApp, Telegram, 
Discord, dan Slack. Kombinasi isolasi profil per -agen, native Kanban Tools untuk 
manajemen status tugas, dan learning loop  terintegrasi menjadikan Hermes 
fondasi yang tepat untuk membangun sistem orkestrasi yang andal dan dapat 
diperluas [4]. 
Meskipun demikian, terdapat kesenjangan yang belum terjawab dalam 
literatur maupun dokumentasi yang ada. Dalam klasifikasi paradigma orkestrasi 
sistem human-agent berbasis LLM, dimensi sinkronisasi temporal dibedakan 
menjadi sinkron dan asinkron, dengan strategi tugas one-by-one (sekuensial) atau 
simultan (paralel). Namun, implementasi yang menggabungkan orkestrasi 
asinkron terpusat dengan task broker berbasis embedded database  ringan 
(SQLite) pada konteks digital agency berbasis WhatsApp belum banyak 
didokumentasikan secara sistematis. Pada ranah rekayasa perangkat lunak, 
3 
 
 
sistem LMA terbukti menyediakan solusi skalabel untuk mengelola kompleksitas 
proyek dunia nyata, mulai dari pembuatan kode hingga orkestrasi alur pengujian 
[5]. Oleh karena itu, penelitian ini merancang dan mengimplementasikan lapisan 
orkestrasi multi-agen asinkron di atas Hermes Agent Framework, dengan agen 
orkestrator yang mengklasifikasikan intensi pengguna, mendelegasikan tugas ke 
agen spesialis tanpa memblo kir alur percakapan, serta menyampaikan notifikasi 
progre task melalui gateway WhatsApp kontribusi teknis yang menjawab 
kebutuhan nyata di Timedoor Indonesia sekaligus mengisi celah implementasi 
yang belum terdokumentasi. 
 
1.2 Rumusan Masalah 
Berdasarkan latar belakang yang telah diuraikan, maka rumusan masalah 
dalam laporan Kerja Praktek ini adalah sebagai berikut: 
1. Bagaimana merancang lapisan orkestrasi multi-agent asinkron pada 
Hermes Agent Framework yang dapat mengklasifikasikan intensi 
pengguna dan mendelegasikan tugas secara non-blocking? 
2. Bagaimana merancang mekanisme notifikasi proaktif kepada pengguna 
melalui gateway WhatsApp selama tugas dieksekusi di latar belakang? 
 
1.3 Tujuan Kerja Praktek 
Berdasarkan rumusan masalah di atas, tujuan dari pelaksanaan Kerja 
Praktek ini adalah sebagai berikut: 
1. Merancang dan mengimplementasikan lapisan orkestrasi multi -agent 
asinkron pada Hermes Agent Framework yang memungkinka n klasifikasi 
intensi pengguna dan mendelegasikan tugas secara non-blocking. 
2. Mengimplementasikan mekanisme notifikasi proaktif kepada pengguna 
melalui gateway WhatsApp. 
 
1.4 Manfaat Kerja Praktek 
Manfaat yang diharapkan dari pelaksanaan kerja praktek ini meliputi aspek 
berikut. 
1. Bagi Perusahaan: Tersedianya arsitektur referensi untuk otomasi tugas 
berbasis LLM yang dapat mengurangi beban operasional dalam 
penanganan permintaan riset, pengembangan perangkat lunak, dan 
konfigurasi infrastruktur agen secara paralel. 
4 
 
 
2. Bagi Kampus: Kontribusi praktis dalam bidang rekayasa perangkat lunak 
dan kecerdasan buatan yang dapat dijadikan bahan ajar atau referensi 
penelitian lanjutan mengenai multi-agent systems dan asynchronous 
orchestration. 
3. Bagi Mahasiswa: Penguasaan kompetensi teknis dalam merancang 
sistem terdistribusi, mengelola state pada embedded database , 
mengimplementasikan protokol komunikasi asinkron, dan menulis 
dokumentasi teknis sesuai standar industri open-source. 
 
1.5 Ruang Lingkup Kerja Praktek 
Ruang lingkup pembahasan dalam laporan ini dibatasi pada aspek -aspek 
berikut. 
1. Implementasi berjalan pada lingkungan WSL (Ubuntu) di laptop Windows 
dengan Hermes Agent versi stabil terkini. 
2. Gateway komunikasi difokuskan pada WhatsApp melalui adapter Baileys 
yang terintegrasi pada Hermes Gateway. 
3. Model LLM yang digunakan adalah deepseek-v4-flash-free sebagai model 
utama melalui provider opencode-zen dengan pertimbangan token budget. 
4. Pembahasan tidak mencakup evaluasi komparatif performa antar -model 
LLM atau analisis keamanan kriptografi pada protokol WhatsApp.  
 
1.6 Metode Kerja Praktek 
1.6.1 Lokasi Kerja Praktek 
Berikut ini merupakan lokasi pelaksanaan Kerja Praktek, yaitu di PT 
Timedoor Indonesia yang berlokasi di Jl. Tukad Yeh Aya IX No.46, Renon, 
Denpasar Selatan, Kota Denpasar, Bali 80226. 
5 
 
 
 
Gambar 1.1 Lokasi Kerja Praktek PT Timedoor Indonesia 
 
1.6.2 Waktu Pelaksanaan Kerja Praktek 
Waktu pelaksanaan kerja praktek dimulai dari pukul 08.30 WITA – 18.00 
WITA dan dilaksanakan pada hari Senin sampai Jumat. Kerja praktek 
dilaksanakan sesuai dengan ketentuan yang diberikan oleh PT Timedoor 
Indonesia selama 4 bulan, tepatnya pada: 
Waktu  : 9 Februari 2026 – 9 Juni 2026 
Tempat : PT Timedoor Indonesia, Denpasar, Bali 
Hari  : Senin – Jumat 
Waktu  : 08.30 – 18.00 WITA 
 
1.6.3 Teknik Pengumpulan Data 
Pengumpulan data dan informasi yang diperlukan dalam penyusunan 
laporan Kerja Praktek ini dikelompokkan ke dalam dua jenis data, yaitu: 
1. Data Primer  
Data primer diperoleh secara langsung dari objek penelitian melalui 
metode observasi. Pengamatan dilakukan secara langsung terhadap alur 
kerja, sistem berjalan, serta infrastruktur teknologi yang digunakan untuk 
menganalisis kebutuhan pengembangan Architecture Hermes Agent. Data 
yang diperoleh berupa dokumen internal, catatan alur kerja, dokumen 
teknis, dan skema arsitektur yang relevan. 

6 
 
 
2. Data Sekunder  
Data sekunder diperoleh secara tidak langsung untuk mendukung teori 
dan implementasi sistem. Metode yang digunakan adalah studi pustaka 
(library research), yaitu melakukan pengumpulan data, teori, dan referensi 
pendukung yang bersumber dari buku teks, jurnal ilmiah, serta 
dokumentasi resmi software. Referensi ini digunakan sebagai landasan 
dalam penyusunan konsep rekayasa perangkat lunak, perancangan 
diagram sistem, dan analisis arsitektur agent. 
 
  
 
7 
 
BAB II 
TINJAUAN UMUM PERUSAHAAN 
 
2.1 Sejarah Perusahaan 
PT Timedoor Indonesia adalah perusahaan teknologi informasi yang 
berpusat di Denpasar, Bali, didirikan pada tahun 2014 oleh Yutaka Tokunaga, 
pengusaha asal Jepang dengan latar belakang di bidang produksi web dan 
pemasaran internet. Terdorong oleh keinginan  menghadapi tantangan baru dan 
melihat potensi besar Bali sebagai pusat pertumbuhan ekonomi digital di Asia , 
meskipun saat itu kecepatan internet Indonesia masih terbatas , Yutaka 
memutuskan memulai usahanya di sana, meyakini digitalisasi Indonesia akan 
tumbuh pesat ke depannya. 
Berawal sebagai startup kecil penyedia jasa pembuatan website, 
perusahaan terus berkembang dengan memperluas layanan ke pengembangan 
aplikasi mobile, Internet of Things (IoT), desain UI/UX, pemasaran digital, hingga 
outsourcing IT, dengan etos kerja Jepang disiplin dan berorientasi kualitas sebagai 
landasan layanannya.  Pada 2019, Timedoor melakukan ekspansi dengan 
mendirikan Timedoor Academy (PT Cerdas Digital Indonesia), lembaga 
pendidikan coding dan desain untuk anak -anak dan remaja berbasis kurikulum 
global Jepang -Inggris, mencakup visual programming, pengembangan aplikasi, 
robotika, dan kecerdasan buatan. 
Memasuki usia ke -10 pada 2024, PT Timedoor Indonesia telah melayani 
lebih dari 500 klien dari Indonesia, Jepang, Singapura, dan Malaysia, memiliki 
lebih dari 150 karyawan, serta Timedoor Academy telah mencetak lebih dari 
10.000 siswa di 40 cabang se -Indonesia. Perusahaan juga menjalin kemitraan 
strategis, salah satunya dengan Sawah Cyber Security untuk solusi aplikasi yang 
aman dan inovatif. Berkantor di Jl. Tukad Yeh Aya IX No. 46, Renon, Denpasar 
Selatan, PT Timedoor Indonesia berkomitmen menjadi perusahaan IT terdepan di 
Indonesia dengan filosofi "Let's Create an Incredible Service Needed Around The 
World", memadukan keunggulan teknologi Jepang dengan kehangatan 
hospitalitas Indonesia. 
 
8 
 
 
2.2 Visi, Misi, dan Nilai Inti Perusahaan 
2.2.1 Visi Perusahaan 
PT Timedoor Indonesia menetapkan arah masa depan organisasi melalui 
rumusan visi tunggal yang mengintegrasikan aspek kapasitas manusia dengan 
akselerasi teknologi. Visi perusahaan didefinisikan sebagai berikut: 
“Empower the world by the power of people and technology”. 
Melalui visi ini, entitas bisnis menegaskan keyakinan bahwa teknologi 
bukan sekadar alat otomatisasi yang kaku, melainkan sebuah instrumen yang 
digerakkan oleh potensi, empati, dan kreativitas manusia untuk menciptakan 
peradaban digital yang lebih inklusif dan produktif. 
 
2.2.2 Misi Perusahaan 
Misi utama PT Timedoor Indonesia dijabarkan melalui beberapa komitmen 
fundamental yang diintegrasikan ke dalam aktivitas profesional harian seluruh 
karyawannya. 
Pertama, perusahaan berkomitmen membawa dampak positif bagi 
masyarakat luas dengan memanfaatkan integrasi teknologi secara optimal. Kedua, 
perusahaan memfokuskan layanannya untuk mendukung keberlanjutan hidup dan 
pertumbuhan usaha para pelanggan melalui solusi digital yang berorientasi pada 
hasil bisnis yang nyata. Ketiga, lingkungan kerja dirancang untuk senantiasa 
mendorong kebahagiaan serta pengembangan potensi karyawan secara 
maksimal. Keempat, Timedoor membangun hubungan kekeluargaan yang erat 
guna menciptakan sinergi kerja yang kokoh dalam payung “One Timedoor Family”. 
Kelima, perusahaan menargetkan diri untuk bertransformasi menjadi korporasi 
representatif abad ke -21 di Indonesia yang konsisten mengedepankan inovasi 
berkelanjutan. 
 
2.2.3 Nilai Perusahaan 
Nilai-nilai inti ( core values ) PT Timedoor Indonesia berfungsi sebagai 
pedoman perilaku profesional, standar etika, dan landasan pengambilan 
keputusan bagi seluruh karyawan maupun mahasiswa kerja praktek: 
a. Do It Fast: Mencerminkan respons yang cepat terhadap kebutuhan klien 
dan penyelesaian tugas secara cekatan tanpa menunda tenggat waktu, 
guna menjaga keunggulan kompetitif di industri digital. 
 
9 
 
 
b. Customer Oriented: Menempatkan kepuasan klien dan kenyamanan 
pengguna akhir ( end-user) sebagai indikator keberhasilan utama dalam 
setiap keputusan teknis maupun perancangan desain proyek. 
c. Always Initiative, Always Challenge: Mendorong setiap individu untuk 
proaktif, mandiri, dan berani mengajukan solusi atau ide kreatif atas 
kendala proyek tanpa harus selalu menunggu arahan dari atasan. 
d. Work Hard, Enjoy It : Menekankan keseimbangan antara dedikasi 
profesional yang tinggi dengan kenyamanan kerja guna menciptakan 
lingkungan yang produktif, kolaboratif, dan bersahabat. 
e. Be Good Family : Membangun budaya kerja kekeluargaan melalui 
komunikasi horizontal yang terbuka tanpa sekat birokrasi kaku, sehingga 
setiap anggota tim merasa dihargai dan saling mendukung. 
 
2.3 Struktur Organisasi 
Untuk menjamin kelancaran operasional harian, PT Timedoor Indonesia 
menerapkan struktur organisasi fungsional yang ramping namun terintegrasi 
secara dinamis. Kepemimpinan tertinggi berada di bawah kendali CEO Yutaka 
Tokunaga yang dibantu oleh para manajer departemen serta jajaran direksi 
fungsional. 
 
Gambar 2.1 Struktur Organisasi PT Timedoor Indonesia 

10 
 
 
Halaman ini sengaja dikosongkan
 
11 
 
BAB III 
LANDASAN TEORI  
 
3.1 Large Language Model (LLM) 
3.1.1 Definisi dan Karakteristik Agen Berbasis LLM 
Large Language Model  (LLM) telah bertransformasi dari sistem yang 
semula hanya menghasilkan teks menjadi fondasi agen otonom yang mampu 
merencanakan dan mengeksekusi tugas secara mandiri. Dalam paradigma  
agentic AI, LLM tidak sekadar menjawab pertanyaan, melainkan berfungsi sebagai 
"otak" dari sebuah sistem yang memiliki akses ke alat eksternal, memori persisten, 
dan kemampuan mengambil keputusan secara bertahap. Integrasi LLM ke dalam 
agen otonom menandai pergeseran signifikan dalam lanskap kecerdasan buat an 
dengan menawarkan kemampuan kognitif yang kompetitif dengan perencanaan 
dan penalaran manusia, sehingga memungkinkan pemecahan masalah secara 
otonom dan solusi yang skalabel untuk mengelola kompleksitas proyek perangkat 
lunak dunia nyata. Karakteristik utama yang membedakan agen berbasis LLM dari 
sistem AI konvensional adalah kemampuannya untuk berinteraksi secara iteratif 
dengan lingkungan eksternal, membaca hasil tindakan, menyesuaikan rencana, 
dan melanjutkan eksekusi tanpa intervensi manusia di setiap langkahnya [2]. 
 
3.1.2 Paradigma ReAct: Reasoning and Acting 
Paradigma fundamental yang mendasari arsitektur agen dalam penelitian 
ini adalah  ReAct (Reasoning and Acting) . ReAct mengeksplorasi penggunaan 
LLM untuk menghasilkan jejak penalaran dan tindakan spesifik tugas secara 
bergantian, memungkinkan sinergi yang lebih besar antara keduanya . Jejak 
penalaran membantu model untuk menginduksi, melacak, dan memperbarui 
rencana tindakan sambil menangani pengecualian, sementara tindakan 
memungkinkan agen berinteraksi dengan sumber-sumber eksternal seperti basis 
pengetahuan atau  API. Setiap siklus  ReAct terdiri dari tiga komponen yang 
berulang: Thought (penalaran verbal untuk mendekomposisi tugas),  Action 
(pemanggilan alat atau  API eksternal), dan  Observation (evaluasi ulang 
berdasarkan hasil tindakan yang diterima). Dalam arsitektur yang dibangun pada  
penelitian ini, agen orkestrator menerapkan siklus ReAct untuk mengklasifikasikan 
intensi pengguna dan memutuskan ke agen spesialis mana sebuah tugas harus 
didelegasikan [1]. 
12 
 
 
3.2 Multi-Agent System (MAS) 
3.2.1 Definisi Formal dan Karakteristik 
Multi-Agent System (MAS) adalah paradigma komputasi di mana sejumlah 
agen otonom berinteraksi dalam lingkungan bersama untuk menyelesaikan tujuan 
yang tidak dapat dicapai secara optimal oleh satu agen tunggal. MAS terdiri dari 
beberapa agen otonom yang berinteraksi dalam li ngkungan bersama, membuat 
keputusan secara mandiri untuk menyelesaikan tugas atau memecahkan masalah 
kompleks; setiap agen otonom dalam MAS dibekali dengan pengetahuan awal 
tentang tugas tertentu dan memiliki seperangkat tujuannya sendiri . Empat 
karakteristik fundamental MAS yang relevan dengan sistem yang dibangun dalam 
penelitian ini adalah: (1) setiap agen memiliki informasi atau kemampuan yang 
tidak lengkap sehingga sudut pandangnya terbatas; (2) tidak ada kontrol global 
terpusat atas seluruh sistem; (3) data bersifat terdesentralisasi; dan (4) komputasi 
bersifat asinkron [4]. 
 
3.2.2 Pola Koordinasi dan Sinkronisasi Temporal 
Koordinasi dalam MAS mencakup dua dimensi utama yang saling 
berkaitan. Dalam klasifikasi paradigma orkestrasi sistem  human-agent berbasis 
LLM, dimensi sinkronisasi temporal dibedakan menjadi sinkron dan asinkron, 
sementara strategi tugas dapat bersifat one-by-one (sekuensial) maupun simultan 
(paralel). Pada pola sinkron, agen orkestrator harus menunggu respons dari setiap 
agen pekerja sebelum melanjutkan ke langkah berikutnya, yang mengakibatkan 
antrian tugas terhambat (blocking) dan pengguna tidak dapat berinteraksi selama 
eksekusi berlangsung. Sebaliknya, pola asinkron memungkinkan agen orkestrator 
mendelegasikan tugas dan segera kembali melayani permintaan pengguna 
berikutnya, sementara agen -agen spesialis mengerjakan tugasnya secara 
independen di latar belakang. Pola inilah yang diadopsi dalam arsitektur penelitian 
ini untuk menjaga responsivitas sistem terhadap pengguna [6]. 
 
3.2.3 Tantangan dalam MAS Berbasis LLM 
Meskipun MAS menawarkan keunggulan skalabilitas dan spesialisasi, 
penerapannya juga membawa kompleksitas koordinasi yang inheren. Agen dalam 
sistem multi-agen memiliki kemampuan yang setara dengan sistem agen tunggal, 
namun menghadapi tantangan tambahan yang muncul dari alur kerja  multi-
agen itu sendiri, khususnya dalam hal pembagian alur kerja dan alokasi sub-tugas 
13 
 
 
ke agen yang tepat. Tantangan ini mencakup pemastian bahwa tidak ada dua 
agen yang mengklaim tugas yang sama secara bersamaan ( race condition ), 
penanganan agen yang gagal di tengah eksekusi (stalled agent), serta mekanisme 
untuk melaporkan progres kepada pengguna tanpa harus memblokir alur 
komunikasi utama [5]. 
 
3.3 Orkestrasi Asinkron pada MAS Berbasis LLM 
3.3.1 Kebutuhan Eksekusi Asinkron dan Paralel 
Orkestrasi asinkron menjadi solusi yang didukung oleh bukti empiris untuk 
mengatasi keterbatasan pola sinkron pada beban kerja yang kompleks. 
Implementasi framework DynTaskMAS yang mengorkestrasikan operasi asinkron 
dan paralel dalam MAS berbasis LLM melalui graf tugas dinamis menunjukkan 
bahwa pendekatan ini secara efektif mengatasi tantangan manajemen sumber 
daya, koordinasi tugas, dan efisiensi sistem. Lebih jauh, evaluasi eksperimental 
menunjukkan pengurangan waktu eksekusi sebesar 21 –33% lintas berbaga i 
kompleksitas tugas, peningkatan utilisasi sumber daya sebesar 35,4%, dan 
peningkatan throughput yang hampir linear hingga 16 agen konkuren. Hasil ini 
mempertegas bahwa desain arsitektur asinkron bukan sekadar pilihan, melainkan 
keharusan teknis ketika sistem harus melayani beragam jenis tugas secara 
bersamaan tanpa degradasi pengalaman pengguna [7]. 
 
3.3.2 Centralized Asynchronous Isolated Delegation (CAID) 
Berdasarkan paradigma orkestrasi asinkron yang telah diuraikan pada 
subbab 3.3.1, salah satu pola koordinasi yang relevan dengan kebutuhan delegasi 
tugas non-blocking adalah Centralized Asynchronous Isolated Delegation (CAID). 
CAID diperkenalkan sebagai paradigma koordinasi multi -agen yang dibangun di 
atas tiga primitif yang telah lama digunakan tim pengembang perangkat lunak 
dalam mengelola proyek skala besar: delegasi tugas terpusat ( centralized task 
delegation), eksekusi asinkron ( asynchronous execution ), dan workspace 
terisolasi (isolated workspaces) [8]. 
Motivasi utama CAID adalah masalah konflik integrasi yang muncul ketika 
beberapa agen bekerja secara paralel pada unit kerja yang saling bergantung: 
setiap agen dapat menghasilkan hasil yang benar secara independen, namun 
ketika digabungkan, perubahan dari  satu agen dapat berkonflik dengan asumsi 
yang dipegang agen lain, dan konflik semacam ini hanya terdeteksi pada saat 
14 
 
 
integrasi [8]. CAID mengatasi masalah ini dengan memastikan setiap agen bekerja 
pada workspace yang terisolasi sehingga pekerjaan paralel tidak saling 
mengganggu sebelum dikonsolidasikan. 
Secara mekanis, CAID membangun rencana tugas yang sadar dependensi 
(dependency-aware task plans ) melalui sebuah manajer pusat, mengeksekusi 
sub-tugas secara konkuren dalam workspace yang terisolasi, dan 
mengonsolidasikan progres melalui integrasi terstruktur dengan verifikasi berbasis 
pengujian yang dapat dieksekusi ( executable test -based verification ) [8]. Pada 
implementasi acuannya, ketiga primitif tersebut direpresentasikan secara konkret 
melalui mekanisme git worktree untuk isolasi workspace, serta branch dan merge 
untuk konsolidasi hasil [8]. 
 
3.4 Task Broker dan Manajemen Status 
3.4.1 Peran Task Broker dalam Arsitektur Terdistribusi 
Task broker  adalah komponen sentral yang bertanggung jawab untuk 
menerima, menyimpan, mendistribusikan, dan memantau status tugas dalam 
sistem multi-agen. Dalam arsitektur asinkron,  task broker  menjadi jembatan 
komunikasi antara agen orkestrator yang mendelegasikan tugas dan agen -agen 
spesialis yang mengeksekusinya, tanpa keduanya perlu berinteraksi langsung 
secara sinkron. Mekanisme klaim tugas oleh agen pekerja harus dirancang 
dengan transaksi atomik untuk mencegah dua agen mengklaim tugas yang sama 
secara bersamaan  (race condition ), sebuah masalah klasik dalam sistem 
terdistribusi [5]. 
 
3.4.2 SQLite sebagai Embedded Task Broker 
Implementasi task broker pada Hermes Agent Framework menggunakan 
SQLite sebagai mesin penyimpanannya. SQLite adalah library yang 
mengimplementasikan database engine SQL yang mandiri, serverless, tanpa 
konfigurasi, dan bersifat transaksional . Berbeda dari kebanyakan database SQL 
lainnya, SQLite tidak memiliki proses server terpisah dan membaca serta menulis 
langsung ke berkas disk biasa. Karakteristik serverless ini menghilangkan 
kebutuhan akan instalasi, konfigurasi, dan pemeliharaan layanan da tabase 
terpisah, sehingga sesuai untuk dijalankan pada lingkungan dengan infrastruktur 
minimal seperti WSL2 yang digunakan dalam penelitian ini. Desainer sistem 
melaporkan keberhasilan penggunaan SQLite sebagai penyimpan data pada 
15 
 
 
aplikasi server yang berjalan di datacenter, di mana SQLite digunakan sebagai 
underlying storage engine untuk server database yang bersifat spesifik terhadap 
aplikasi. Jaminan single-writer dan mekanisme transaksi atomik yang dimiliki 
SQLite memastikan bahwa operasi klaim tugas oleh agen pekerja bersifat aman 
dari race condition , menjadikannya fondasi yang tepat bagi task broker pada 
sistem agen yang dibangun di atas Hermes Agent Framework [9]. 
 
3.5 Metode Kanban sebagai Model Status Tugas 
3.5.1 Prinsip Dasar Kanban 
Kanban adalah metode manajemen aliran kerja visual yang berakar dari 
sistem produksi Toyota dan kini diadopsi luas dalam rekayasa perangkat lunak. 
Metode ini beroperasi di atas tiga prinsip inti , yaitu visualisasi seluruh pekerjaan 
melalui papan dan kartu, pembatasan jumlah pekerjaan yang sedang berlangsung 
(Work-In-Progress / WIP limit) untuk mencegah penumpukan tugas, dan optimasi 
aliran kerja dari masukan hingga penyelesaian secara berkelanjutan. Tinjauan 
literatur sistematis terhadap penggunaan Kanban dalam pengembangan 
perangkat lunak mengkonfirmasi bahwa metode ini secara konsisten  digunakan 
untuk mengelola efisiensi aliran kerja, di mana kolom papan Kanban 
merepresentasikan tahapan siklus hidup tu gas dan kartu tugas bergerak antar 
kolom seiring progres pengerjaannya. Adaptasi Kanban pada lingkungan digital 
telah terbukti meningkatkan transparansi status pekerjaan dan memudahkan 
deteksi hambatan (bottleneck) pada aliran tugas secara real-time [10]. 
 
3.5.2 Adaptasi Kanban sebagai Mesin Status pada Sistem Agen 
Mekanisme task broker pada Hermes Agent Framework mengadaptasi 
prinsip Kanban sebagai mesin status tugas, yang direpresentasikan pada berkas 
basis data kanban.db. Alih -alih papan visual, status tugas direpresentasikan 
sebagai nilai kolom dalam tabel SQLite dengan transisi status yang mencerminkan 
siklus hidup tugas, antara lain ready (tugas menunggu diklaim agen spesialis), 
running (tugas sedang dieksekusi), blocked (tugas memerlukan konfirmasi atau 
masukan tambahan dari pengguna), dan completed (tugas telah selesai). Setiap 
transisi dicatat dengan timestamp untuk memungkinkan deteksi tugas yang 
terhenti ( stalled task detection ) dan menyediakan jejak audit yang len gkap. 
Mekanisme ini menyelaraskan dengan prinsip transparansi Kanban konvensional 
sambil memenuhi kebutuhan teknis komunikasi antar-agen dalam sistem asinkron, 
16 
 
 
dan menjadi fondasi task broker yang dimanfaatkan dalam arsitektur orkestrasi 
pada penelitian ini [10]. 
 
3.6 Hermes Agent Framework 
3.6.1 Arsitektur dan Kapabilitas Utama 
Hermes Agent adalah agen AI  open-source berlisensikan MIT yang 
dikembangkan oleh Nous Research dengan karakteristik unik berupa  learning 
loop terintegrasi. Hermes menyediakan kemampuan untuk mendelegasikan tugas 
dan menjalankan sub -agen terisolasi secara paralel untuk berbagai alur kerja, 
dengan dukungan  multi-platform gateway  termasuk WhatsApp, Telegram, 
Discord, Slack, dan berbagai platform lainnya.  Framework ini mendukung 
eksekusi tool call  secara sekuensial maupun konkuren melalui 
ThreadPoolExecutor, ma najemen sesi percakapan panjang dengan kompresi 
konteks otomatis, serta persistensi memori dan keterampilan dalam SQLite. 
Kemampuan ini menjadikan Hermes sebagai fondasi yang memadai untuk 
membangun sistem orkestrasi  multi-agen yang dapat berjalan pada infrastruktur 
minimal sekalipun [3]. 
 
3.6.2 Abstraksi Profil dan Isolasi Agen 
Fitur yang paling krusial bagi arsitektur yang diusulkan adalah abstraksi 
profil Hermes. Hermes mendukung pengoperasian beberapa  instance terisolasi 
dari satu instalasi, di mana setiap profil memiliki konfigurasi, memori, sesi, 
keterampilan, dan layanan  gateway sendiri. Dalam penelitian ini, setiap agen 
spesialis, yaitu  research-agent, code-agent, dan  specialist-builder, berjalan 
sebagai profil Hermes yang independen. Isolasi ini memastikan bahwa konteks, 
memori, dan kredensial antar-agen tidak saling bercampur, serta kegagalan pada 
satu profil agen tidak merambat ke agen lain maupun ke agen orkestrator. 
Mekanisme token-lock yang dimiliki Hermes juga mencegah dua profil 
menggunakan kredensial bot yang sama secara bersamaan [3]. 
 
3.6.3 Native Kanban Tools sebagai Protokol Komunikasi Agen 
Hermes menyediakan serangkaian alat Kanban  native yang secara 
otomatis tersedia pada setiap sesi agen pekerja, membentuk protokol standar 
komunikasi antara agen spesialis dan  task broker . Alat -alat ini 
mencakup kanban_show untuk membaca konteks dan detail tugas yang 
17 
 
 
diklaim, kanban_complete untuk menandai tugas sebagai selesai sekaligus 
mengirimkan hasil kepada pengguna, kanban_block untuk memblokir tugas yang 
memerlukan konfirmasi pengguna,  kanban_comment untuk memberikan 
pembaruan progres tanpa menyelesaikan tugas, dan  kanban_heartbeat untuk 
mengirimkan sinyal  liveness yang membuktikan agen masih aktif mengerjakan 
tugas. Kelima alat ini membentuk antarmuka yang cukup untuk 
mengimplementasikan siklus hidup tugas Kanban yang telah dijelaskan pada 
subbab sebelumnya, tan pa memerlukan protokol komunikasi antar -agen yang 
lebih kompleks [3]. 
  
18 
 
 
Halaman ini sengaja dikosongkan 
 
 
19 
 
BAB IV 
HASIL DAN PEMBAHASAN 
 
4.1 Hasil Perancangan Arsitektur Sistem 
4.1.1 Arsitektur Keseluruhan 
Subbab ini menguraikan arsitektur menyeluruh sistem orkestrasi multi -
agen asinkron yang telah dibangun, mencakup lapisan -lapisan utama serta 
tanggung jawab masing-masing komponen dalam mendukung alur delegasi tugas 
tanpa memblokir interaksi pengguna. Arsit ektur sistem yang dihasilkan 
mengadopsi pola Centralized Asynchronous Isolated Delegation  (CAID) yang 
diadaptasi dari prinsip orkestrasi agen perangkat lunak asinkron [4]. Sistem terdiri 
dari lima lapisan utama: (1) User Interface Layer berupa gateway WhatsApp; (2) 
Orchestration Layer yang diemban oleh agen dengan profil default; (3) Task Broker 
Layer berupa basis data SQLite ( kanban.db) yang bertindak sebagai perantara 
pesan tahan-lama (durable message broker) [8]; (4) Worker Layer yang terdiri dari 
agen-agen spesialis dengan profil terisolasi; serta (5) Notification Layer  yang 
mengimplementasikan protokol push-based ke pengguna melalui mekanisme 
notify-subscribe. 
 
 
Gambar 4.1 Hermes End-to-end Architecture 
 

20 
 
 
Tanggung jawab masing -masing komponen dirinci sebagai berikut. 
Hermes Gateway berfungsi sebagai message broker eksternal yang menerima 
pesan dari WhatsApp Business API (adapter Baileys) dan meneruskannya ke sesi 
agen yang sesuai. Orchestrator berperan sebagai single entry point  yang 
mengklasifikasikan intensi pengguna ke dalam dua kategori: percakapan biasa 
atau tugas yang memerlukan delegasi. Jika intensi merupakan tugas, Orchestrator 
mengeksekusi protokol delegasi tiga langkah: balas pengguna, buat tugas kanban, 
dan langgan notifikasi. Dispatcher yang tertanam pada gateway berjalan dengan 
interval 10 detik untuk memindai tabel tasks pada kanban.db dan meluncurkan 
sesi pekerja baru melalui injeksi kueri literal "work kanban task <TASK_ID>"  [6]. 
Setiap pekerja kemudian mengeksekusi siklus hidupnya secara terisolasi dalam 
workspace tersendiri dan wajib memanggil kanban_complete sebelum terminasi. 
 
4.1.2 Skema Task Broker 
Sebagai komponen penghubung antara agen orkestrator dan agen 
spesialis, task broker  memerlukan skema data yang mampu merekam status, 
riwayat, dan metadata setiap tugas secara konsisten. Subbab ini menjelaskan 
rancangan skema basis data kanban.db yang menjadi fondasi mekanisme 
tersebut. Basis data kanban.db dirancang sebagai embedded task broker dengan 
skema relasional yang terdiri dari enam tabel utama: tasks, task_events, 
task_comments, task_runs, task_links, dan kanban_notify_subs. Tabel tasks 
menyimpan atribut utama setiap tugas meliputi id (format t_<hash>), title, body, 
assignee (nama profil), status, workspace_kind (scratch atau worktree), 
max_runtime_seconds, created_at (stempel waktu Unix), serta 
consecutive_failures untuk pelacakan kegagalan berulang. 
 
Tabel 4.1 Skema Tabel kanban.db 
Nama Tabel Fungsi Kolom Kunci 
Tasks 
Menyimpan rekaman utama 
setiap tugas yang 
didelegasikan, mencakup 
identitas, status, dan 
metadata eksekusi 
id (format t_<hash>), 
title, body, assignee, 
status, workspace_kind, 
max_runtime_seconds, 
created_at, 
consecutive_failures 
21 
 
 
Nama Tabel Fungsi Kolom Kunci 
task_events 
Mencatat seluruh peristiwa 
perubahan status tugas 
sebagai jejak audit (audit 
trail) yang tidak dapat diubah 
id, task_id, event_type, 
payload, created_at 
task_comments 
Menyimpan komentar 
progres yang ditulis oleh 
pekerja selama eksekusi, 
termasuk komunikasi 
[NEEDS_CONFIRMATION] 
dan USER_REPLY 
id, task_id, author, body, 
created_at 
task_runs 
Merekam setiap instansi 
eksekusi (attempt) untuk satu 
tugas, memungkinkan 
pelacakan riwayat percobaan 
ulang 
id, task_id, run_id, 
profile, started_at, 
completed_at, outcome, 
summary 
task_links 
Menyimpan relasi 
ketergantungan antara tugas 
induk dan tugas anak 
(parent-child dependency) 
parent_id, child_id, 
created_at 
kanban_notify_subs 
Mendaftarkan langganan 
notifikasi per tugas sehingga 
gateway mengetahui tujuan 
pengiriman hasil secara 
otomatis 
id, task_id, platform, 
chat_id, user_id, 
notifier_profile, 
created_at 
 
Mesin transaksi SQLite menyediakan jaminan single-writer dan atomisitas 
ACID sehingga mencegah kondisi balapan ( race condition) pada saat dispatcher 
dan pekerja mengakses baris tugas yang sama [8]. Mesin status ( state machine) 
tugas mengikuti alur: ready → running → done/blocked/failed. Kolom status pada 
tabel tasks mengikuti mesin status terbatas dengan transisi yang hanya dapat 
dipicu oleh tool kanban resmi, sebagaimana diilustrasikan pada Gambar 4.3. 
22 
 
 
 
Gambar 4.2 Diagram Status Siklus Hidup Tugas pada Sistem Hermes Agent 
 
Status blocked terjadi ketika pekerja memanggil kanban_block untuk 
menunggu konfirmasi pengguna. Status failed terdeteksi otomatis ketika pekerja 
keluar dengan kode pulih nol tanpa memanggil kanban_complete, yang 
diklasifikasikan sebagai pelanggaran protok ol ( protocol violation ). Sistem 
dilengkapi mekanisme percobaan ulang otomatis melalui parameter failure_limit 
(nilai default: 2 kegagalan berturut -turut). Setiap kali sebuah run pada tabel 
task_runs berakhir dengan outcome gagal, nilai consecutive_failures  pada tabel 
tasks bertambah satu; ketika nilai ini melampaui failure_limit, dispatcher secara 
otomatis mengubah status tugas menjadi blocked agar menunggu intervensi 
pengguna, tanpa memerlukan pemantauan manual terhadap log eksekusi. 
Kombinasi tabel task_events dan task_runs menyediakan jejak audit yang 
lengkap atas siklus hidup setiap tugas task_events merekam setiap perubahan 
status sebagai catatan yang tidak dapat diubah (immutable), sedangkan task_runs 
merekam detail setiap percobaan eksekusi termasuk profil pekerja yang 
menangani, waktu mulai dan selesai, serta ringkasan hasil. Kombinasi ini 

23 
 
 
memungkinkan penelusuran penuh terhadap setiap keputusan delegasi yang 
diambil oleh sistem.  
 
4.1.3 Profil Agent yang Diimplementasikan 
Untuk mewujudkan pemisahan tanggung jawab sebagaimana dirancang 
pada arsitektur 4.1.1, diperlukan implementasi konkret profil -profil agen yang 
terisolasi. Subbab ini memaparkan profil agen yang telah dibangun beserta peran 
dan hubungan hierarkisnya dalam s istem. Empat profil agen diimplementasikan 
dengan isolasi konfigurasi, memori, dan keterampilan masing -masing 
sebagaimana didukung oleh abstraksi profil pada Hermes Framework [6]. 
 
Tabel 4.2 Daftar Profil Agent yang Diimplementasikan 
Nama Profil Peran Model LLM Spesialisasi Workspace 
default Orkestrator 
deepseek-
v4-flash-free 
Klasifikasi intensi 
pengguna, delegasi 
tugas, dan 
manajemen 
protokol notify-
subscribe 
N/A 
research-
agent 
Pekerja 
riset 
deepseek-
v4-flash-free 
Pencarian 
informasi daring, 
analisis dokumen, 
sintesis laporan 
terstruktur 
scratch 
code-agent 
Pekerja 
kode 
deepseek-
v4-flash-free 
Penulisan skrip, 
debugging, dan 
pengembangan 
perangkat lunak 
dalam repositori 
terisolasi 
worktree 
agent-
specialist-
builder 
Pekerja 
pembangun 
agen 
deepseek-
v4-flash-free 
Materialisasi profil 
agen baru meliputi 
pembuatan 
SOUL.md dan 
konfigurasi 
Scratch 
24 
 
 
Hierarki delegasi mengikuti struktur bintang ( star topology ) dengan 
Orchestrator sebagai simpul pusat. Orchestrator tidak menangani tugas secara 
langsung, melainkan memetakan jenis tugas ke profil target. Riset dan analisis ke 
research-agent, pengembangan perangkat lunak ke code-agent, serta permintaan 
pembuatan agen baru ke agent-specialist-builder. 
 
4.2 Implementasi Komponen Utama 
4.2.1 Orchestrator Agent 
Agen orkestrator merupakan komponen sentral yang menentukan 
keberhasilan pola asinkron non-blocking. Subbab ini menjelaskan implementasi 
teknis agen orkestrator, termasuk pendekatan penulisan instruksi dan konfigurasi 
yang digunakan untuk memastikan klasifikasi intensi dan delegasi tugas berjalan 
sesuai protokol. Orchestrator diimplementasikan dengan pendekatan imperative 
style pada berkas SOUL.md setelah pengalaman menunjukkan bahwa model 
menengah seperti deepseek-v4-flash-free tidak dapat diandalkan untuk klasifikasi 
intensi berbasis deskripsi deklaratif [6]. SOUL.md Orchestrator menggunakan pola 
langkah bernomor eksplisit (STEP 1/2/3) dengan kata kerja imperatif “WAJIB” dan 
“JANGAN SKIP” untuk memaksakan alur protokol delegasi. 
25 
 
 
 
Gambar 4.3 Flow Diagram Keputusan Orchestrator 
 
Konfigurasi kritis pada ~/.hermes/config.yaml meliputi approvals.mode: 
auto untuk menghindari blokir akibat menunggu persetujuan manual; 
kanban.dispatch_interval_seconds: 10 untuk mengurangi latensi antar pemindaian 
tugas; serta group_sessions_per_user: true  untuk memastikan satu pengguna 
memiliki satu sesi persisten. Konfigurasi platform mensyaratkan keberadaan 
hermes-cli pada toolset WhatsApp agar perintah kanban dapat dieksekusi dari 
dalam sesi percakapan [5]. 
 

26 
 
 
  
Gambar 4.4 Screenshot Percakapan WhatsApp 
 
4.2.2 Worker Agent 
Setelah tugas didelegasikan oleh orkestrator, agen  mulai mengeksekusi 
tugas secara mandiri dalam workspace terisolasi. Subbab ini menjelaskan 
mekanisme aktivasi, alat-alat yang tersedia, dan siklus hidup eksekusi pada agen 
pekerja. Pekerja diaktivasi oleh dispatcher melalui injeksi kueri literal "work kanban 
task <TASK_ID>". Setelah spawn, pekerja secara otomatis menerima injeksi tujuh 
alat kanban native: kanban_show, kanban_complete, kanban_block, 
kanban_comment, kanban_heartbeat, kanban_create, dan kanban_link [6]. Alat-
alat ini membentuk protokol standar komunikasi antara pekerja dan task broker 
tanpa memerlukan akses terminal atau CLI manual. 
 

27 
 
 
 
Gambar 4.5 Diagram Siklus Hidup Worker 
 
Siklus hidup pekerja mengikuti urutan: (1) panggil kanban_show untuk 
membaca spesifikasi tugas dan memeriksa adanya USER_REPLY, (2) eksekusi 
tugas sesuai domain spesialisasi , (3) kirim sinyal liveness melalui 
kanban_heartbeat setiap dua menit untuk mencegah terminasi prematur oleh 
dispatcher, (4) panggil kanban_complete dengan parameter --result yang berisi 
hasil human-readable. Kegagalan memanggil kanban_complete sebelum keluar 
menyebabkan kolom consecutive_failures bertambah dan status berubah ke 
failed, yang kemudian ditangani oleh mekanisme auto-block dispatcher. 
 
4.2.3 Agent Specialist Builder 
Selain dua agen pekerja yang menangani tugas riset dan pengembangan, 
sistem juga dilengkapi agen khusus yang bertanggung jawab membangun profil 
agen baru secara otomatis. Subbab ini memaparkan implementasi agen agent-
specialist-builder beserta tahapan kerjanya. Agen agent-specialist-builder 
dirancang sebagai pekerja tujuh langkah yang bertanggung jawab atas 
materialisasi profil agen baru secara penuh. Implementasi mengikuti prinsip source 

28 
 
 
of truth  pada badan tugas kanban dengan format terstruktur: AGENT_NAME, 
AGENT_ROLE, AGENT_DESCRIPTION, PERSONA_NAME, CONSTRAINTS. 
 
Gambar 4.6 Diagram Alur 7-Langkah agent-specialist-builder 
 
Langkah kedua mengimplementasikan mekanisme auto-generate persona 
name dengan memilih nama dari pool tetap (Lyra, Nova, Zara, Cleo, Naia, Vesper, 
Mira, Asha, Sable, Rhea, Lune, Cora, Vaia, Selene, Eris) berdasarkan “vibes” atau 
nuansa peran agen. Langkah ketiga menjalankan similarity check  dengan 
membaca SOUL.md dari semua profil eksisting menggunakan perintah hermes 
profile list  dan cat ~/.hermes/profiles/<profile>/SOUL.md . Jika ditemukan 
kemiripan fungsional, agen menghentikan eksekusi dan melaporkan 

29 
 
 
SIMILARITY_DETECTED: true  pada hasil kanban_complete untuk mencegah 
redundansi. 
Langkah keenam mengimplementasikan sistem resolusi keterampilan tiga 
tingkat (3-tier skill resolution ). Tingkat pertama memeriksa local registry melalui 
hermes skills list . Tingkat kedua mencari pada public hub melalui hermes skills 
search dengan preferensi sumber reputasi (vercel -labs, anthropics, openai, 
microsoft). Tingkat ketiga membuat tugas anak ( subtask) ke skill-creator jika 
keterampilan belum tersedia. Setiap keterampilan yang berhasil diperoleh di -
symlink ke direktori profil baru, bukan disalin, u ntuk menjaga konsistensi dan 
menghemat penyimpanan. 
 
4.2.4 Skill Management via Symlink 
Salah satu tantangan dalam isolasi profil agen adalah duplikasi 
keterampilan ( skills) antar -profil yang dapat membebani penyimpanan dan 
menyulitkan pemeliharaan. Subbab ini menjelaskan pendekatan manajemen 
keterampilan berbasis symbolic link yang diterapkan untuk mengatasi tantangan 
tersebut. Manajemen keterampilan diimplementasikan menggunakan symbolic 
link (symlink) yang telah diverifikasi berfungsi pada lingkungan WSL. Hermes 
Framework melakukan indeks keterampilan berdasarkan nilai name pada berkas 
SKILL.md, sehingga symlink ke keterampilan bawaan tidak menyebabkan 
duplikasi entri [6]. 
 
Tabel 4.3 Perbandingan Copy File vs Symlink pada Manajemen Skills 
Aspek 
Penyalinan Berkas 
(Copy) 
Pranala Simbolik (Symlink) 
Penggunaan 
penyimpanan 
Setiap profil menyimpan 
salinan penuh; dengan 
asumsi 5 profil × 10 
keterampilan × 10 berkas, 
dihasilkan 500 berkas 
duplikat 
Hanya menyimpan satu entri 
inode per pranala; overhead 
penyimpanan mendekati ≈0 
byte per keterampilan 
Pemeliharaan 
saat pembaruan 
Pembaruan keterampilan 
harus dilakukan secara 
manual pada setiap profil 
secara individual 
Pembaruan cukup dilakukan 
satu kali pada registry sentral 
(~/.hermes/skills/); seluruh 
30 
 
 
Aspek 
Penyalinan Berkas 
(Copy) 
Pranala Simbolik (Symlink) 
profil memperoleh pembaruan 
secara otomatis 
Konsistensi 
konten 
Berisiko divergensi 
antarprofil apabila satu 
salinan diperbarui 
sementara yang lain tidak 
Selalu sinkron karena seluruh 
profil merujuk ke satu sumber 
kebenaran yang sama 
Indeks Hermes Berpotensi menghasilkan 
entri duplikat jika nilai 
name pada SKILL.md 
identik dengan 
keterampilan bawaan 
Hermes melakukan 
deduplikasi berdasarkan nilai 
name pada SKILL.md; tidak 
terjadi entri ganda 
Ketahanan 
terhadap 
pemindahan 
berkas sumber 
Salinan tetap berfungsi 
meskipun berkas sumber 
dipindahkan atau dihapus 
Pranala menjadi rusak (broken 
symlink) apabila berkas 
sumber dipindahkan atau 
dihapus 
Kompatibilitas 
lingkungan WSL 
Didukung penuh pada 
seluruh lingkungan 
Didukung penuh pada 
lingkungan WSL/Linux; 
memerlukan Developer Mode 
pada Windows native 
 
31 
 
 
Struktur direktori keterampilan mengikuti pola kategori. Contoh 
implementasi untuk agen ops-agent: 
 
Gambar 4.7 Screenshot Terminal Struktur Direktori Symlink 
 
4.3 Pengujian Sistem 
4.3.1 Skenario Pengujian 
Pengujian dirancang untuk mencakup seluruh siklus hidup interaksi sistem, 
mulai dari percakapan biasa hingga pembuatan agen baru, guna memastikan 
setiap jalur eksekusi dapat diverifikasi. 
 
Tabel 4.4 Skenario Pengujian Sistem Multi-Agent 
No. Skenario 
Masukan 
(Input) 
Keluaran yang 
Diharapkan (Expected 
Output) 
Status 
1 Percakapan 
biasa tanpa 
delegasi 
Pengguna 
mengirim pesan 
sapaan: "kamu 
lisa?" 
Orchestrator merespons 
secara langsung dalam 
waktu < 10 detik tanpa 
membuat entri tugas 
pada kanban.db 
Berhasil 
2 Delegasi 
tugas riset 
Pengguna 
mengirim: 
"Carikan data 
Orchestrator membalas 
konfirmasi dalam waktu < 
10 detik; entri tugas baru 
Berhasil 

32 
 
 
No. Skenario 
Masukan 
(Input) 
Keluaran yang 
Diharapkan (Expected 
Output) 
Status 
villa yang ada di 
Bali khususnya 
di daerah Desa 
Munggu dan 
sekitarnya" 
muncul pada kanban.db 
dengan status ready; 
notifikasi hasil terkirim 
otomatis ke WhatsApp 
setelah pekerja selesai 
3 Interaksi 
paralel saat 
tugas 
berjalan 
Pengguna 
mengirim pesan 
percakapan 
baru sementara 
research-agent 
masih berstatus 
running 
Orchestrator merespons 
pesan percakapan baru 
secara normal tanpa 
pemblokiran; status tugas 
pada kanban.db tetap 
running dan tidak 
terganggu 
Berhasil 
4 Penangana
n konfirmasi 
pengguna 
(blocked 
task) 
Pekerja 
menemukan 
ambiguitas 
dalam 
spesifikasi tugas 
dan memanggil 
kanban_block 
dengan 
komentar 
[NEEDS_CONFI
RMATION] 
Orchestrator meneruskan 
pertanyaan konfirmasi ke 
WhatsApp pengguna; 
setelah pengguna 
menjawab, Orchestrator 
menulis USER_REPLY 
dan memanggil 
kanban_unblock; pekerja 
melanjutkan eksekusi 
Terverifik
asi 
Parsial 
5 Deteksi 
pelanggara
n protokol 
(protocol 
violation) 
Pekerja 
mengakhiri sesi 
(kode pulih 
rc=0) tanpa 
memanggil 
kanban_complet
e 
Dispatcher mendeteksi 
terminasi tanpa 
perubahan status; kolom 
consecutive_failures 
bertambah; status tugas 
berubah menjadi failed; 
notifikasi kegagalan 
terkirim ke WhatsApp 
pengguna 
Berhasil 
33 
 
 
No. Skenario 
Masukan 
(Input) 
Keluaran yang 
Diharapkan (Expected 
Output) 
Status 
6 Pembuatan 
agen baru 
via agent-
specialist-
builder 
Orchestrator 
menerima 
permintaan 
pembuatan 
agen baru dan 
mendelegasikan 
ke agent-
specialist-
builder 
Profil agen baru terbentuk 
di 
~/.hermes/profiles/<nama
>/; SOUL.md dan 
config.yaml tertulis; 
pranala simbolik 
keterampilan terbentuk; 
kanban_complete 
dipanggil dengan 
ringkasan hasil 
Terverifik
asi 
Parsial 
 
4.3.2 Pengujian Non-Blocking Delegation 
Untuk membuktikan bahwa agen orkestrator dapat mendelegasikan tugas 
tanpa memblokir alur percakapan pengguna sebagaimana menjadi inti rumusan 
masalah penelitian ini, dilakukan pengujian terhadap perilaku orkestrator pada 
saat tugas sedang didelegasikan ke agen spesialis. 
 
Tabel 4.5 Hasil Pengujian Metrik terhadap Sistem Baru 
Aspek yang Diuji Hasil Pengujian 
Waktu respons 
orkestrator saat 
delegasi tugas 
< 10 detik (konfirmasi delegasi diterima pengguna 
segera setelah tugas ditulis ke task broker, tanpa 
menunggu eksekusi selesai) 
Interaksi paralel 
saat tugas berjalan 
Pengguna dapat mengirim dan menerima pesan lain 
secara normal selama agen spesialis mengeksekusi 
tugas di latar belakang (Skenario 3, Tabel 4.5) 
Jumlah tugas 
konkuren yang 
didukung 
Hingga N = 3 tugas secara bersamaan (nilai default 
max_concurrent_children) 
Pengiriman hasil 
tugas ke pengguna 
Otomatis melalui protokol notify-subscribe setelah 
kanban_complete dipanggil, tanpa memerlukan kueri 
ulang dari pengguna 
 
34 
 
 
Hasil pengujian menunjukkan bahwa orkestrator merespons dalam waktu 
kurang dari 3 detik setelah tugas didelegasikan ke task broker, karena orkestrator 
tidak menunggu eksekusi tugas oleh agen spesialis selesai sebelum 
mengonfirmasi penerimaan kepada penggun a. Selama eksekusi berlangsung di 
latar belakang, pengguna tetap dapat melanjutkan percakapan secara normal, 
sebagaimana diverifikasi pada Skenario 3 (Tabel 4.5). Sistem juga mendukung 
hingga tiga tugas konkuren sesuai konfigurasi max_concurrent_children, dan hasil 
setiap tugas dikirimkan secara otomatis kepada pengguna melalui protokol notify-
subscribe begitu agen spesialis menandai tugas selesai. Adapun mekanisme 
percobaan ulang otomatis dan jejak audit eksekusi telah dijelaskan pada subbab 
4.1.2. 
 
4.3.3 Pengujian Notifikasi Push-Based 
Selain non-blocking pada sisi pendelegasian, sistem juga harus mampu 
menyampaikan hasil tugas kepada pengguna secara proaktif tanpa memerlukan 
permintaan ulang. Subbab ini menjelaskan pengujian terhadap protokol notifikasi 
push-based yang diimplementasikan. Protokol notify-subscribe diverifikasi dengan 
memeriksa entri pada tabel kanban_notify_subs sebelum dan sesudah eksekusi 
perintah hermes kanban notify -subscribe. Setelah langganan berhasil, notifikasi 
otomatis terkirim ke WhatsApp pengguna saat pekerja m emanggil 
kanban_complete, tanpa memerlukan kueri balik dari pengguna. 
 
35 
 
 
  
Gambar 4.8 Screenshot WhatsApp Notifikasi Otomatis Hasil Task 
 
4.3.4 Pengujian Symlink Skill Management 
Sebagai pelengkap pengujian fungsional, dilakukan verifikasi terhadap 
mekanisme manajemen keterampilan berbasis symlink yang telah dijelaskan pada 
subbab 4.2.4, baik pada tingkat sistem berkas maupun tingkat aplikasi. Verifikasi 
dilakukan pada dua tingkat yaitu sistem berkas dan indeks Hermes. Pada tingkat 
sistem berkas, perintah find ~/.hermes/profiles/<agent>/skills -type l  berhasil 
mengidentifikasi seluruh symbolic link. Perintah hermes --profile <agent> skills list 
menunjukkan bahwa Hermes berhasil me-resolve target symlink dan mengindeks 
keterampilan berdasarkan nama pada SKILL.md tanpa duplikasi. 

36 
 
 
 
Gambar 4.9 Screenshot Terminal Verifikasi Symlink dan Skills Size 
 
 
Gambar 4.10 Screenshot Terminal Verifikasi Symlink dan Skills Size 
 
4.3.5 Pengujian Deteksi Pelanggaran Protokol 
Selain skenario ketika pekerja secara aktif meminta konfirmasi, sistem juga 
harus mampu menangani kondisi pekerja yang berhenti tanpa menyelesaikan 
protokol penutupan tugas. Subbab ini menjelaskan pengujian terhadap 
mekanisme deteksi pelanggaran protokol ( protocol violation ) sebagaimana 
tercantum pada Skenario 5, Tabel 4.5. Pengujian dilakukan dengan menghentikan 

37 
 
 
sesi pekerja secara paksa sebelum kanban_complete dipanggil, dengan kode 
keluar (exit code) bernilai nol sehingga proses tersebut tampak berakhir normal 
dari sudut pandang sistem operasi. 
Pada pemindaian berikutnya, dispatcher mendeteksi bahwa run terkait 
pada tabel task_runs telah berakhir tanpa adanya pemanggilan kanban_complete, 
sehingga run tersebut dicatat dengan outcome gagal dan kolom 
consecutive_failures pada tabel tasks bertambah satu. Sebagaimana dijelaskan 
pada subbab 4.2.2, kegagalan ini menyebabkan status tugas berubah menjadi 
failed, yang kemudian ditangani oleh mekanisme auto-block dispatcher tanpa 
memerlukan pemantauan manual terhadap log eksekusi. Perubahan status 
tersebut diikuti dengan pengiriman notifikasi kegagalan kepada pengguna melalui 
WhatsApp, sehingga pengguna tetap memperoleh informasi meskipun tugas tidak 
terselesaikan oleh pekerja. 
 
  
Gambar 4.11 Screenshot Notifikasi Task Failed kepada User 

38 
 
 
4.3.6 Pengujian Pembuatan Agen Baru via agent-specialist-builder 
Skenario pengujian terakhir mengevaluasi kapabilitas sistem dalam 
memperluas dirinya sendiri, yaitu kemampuan mendelegasikan permintaan 
pembuatan agen spesialis baru. Subbab ini menjelaskan pengujian terhadap 
proses tujuh langkah agent-specialist-builder yang telah dipaparkan pada subbab 
4.2.3, sebagaimana tercantum pada Skenario 6, Tabel 4.5. Pengujian dilakukan 
dengan mengirimkan permintaan pembuatan agen baru kepada Orchestrator, 
yang kemudian mendelegasikan tugas tersebut ke profil agent -specialist-builder 
beserta spesifikasi AGENT_NAME, AGENT_ROLE, AGENT_DESCRIPTION, 
PERSONA_NAME, dan CONSTRAINTS pada badan tugas kanban. 
Verifikasi dilakukan terhadap keluaran setiap langkah. Pada tingkat sistem 
berkas, direktori profil baru berhasil terbentuk pada ~/.hermes/profiles/<nama>/ 
beserta berkas SOUL.md dan config.yaml yang ditulis sesuai spesifikasi tugas, 
termasuk nama persona yang dipilih otomatis dari pool nama yang telah 
ditentukan. Pada tingkat keterampilan, hasil resolusi tiga tingkat ( 3-tier skill 
resolution) yang dijelaskan pada subbab 4.2.3 terwujud dalam bentuk pranala 
simbolik (symlink) ke direktori ~/.hermes/skills/ p ada profil baru, dengan struktur 
yang serupa dengan hasil verifikasi pada subbab 4.3.4. Agen agent -specialist-
builder kemudian memanggil kanban_complete dengan ringkasan hasil 
pembuatan profil sebagai tanda penyelesaian tugas. 
 
  
Gambar 4.12 SOUL.md dan Notifikasi Hasil Pembuatan Agen Baru 
 

39 
 
 
Status Terverifikasi Parsial pada Skenario 6 (Tabel 4.5) diberikan karena 
lingkup verifikasi pada pengujian ini terbatas pada tahap materialisasi profil, yaitu 
memastikan struktur direktori, berkas konfigurasi, dan pranala keterampilan 
terbentuk sesuai spesifikasi tujuh langkah. Peng ujian belum mencakup verifikasi 
end-to-end terhadap kinerja operasional profil agen baru tersebut ketika benar -
benar didelegasikan tugas sesuai bidang spesialisasinya, karena hal tersebut 
memerlukan siklus pengujian tambahan yang berada di luar cakupan waktu kerja 
praktik. Selain itu, jalur similarity check (langkah ketiga) dan tingkat ketiga resolusi 
keterampilan (subtask ke skill-creator) tidak teruji pada skenario ini, karena tidak 
ditemukan kemiripan dengan profil agen yang telah ada dan seluruh keterampilan 
yang dibutuhkan telah tersedia pada tingkat pertama dan kedua. 
 
4.4 Pembahasan 
4.4.1 Analisis Prinsip CAID 
Arsitektur yang dibangun pada subbab 4.1 dirancang dengan mengacu 
pada prinsip Centralized Asynchronous Isolated Delegation  (CAID) yang telah 
dijelaskan pada subbab 3.3.2. Subbab ini menganalisis sejauh mana implementasi 
sistem merealisasikan setiap aspek dari prinsip tersebut. Implementasi sistem 
menunjukkan korelasi kuat dengan prinsip CAID yang dirumuskan Geng dan 
Neubig [4]. Aspek Centralized terwujud melalui Orchestrator sebagai satu-satunya 
titik masuk (single entry point) yang mengkoordinasikan seluruh alur tugas. Aspek 
Asynchronous terealisasi melalui mekanisme kanban dengan dispatcher interval 
dan protokol notify-subscribe, memungkinkan pengguna berinteraksi tanpa 
menunggu terminasi pekerja. Aspek Isolated dijamin oleh kombinasi --worktree 
pada pekerja kode dan isolasi profil Hermes yang memiliki memori, sesi, dan 
keterampilan tersendiri [6]. Aspek Delegation diimplementasikan dengan instruksi 
imperatif pada SOUL.md yang memaksa Orchestrator untuk selalu 
mendelegasikan tugas kompleks. 
 
4.4.2 Pemilihan SQLite sebagai Task Broker 
Pemilihan teknologi task broker  merupakan keputusan arsitektural yang 
berdampak langsung pada kompleksitas implementasi dan kemampuan 
skalabilitas sistem. Subbab ini membahas pertimbangan yang mendasari 
pemilihan SQLite serta implikasinya terhadap desain sistem secara keseluruhan. 
Pemilihan SQLite sebagai task broker  didasarkan pada pertimbangan trade-off 
40 
 
 
terhadap solusi message broker eksternal seperti Redis atau RabbitMQ. SQLite 
menawarkan zero-dependency deployment  yang kritis untuk lingkungan WSL 
pada laptop pribadi dengan sumber daya terbatas. Jaminan transaksi ACID dan 
single-writer guarantee pada SQLite secara alami mencegah kondisi balapan pada 
skema claim task [8]. Namun, keterbatasan muncul pada skalabilitas horizontal , 
SQLite tidak cocok untuk arsitektur multi-node karena tidak mendukung penulisan 
konkuren dari banyak proses pada satu berkas basis data. Untuk skala startup 
atau single-node deployment, SQLite terbukti memadai. 
 
4.4.3 Imperative vs Declarative SOUL.md 
Selama proses implementasi, ditemukan bahwa pendekatan penulisan 
instruksi agen turut menentukan keandalan klasifikasi intensi oleh orkestrator. 
Subbab ini membahas temuan empiris terkait gaya penulisan instruksi yang efektif 
untuk model LLM yang digunakan  dalam sistem. Temuan empiris menunjukkan 
bahwa model menengah (deepseek -v4-flash-free) gagal mengikuti instruksi 
berbasis klasifikasi intensi deklaratif. Model cenderung mengabaikan aturan 
implisit dan menghasilkan respons langsung untuk tugas yang seharu snya 
didelegasikan. Solusi yang diimplementasikan adalah transformasi SOUL.md ke 
gaya imperatif dengan langkah bernomor eksplisit, kata kerja wajib (“WAJIB”, 
“JANGAN SKIP”), dan peringatan keras tentang konsekuensi pelanggaran 
protokol. Pendekatan ini sela ras dengan temuan pada literatur bahwa desain 
instruksi agen harus mempertimbangkan kapabilitas model target [7]. 
 
4.4.4 Token Budget sebagai Constraint Arsitektur 
Selain pertimbangan arsitektural pada level desain sistem, batasan praktis 
berupa kuota token model LLM turut memengaruhi keputusan implementasi. 
Subbab ini menjelaskan kendala anggaran token yang ditemukan selama 
pengujian dan solusi yang diterapkan. Sela ma pengujian, profil agent-specialist-
builder menunjukkan bahwa SOUL.md yang panjang (~9.700 token pada system 
prompt saja) menyebabkan pembatasan laju sebelum satu panggilan alat pun 
terjadi. Perbaikan dilakukan dengan memisahkan instruksi ringkas pada SOUL.md 
(~180 baris) dari referensi teknis detail pada skills/agent-builder/SKILL.md yang 
dimuat sesuai permintaan (on-demand) melalui skill_view. Aturan anggaran token 
yang ditetapkan adalah SOUL.md orkestrator < 1.200 token, SOUL.md pekerja < 
700 token, dan total system prompt pekerja < 2.000 token [6]. 
41 
 
 
4.4.5 Keterbatasan Sistem 
Sebagai bagian dari evaluasi menyeluruh, perlu diidentifikasi pula 
keterbatasan yang melekat pada implementasi sistem saat ini, baik yang bersifat 
teknis maupun operasional, sebagai dasar bagi pengembangan lebih lanjut. 
Beberapa keterbatasan teridentifikas i selama implementasi dan pengujian. 
Pertama, penggunaan model free tier menyebabkan pembatasan laju ( rate limit) 
yang menghambat throughput pada eksekusi agen konkuren. Kedua, SQLite 
dengan single-writer tidak mendukung penskalaan horizontal ke multi-node tanpa 
migrasi ke sistem basis data terdistribusi. Ketiga, protokol notify-subscribe 
mensyaratkan inisialisasi manual satu kali melalui perintah /sethome pada 
WhatsApp untuk mengaktifkan pelacakan chat-id. Keempat, notifikasi push-based 
belum sepenuhnya didukung pada saluran TUI/CLI di luar gateway pesan. 
 
4.5 Evaluasi terhadap Rumusan Masalah 
Subbab ini menyajikan evaluasi akhir yang mengaitkan hasil implementasi 
dan pengujian pada bab ini dengan rumusan masalah yang diajukan pada BAB I, 
untuk menyimpulkan sejauh mana arsitektur orkestrasi multi -agen asinkron yang 
dirancang telah berhasil memun gkinkan agen orkestrator mendelegasikan tugas 
ke agen spesialis tanpa memblokir alur percakapan pengguna. Evaluasi dilakukan 
dengan memetakan tiga indikator keberhasilan non -blocking delegation, 
keandalan task broker, dan notifikasi proaktif terhadap bukti  empiris hasil 
pengujian. 
 
Tabel 4.6 Evaluasi Pencapaian Rumusan Masalah 
Tujuan Penelitian Status Bukti Empiris 
Delegasi tugas oleh 
orkestrator tidak memblokir 
alur percakapan pengguna 
(non-blocking) 
Tercapai Waktu respons orkestrator < 10 detik 
terukur pada Tabel 4.6; interaksi 
paralel saat tugas berjalan 
terverifikasi pada Skenario 3 (Tabel 
4.5) 
Task broker SQLite 
(kanban.db) mendukung 
pelacakan status tugas 
secara andal (ready, 
running, blocked, 
Tercapai Skema kanban.db terverifikasi pada 
Tabel 4.1; mesin status berjalan pada 
seluruh skenario pengujian (Tabel 
4.5); deteksi protocol violation 
berhasil pada Skenario 5 
42 
 
 
Tujuan Penelitian Status Bukti Empiris 
completed) beserta deteksi 
pelanggaran protokol 
Hasil tugas dikirimkan ke 
pengguna secara proaktif 
(push-based) tanpa 
memerlukan kueri balik 
Tercapai Notifikasi otomatis terkirim ke 
WhatsApp setelah kanban_complete 
dipanggil oleh pekerja; verifikasi entri 
tabel kanban_notify_subs sebelum 
dan sesudah eksekusi hermes 
kanban notify-subscribe 
 
Ketiga indikator tersebut menunjukkan bahwa arsitektur yang dirancang 
berhasil merealisasikan delegasi tugas non -blocking sebagaimana dirumuskan 
pada rumusan masalah. Indikator pertama membuktikan bahwa orkestrator dapat 
segera kembali melayani pengguna se telah mendelegasikan tugas, tanpa 
menunggu agen spesialis menyelesaikan eksekusinya. Indikator kedua 
membuktikan bahwa task broker berbasis SQLite mampu menjadi titik koordinasi 
yang andal antara orkestrator dan agen spesialis tanpa memerlukan komunikasi 
langsung sinkron di antara keduanya. Indikator ketiga melengkapi siklus delegasi 
asinkron dengan memastikan bahwa pengguna tetap menerima hasil akhir tugas 
meskipun tidak melakukan permintaan ulang. Secara keseluruhan, ketiga bukti 
empiris ini menunjukkan bahwa rumusan masalah penelitian telah terjawab melalui 
implementasi arsitektur tiga lapis orkestrator, task broker, dan agen spesialis yang 
saling terintegrasi dalam satu mekanisme delegasi asinkron yang konsisten. 
 
 
43 
 
BAB V 
PENUTUP 
 
5.1 Kesimpulan 
Berdasarkan hasil perancangan, implementasi, dan pengujian yang telah 
dilakukan terhadap sistem orkestrasi multi-agent asinkron berbasis Hermes 
Framework, dapat ditarik beberapa kesimpulan sebagai berikut. 
1. Sistem berhasil merealisasikan prinsip Centralized Asynchronous Isolated 
Delegation (CAID) melalui integrasi Orchestrator sebagai titik masuk 
tunggal, Task Broker  berbasis SQLite sebagai mekanisme koordinasi 
asinkron, serta profil agen terisolasi untuk eksekusi tugas yang bersifat 
spesifik. 
2. Sistem terbukti mampu mengatasi permasalahan blocking pada antarmuka 
pengguna. Hasil pengujian menunjukkan bahwa Orchestrator dapat 
memberikan respons konfirmasi delegasi dalam waktu kurang dari 10 detik, 
sehingga pengguna dapat melakukan interaksi secara paralel selama agen 
spesialis bekerja di latar belakang. 
3. Penggunaan SQLite (kanban.db) sebagai task broker terbukti efektif dalam 
mengelola siklus hidup tugas ( ready, running, blocked, failed, done) serta 
menyediakan jejak audit yang lengkap melalui tabel task_events dan 
task_runs. 
4. Mekanisme manajemen keterampilan ( skills) berbasis symbolic link  
berhasil meminimalkan penggunaan ruang penyimpanan hingga 
mendekati 0 byte untuk setiap keterampilan tambahan, sekaligus menjamin 
konsistensi pembaruan pada seluruh profil agen. 
5. Implementasi agent-specialist-builder memungkinkan sistem 
mengembangkan kapabilitasnya secara mandiri melalui pembuatan profil 
agen baru secara otomatis, mencakup penyusunan berkas SOUL.md 
hingga resolusi keterampilan pada tiga tingkat hierarki. 
 
5.2 Saran 
Meskipun tujuan penelitian telah tercapai, terdapat beberapa aspek yang 
dapat dikembangkan lebih lanjut guna meningkatkan performa dan skalabilitas 
sistem. 
44 
 
 
1. Migrasi ke sistem basis data terdistribusi atau message queue  seperti 
Redis atau PostgreSQL disarankan untuk mendukung skalabilitas 
horizontal dan penggunaan pada lingkungan multi-node, mengingat SQLite 
memiliki keterbatasan pada mekanisme single-writer. 
2. Penggunaan model Large Language Model  (LLM) pada free tier  
(Deepseek-v4-flash-free) cenderung mengalami pembatasan laju ( rate 
limit) sehingga peningkatan ke layanan berbayar atau enterprise tier perlu 
dipertimbangkan untuk mendukung throughput eksekusi tugas yang 
kompleks dan konkuren. 
3. Pengujian end-to-end yang lebih mendalam terhadap kinerja operasional 
agen-agen hasil pembuatan agent-specialist-builder perlu dilakukan pada 
pengembangan selanjutnya untuk memastikan keluaran yang dihasilkan 
memenuhi standar fungsional yang diharapkan. 
4. Protokol notifikasi berbasis push yang saat ini berfokus pada WhatsApp 
dapat diperluas ke saluran komunikasi lain seperti Telegram, Discord, atau 
aplikasi TUI/CLI internal guna meningkatkan fleksibilitas operasional 
sistem. 
5. Penelitian lebih lanjut mengenai teknik prompt compression atau dynamic 
skill loading yang lebih agresif perlu dilakukan agar agen dengan instruksi 
yang kompleks tetap dapat bekerja secara efisien dalam batasan konteks 
model LLM yang digunakan. 
 
 
 
45 
 
DAFTAR PUSTAKA 
 
[1] S. Yao et al., “ReAct: Synergizing Reasoning and Acting in Language Models,” 
Mar. 10, 2023, arXiv: arXiv:2210.03629. doi: 10.48550/arXiv.2210.03629. 
[2] J. He, C. Treude, and D. Lo, “LLM -Based Multi-Agent Systems for Software 
Engineering: Literature Review, Vision and the Road Ahead,” Jul. 18, 2025, 
arXiv: arXiv:2404.04834. doi: 10.48550/arXiv.2404.04834. 
[3] J. Yu, Y. Ding, and H. Sato, “DynTaskMAS: A Dynamic Task Graph -driven 
Framework for Asynchronous and Parallel LLM -based Multi-Agent Systems,” 
Proc. Int. Conf. Autom. Plan. Sched., vol. 35, no. 1, pp. 288 –296, Sep. 2025, 
doi: 10.1609/icaps.v35i1.36130. 
[4] H. Du, S. Thudumu, R. Vasa, and K. Mouzakis, “A Survey on Context -Aware 
Multi-Agent Systems: Techniques, Challenges and Future Directions,” Jan. 29, 
2025, arXiv: arXiv:2402.01968. doi: 10.48550/arXiv.2402.01968. 
[5] S. Han, Q. Zhang, W. Jin, and Z. Xu, “LLM Multi -Agent Systems: Challenges 
and Open Problems,” 2024, arXiv. doi: 10.48550/ARXIV.2402.03578. 
[6] H. P. Zou et al. , “LLM -Based Human -Agent Collaboration and Interaction 
Systems: A Survey,” May 06, 2026, arXiv: arXiv:2505.00753. doi: 
10.48550/arXiv.2505.00753. 
[7] Nous Research, “Hermes Agent Documentation | Hermes Agent,” Nous 
Research. Accessed: Jun. 06, 2026. [Online]. Available: https://hermes -
agent.nousresearch.com/docs/ 
[8] J. Geng and G. Neubig, “Effective Strategies for Asynchronous Software 
Engineering Agents,” Mar. 23, 2026, arXiv: arXiv:2603.21489. doi: 
10.48550/arXiv.2603.21489. 
[9] D. R. Hipp, “About SQLite,” SQLite. Accessed: Jun. 06, 2026. [Online]. 
Available: https://sqlite.org/about.html 
[10] J. A. E. Villanueva, L. V. M. Villanueva, M. S. Chawag, E. J. Pangan, E. F. 
Bayani, and J. R. D. Clemente, “A Systematic Literature Review of Workflow 
Efficiency in Software Development Through the Kanban Framework,” in 
Proceedings of the 2025 7th World Symposium on Software Engineering , in 
WSSE ’25. New York, NY, USA: Association for Computing Machinery, Apr. 
2026, pp. 55–60. doi: 10.1145/3779657.3779666. 
 
  
46 
 
 
Halaman ini sengaja dikosongkan
 
47 
 
Lampiran 1 Screenshot Percakapan WhatsApp 
  
  

48 
 
 
Lampiran 2 Screenshot WhatsApp Notifikasi Otomatis Hasil Task 
  
  

