const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const { dataOrderAndi, dataContactMessage, dataStore,
    dataWorker, dataItem, dataUser, dataOrderType, dataUserAddress } = require('./fillDatabase')

const prisma = new PrismaClient()
dotenv.config()
const profilePict = process.env.PROFILE_PICTURE
const hashPassword = async (password) => {
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
}

const dataCityByProvince = {
    "Aceh": [
        // Kabupaten (18)
        "Kabupaten Aceh Barat", "Kabupaten Aceh Barat Daya", "Kabupaten Aceh Besar",
        "Kabupaten Aceh Jaya", "Kabupaten Aceh Selatan", "Kabupaten Aceh Singkil",
        "Kabupaten Aceh Tamiang", "Kabupaten Aceh Tengah", "Kabupaten Aceh Tenggara",
        "Kabupaten Aceh Timur", "Kabupaten Aceh Utara", "Kabupaten Bener Meriah",
        "Kabupaten Bireuen", "Kabupaten Gayo Lues", "Kabupaten Nagan Raya",
        "Kabupaten Pidie", "Kabupaten Pidie Jaya", "Kabupaten Simeulue",
        // Kota (5)
        "Kota Banda Aceh", "Kota Langsa", "Kota Lhokseumawe", "Kota Sabang", "Kota Subulussalam"
    ],

    "Sumatera Utara": [
        // Kabupaten (25)
        "Kabupaten Asahan", "Kabupaten Batubara", "Kabupaten Dairi", "Kabupaten Deli Serdang",
        "Kabupaten Humbang Hasundutan", "Kabupaten Karo", "Kabupaten Labuhanbatu",
        "Kabupaten Labuhanbatu Selatan", "Kabupaten Labuhanbatu Utara", "Kabupaten Langkat",
        "Kabupaten Mandailing Natal", "Kabupaten Nias", "Kabupaten Nias Barat",
        "Kabupaten Nias Selatan", "Kabupaten Nias Utara", "Kabupaten Padang Lawas",
        "Kabupaten Padang Lawas Utara", "Kabupaten Pakpak Bharat", "Kabupaten Samosir",
        "Kabupaten Serdang Bedagai", "Kabupaten Simalungun", "Kabupaten Tapanuli Selatan",
        "Kabupaten Tapanuli Tengah", "Kabupaten Tapanuli Utara", "Kabupaten Toba",
        // Kota (8)
        "Kota Binjai", "Kota Gunungsitoli", "Kota Medan", "Kota Padang Sidempuan",
        "Kota Pematangsiantar", "Kota Sibolga", "Kota Tanjungbalai", "Kota Tebing Tinggi"
    ],

    "Sumatera Barat": [
        // Kabupaten (12)
        "Kabupaten Agam", "Kabupaten Dharmasraya", "Kabupaten Kepulauan Mentawai",
        "Kabupaten Lima Puluh Kota", "Kabupaten Padang Pariaman", "Kabupaten Pasaman",
        "Kabupaten Pasaman Barat", "Kabupaten Pesisir Selatan", "Kabupaten Sijunjung",
        "Kabupaten Solok", "Kabupaten Solok Selatan", "Kabupaten Tanah Datar",
        // Kota (7)
        "Kota Bukittinggi", "Kota Padang", "Kota Padangpanjang", "Kota Pariaman",
        "Kota Payakumbuh", "Kota Sawahlunto", "Kota Solok"
    ],

    "Riau": [
        // Kabupaten (10)
        "Kabupaten Bengkalis", "Kabupaten Indragiri Hilir", "Kabupaten Indragiri Hulu",
        "Kabupaten Kampar", "Kabupaten Kepulauan Meranti", "Kabupaten Kuantan Singingi",
        "Kabupaten Pelalawan", "Kabupaten Rokan Hilir", "Kabupaten Rokan Hulu", "Kabupaten Siak",
        // Kota (2)
        "Kota Dumai", "Kota Pekanbaru"
    ],

    "Jambi": [
        // Kabupaten (9)
        "Kabupaten Batanghari", "Kabupaten Bungo", "Kabupaten Kerinci", "Kabupaten Merangin",
        "Kabupaten Muaro Jambi", "Kabupaten Sarolangun", "Kabupaten Tanjung Jabung Barat",
        "Kabupaten Tanjung Jabung Timur", "Kabupaten Tebo",
        // Kota (2)
        "Kota Jambi", "Kota Sungai Penuh"
    ],

    "Sumatera Selatan": [
        // Kabupaten (13)
        "Kabupaten Banyuasin", "Kabupaten Empat Lawang", "Kabupaten Lahat", "Kabupaten Muara Enim",
        "Kabupaten Musi Banyuasin", "Kabupaten Musi Rawas", "Kabupaten Musi Rawas Utara",
        "Kabupaten Ogan Ilir", "Kabupaten Ogan Komering Ilir", "Kabupaten Ogan Komering Ulu",
        "Kabupaten Ogan Komering Ulu Selatan", "Kabupaten Ogan Komering Ulu Timur", "Kabupaten Penukal Abab Lematang Ilir",
        // Kota (4)
        "Kota Lubuklinggau", "Kota Pagar Alam", "Kota Palembang", "Kota Prabumulih"
    ],

    "Bengkulu": [
        // Kabupaten (9)
        "Kabupaten Bengkulu Selatan", "Kabupaten Bengkulu Tengah", "Kabupaten Bengkulu Utara",
        "Kabupaten Kaur", "Kabupaten Kepahiang", "Kabupaten Lebong", "Kabupaten Mukomuko",
        "Kabupaten Rejang Lebong", "Kabupaten Seluma",
        // Kota (1)
        "Kota Bengkulu"
    ],

    "Lampung": [
        // Kabupaten (13)
        "Kabupaten Lampung Barat", "Kabupaten Lampung Selatan", "Kabupaten Lampung Tengah",
        "Kabupaten Lampung Timur", "Kabupaten Lampung Utara", "Kabupaten Mesuji",
        "Kabupaten Pesawaran", "Kabupaten Pesisir Barat", "Kabupaten Pringsewu",
        "Kabupaten Tanggamus", "Kabupaten Tulang Bawang", "Kabupaten Tulang Bawang Barat", "Kabupaten Way Kanan",
        // Kota (2)
        "Kota Bandar Lampung", "Kota Metro"
    ],

    "Kepulauan Bangka Belitung": [
        // Kabupaten (6)
        "Kabupaten Bangka", "Kabupaten Bangka Barat", "Kabupaten Bangka Selatan",
        "Kabupaten Bangka Tengah", "Kabupaten Belitung", "Kabupaten Belitung Timur",
        // Kota (1)
        "Kota Pangkalpinang"
    ],

    "Kepulauan Riau": [
        // Kabupaten (5)
        "Kabupaten Bintan", "Kabupaten Karimun", "Kabupaten Kepulauan Anambas",
        "Kabupaten Lingga", "Kabupaten Natuna",
        // Kota (2)
        "Kota Batam", "Kota Tanjungpinang"
    ],

    "DKI Jakarta": [
        // Kabupaten Administrasi (1)
        "Kabupaten Administrasi Kepulauan Seribu",
        // Kota Administrasi (5)
        "Kota Administrasi Jakarta Barat", "Kota Administrasi Jakarta Pusat",
        "Kota Administrasi Jakarta Selatan", "Kota Administrasi Jakarta Timur", "Kota Administrasi Jakarta Utara"
    ],

    "Jawa Barat": [
        // Kabupaten (18)
        "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kabupaten Bekasi", "Kabupaten Bogor",
        "Kabupaten Ciamis", "Kabupaten Cianjur", "Kabupaten Cirebon", "Kabupaten Garut",
        "Kabupaten Indramayu", "Kabupaten Karawang", "Kabupaten Kuningan", "Kabupaten Majalengka",
        "Kabupaten Pangandaran", "Kabupaten Purwakarta", "Kabupaten Subang", "Kabupaten Sukabumi",
        "Kabupaten Sumedang", "Kabupaten Tasikmalaya",
        // Kota (9)
        "Kota Bandung", "Kota Banjar", "Kota Bekasi", "Kota Bogor", "Kota Cimahi",
        "Kota Cirebon", "Kota Depok", "Kota Sukabumi", "Kota Tasikmalaya"
    ],

    "Jawa Tengah": [
        // Kabupaten (29)
        "Kabupaten Banjarnegara", "Kabupaten Banyumas", "Kabupaten Batang", "Kabupaten Blora",
        "Kabupaten Boyolali", "Kabupaten Brebes", "Kabupaten Cilacap", "Kabupaten Demak",
        "Kabupaten Grobogan", "Kabupaten Jepara", "Kabupaten Karanganyar", "Kabupaten Kebumen",
        "Kabupaten Kendal", "Kabupaten Klaten", "Kabupaten Kudus", "Kabupaten Magelang",
        "Kabupaten Pati", "Kabupaten Pekalongan", "Kabupaten Pemalang", "Kabupaten Purbalingga",
        "Kabupaten Purworejo", "Kabupaten Rembang", "Kabupaten Semarang", "Kabupaten Sragen",
        "Kabupaten Sukoharjo", "Kabupaten Tegal", "Kabupaten Temanggung", "Kabupaten Wonogiri", "Kabupaten Wonosobo",
        // Kota (6)
        "Kota Magelang", "Kota Pekalongan", "Kota Salatiga", "Kota Semarang", "Kota Surakarta", "Kota Tegal"
    ],

    "DI Yogyakarta": [
        // Kabupaten (4)
        "Kabupaten Bantul", "Kabupaten Gunungkidul", "Kabupaten Kulon Progo", "Kabupaten Sleman",
        // Kota (1)
        "Kota Yogyakarta"
    ],

    "Jawa Timur": [
        // Kabupaten (29)
        "Kabupaten Bangkalan", "Kabupaten Banyuwangi", "Kabupaten Blitar", "Kabupaten Bojonegoro",
        "Kabupaten Bondowoso", "Kabupaten Gresik", "Kabupaten Jember", "Kabupaten Jombang",
        "Kabupaten Kediri", "Kabupaten Lamongan", "Kabupaten Lumajang", "Kabupaten Madiun",
        "Kabupaten Magetan", "Kabupaten Malang", "Kabupaten Mojokerto", "Kabupaten Nganjuk",
        "Kabupaten Ngawi", "Kabupaten Pacitan", "Kabupaten Pamekasan", "Kabupaten Pasuruan",
        "Kabupaten Ponorogo", "Kabupaten Probolinggo", "Kabupaten Sampang", "Kabupaten Sidoarjo",
        "Kabupaten Situbondo", "Kabupaten Sumenep", "Kabupaten Trenggalek", "Kabupaten Tuban", "Kabupaten Tulungagung",
        // Kota (9)
        "Kota Batu", "Kota Blitar", "Kota Kediri", "Kota Madiun", "Kota Malang",
        "Kota Mojokerto", "Kota Pasuruan", "Kota Probolinggo", "Kota Surabaya"
    ],

    "Banten": [
        // Kabupaten (4)
        "Kabupaten Lebak", "Kabupaten Pandeglang", "Kabupaten Serang", "Kabupaten Tangerang",
        // Kota (4)
        "Kota Cilegon", "Kota Serang", "Kota Tangerang", "Kota Tangerang Selatan"
    ],

    "Bali": [
        // Kabupaten (8)
        "Kabupaten Badung", "Kabupaten Bangli", "Kabupaten Buleleng", "Kabupaten Gianyar",
        "Kabupaten Jembrana", "Kabupaten Karangasem", "Kabupaten Klungkung", "Kabupaten Tabanan",
        // Kota (1)
        "Kota Denpasar"
    ],

    "Nusa Tenggara Barat": [
        // Kabupaten (8)
        "Kabupaten Bima", "Kabupaten Dompu", "Kabupaten Lombok Barat", "Kabupaten Lombok Tengah",
        "Kabupaten Lombok Timur", "Kabupaten Lombok Utara", "Kabupaten Sumbawa", "Kabupaten Sumbawa Barat",
        // Kota (2)
        "Kota Bima", "Kota Mataram"
    ],

    "Nusa Tenggara Timur": [
        // Kabupaten (21)
        "Kabupaten Alor", "Kabupaten Belu", "Kabupaten Ende", "Kabupaten Flores Timur",
        "Kabupaten Kupang", "Kabupaten Lembata", "Kabupaten Manggarai", "Kabupaten Manggarai Barat",
        "Kabupaten Manggarai Timur", "Kabupaten Nagekeo", "Kabupaten Ngada", "Kabupaten Rote Ndao",
        "Kabupaten Sabu Raijua", "Kabupaten Sikka", "Kabupaten Sumba Barat", "Kabupaten Sumba Barat Daya",
        "Kabupaten Sumba Tengah", "Kabupaten Sumba Timur", "Kabupaten Timor Tengah Selatan",
        "Kabupaten Timor Tengah Utara", "Kabupaten Malaka",
        // Kota (1)
        "Kota Kupang"
    ],

    "Kalimantan Barat": [
        // Kabupaten (12)
        "Kabupaten Bengkayang", "Kabupaten Kapuas Hulu", "Kabupaten Kayong Utara", "Kabupaten Ketapang",
        "Kabupaten Kubu Raya", "Kabupaten Landak", "Kabupaten Melawi", "Kabupaten Mempawah",
        "Kabupaten Sambas", "Kabupaten Sanggau", "Kabupaten Sekadau", "Kabupaten Sintang",
        // Kota (2)
        "Kota Pontianak", "Kota Singkawang"
    ],

    "Kalimantan Tengah": [
        // Kabupaten (13)
        "Kabupaten Barito Selatan", "Kabupaten Barito Timur", "Kabupaten Barito Utara",
        "Kabupaten Gunung Mas", "Kabupaten Kapuas", "Kabupaten Katingan", "Kabupaten Kotawaringin Barat",
        "Kabupaten Kotawaringin Timur", "Kabupaten Lamandau", "Kabupaten Murung Raya",
        "Kabupaten Pulang Pisau", "Kabupaten Seruyan", "Kabupaten Sukamara",
        // Kota (1)
        "Kota Palangka Raya"
    ],

    "Kalimantan Selatan": [
        // Kabupaten (11)
        "Kabupaten Balangan", "Kabupaten Banjar", "Kabupaten Barito Kuala", "Kabupaten Hulu Sungai Selatan",
        "Kabupaten Hulu Sungai Tengah", "Kabupaten Hulu Sungai Utara", "Kabupaten Kotabaru",
        "Kabupaten Tabalong", "Kabupaten Tanah Bumbu", "Kabupaten Tanah Laut", "Kabupaten Tapin",
        // Kota (2)
        "Kota Banjarbaru", "Kota Banjarmasin"
    ],

    "Kalimantan Timur": [
        // Kabupaten (7)
        "Kabupaten Berau", "Kabupaten Kutai Barat", "Kabupaten Kutai Kartanegara", "Kabupaten Kutai Timur",
        "Kabupaten Mahakam Ulu", "Kabupaten Paser", "Kabupaten Penajam Paser Utara",
        // Kota (3)
        "Kota Balikpapan", "Kota Bontang", "Kota Samarinda"
    ],

    "Kalimantan Utara": [
        // Kabupaten (4)
        "Kabupaten Bulungan", "Kabupaten Malinau", "Kabupaten Nunukan", "Kabupaten Tana Tidung",
        // Kota (1)
        "Kota Tarakan"
    ],

    "Sulawesi Utara": [
        // Kabupaten (11)
        "Kabupaten Bolaang Mongondow", "Kabupaten Bolaang Mongondow Selatan", "Kabupaten Bolaang Mongondow Timur",
        "Kabupaten Bolaang Mongondow Utara", "Kabupaten Kepulauan Sangihe", "Kabupaten Kepulauan Siau Tagulandang Biaro",
        "Kabupaten Kepulauan Talaud", "Kabupaten Minahasa", "Kabupaten Minahasa Selatan",
        "Kabupaten Minahasa Tenggara", "Kabupaten Minahasa Utara",
        // Kota (4)
        "Kota Bitung", "Kota Kotamobagu", "Kota Manado", "Kota Tomohon"
    ],

    "Sulawesi Tengah": [
        // Kabupaten (12)
        "Kabupaten Banggai", "Kabupaten Banggai Kepulauan", "Kabupaten Banggai Laut", "Kabupaten Buol",
        "Kabupaten Donggala", "Kabupaten Morowali", "Kabupaten Morowali Utara", "Kabupaten Parigi Moutong",
        "Kabupaten Poso", "Kabupaten Sigi", "Kabupaten Tojo Una-Una", "Kabupaten Tolitoli",
        // Kota (1)
        "Kota Palu"
    ],

    "Sulawesi Selatan": [
        // Kabupaten (21)
        "Kabupaten Bantaeng", "Kabupaten Barru", "Kabupaten Bone", "Kabupaten Bulukumba",
        "Kabupaten Enrekang", "Kabupaten Gowa", "Kabupaten Jeneponto", "Kabupaten Kepulauan Selayar",
        "Kabupaten Luwu", "Kabupaten Luwu Timur", "Kabupaten Luwu Utara", "Kabupaten Maros",
        "Kabupaten Pangkajene dan Kepulauan", "Kabupaten Pinrang", "Kabupaten Sidenreng Rappang",
        "Kabupaten Sinjai", "Kabupaten Soppeng", "Kabupaten Takalar", "Kabupaten Tana Toraja",
        "Kabupaten Toraja Utara", "Kabupaten Wajo",
        // Kota (3)
        "Kota Makassar", "Kota Palopo", "Kota Parepare"
    ],

    "Sulawesi Tenggara": [
        // Kabupaten (15)
        "Kabupaten Bombana", "Kabupaten Buton", "Kabupaten Buton Selatan", "Kabupaten Buton Tengah",
        "Kabupaten Buton Utara", "Kabupaten Kolaka", "Kabupaten Kolaka Timur", "Kabupaten Kolaka Utara",
        "Kabupaten Konawe", "Kabupaten Konawe Kepulauan", "Kabupaten Konawe Selatan", "Kabupaten Konawe Utara",
        "Kabupaten Muna", "Kabupaten Muna Barat", "Kabupaten Wakatobi",
        // Kota (2)
        "Kota Bau-Bau", "Kota Kendari"
    ],

    "Gorontalo": [
        // Kabupaten (5)
        "Kabupaten Boalemo", "Kabupaten Bone Bolango", "Kabupaten Gorontalo", "Kabupaten Gorontalo Utara", "Kabupaten Pohuwato",
        // Kota (1)
        "Kota Gorontalo"
    ],

    "Sulawesi Barat": [
        // Kabupaten (6)
        "Kabupaten Majene", "Kabupaten Mamasa", "Kabupaten Mamuju", "Kabupaten Mamuju Tengah", "Kabupaten Mamuju Utara", "Kabupaten Polewali Mandar"
    ],

    "Maluku": [
        // Kabupaten (9)
        "Kabupaten Buru", "Kabupaten Buru Selatan", "Kabupaten Kepulauan Aru", "Kabupaten Maluku Barat Daya",
        "Kabupaten Maluku Tengah", "Kabupaten Maluku Tenggara", "Kabupaten Maluku Tenggara Barat",
        "Kabupaten Seram Bagian Barat", "Kabupaten Seram Bagian Timur",
        // Kota (2)
        "Kota Ambon", "Kota Tual"
    ],

    "Maluku Utara": [
        // Kabupaten (8)
        "Kabupaten Halmahera Barat", "Kabupaten Halmahera Selatan", "Kabupaten Halmahera Tengah",
        "Kabupaten Halmahera Timur", "Kabupaten Halmahera Utara", "Kabupaten Kepulauan Sula",
        "Kabupaten Pulau Morotai", "Kabupaten Pulau Taliabu",
        // Kota (2)
        "Kota Ternate", "Kota Tidore Kepulauan"
    ],

    "Papua Barat": [
        // Kabupaten (7)
        "Kabupaten Fakfak", "Kabupaten Kaimana", "Kabupaten Manokwari", "Kabupaten Manokwari Selatan",
        "Kabupaten Pegunungan Arfak", "Kabupaten Raja Ampat", "Kabupaten Teluk Bintuni"
    ],

    "Papua": [
        // Kabupaten (8)
        "Kabupaten Biak Numfor", "Kabupaten Jayapura", "Kabupaten Keerom", "Kabupaten Kepulauan Yapen",
        "Kabupaten Mamberamo Raya", "Kabupaten Sarmi", "Kabupaten Supiori", "Kabupaten Waropen",
        // Kota (1)
        "Kota Jayapura"
    ],

    "Papua Selatan": [
        // Kabupaten (4)
        "Kabupaten Asmat", "Kabupaten Boven Digoel", "Kabupaten Mappi", "Kabupaten Merauke"
    ],

    "Papua Tengah": [
        // Kabupaten (8)
        "Kabupaten Deiyai", "Kabupaten Dogiyai", "Kabupaten Intan Jaya", "Kabupaten Mimika",
        "Kabupaten Nabire", "Kabupaten Paniai", "Kabupaten Puncak", "Kabupaten Puncak Jaya"
    ],

    "Papua Pegunungan": [
        // Kabupaten (8)
        "Kabupaten Jayawijaya", "Kabupaten Lanny Jaya", "Kabupaten Mamberamo Tengah", "Kabupaten Nduga",
        "Kabupaten Pegunungan Bintang", "Kabupaten Tolikara", "Kabupaten Yahukimo", "Kabupaten Yalimo"
    ],

    "Papua Barat Daya": [
        // Kabupaten (5)
        "Kabupaten Maybrat", "Kabupaten Sorong", "Kabupaten Sorong Selatan", "Kabupaten Tambrauw", "Kabupaten Teluk Wondama",
        // Kota (1)
        "Kota Sorong"
    ]
}

const dataProvince = [
    { name: "Aceh" },
    { name: "Sumatera Utara" },
    { name: "Sumatera Barat" },
    { name: "Riau" },
    { name: "Jambi" },
    { name: "Sumatera Selatan" },
    { name: "Bengkulu" },
    { name: "Lampung" },
    { name: "Kepulauan Bangka Belitung" },
    { name: "Kepulauan Riau" },
    { name: "DKI Jakarta" },
    { name: "Jawa Barat" },
    { name: "Jawa Tengah" },
    { name: "DI Yogyakarta" },
    { name: "Jawa Timur" },
    { name: "Banten" },
    { name: "Bali" },
    { name: "Nusa Tenggara Barat" },
    { name: "Nusa Tenggara Timur" },
    { name: "Kalimantan Barat" },
    { name: "Kalimantan Tengah" },
    { name: "Kalimantan Selatan" },
    { name: "Kalimantan Timur" },
    { name: "Kalimantan Utara" },
    { name: "Sulawesi Utara" },
    { name: "Sulawesi Tengah" },
    { name: "Sulawesi Selatan" },
    { name: "Sulawesi Tenggara" },
    { name: "Gorontalo" },
    { name: "Sulawesi Barat" },
    { name: "Maluku" },
    { name: "Maluku Utara" },
    { name: "Papua Barat" },
    { name: "Papua" }
];

async function seedProvince() {
    try {
        console.log("Seeding provinces...")
        await prisma.province.createMany({
            data: dataProvince,
            skipDuplicates: true,
        });

        console.log("Provinces seeded successfully.");
    } catch (error) {
        console.error("Error seeding province data:", error);
        throw error;
    }
}

async function seedCity() {
    try {
        console.log("🏙️ Starting to seed cities...");

        // Get all provinces to map city data
        const provinces = await prisma.province.findMany();
        console.log(`📍 Found ${provinces.length} provinces in database`);

        // Prepare city data with provinceId
        const cityData = [];

        for (const province of provinces) {
            const cities = dataCityByProvince[province.name];
            if (cities && cities.length > 0) {
                cities.forEach(cityName => {
                    cityData.push({
                        name: cityName,
                        provinceId: province.id
                    });
                });
                console.log(`📋 Prepared ${cities.length} cities for ${province.name}`);
            }
        }

        console.log(`🎯 Total cities to seed: ${cityData.length}`);

        // Seed cities in batches to avoid memory issues
        const batchSize = 100;
        const totalBatches = Math.ceil(cityData.length / batchSize);

        for (let i = 0; i < cityData.length; i += batchSize) {
            const batch = cityData.slice(i, i + batchSize);
            await prisma.city.createMany({
                data: batch,
                skipDuplicates: true,
            });
            const currentBatch = Math.floor(i / batchSize) + 1;
            console.log(`⚡ Seeded cities batch ${currentBatch}/${totalBatches} (${batch.length} cities)`);
        }

        console.log(`✅ Cities seeded successfully! Total: ${cityData.length} cities`);
    } catch (error) {
        console.error("❌ Error seeding city data:", error);
        throw error;
    }
}

async function main() {
    try {
        await seedProvince()
        await seedCity()
        
        await prisma.store.createMany({
            data: dataStore.map((store) => ({
                id: String(store.id),
                storeName: store.storeName,
                address: store.address,
                city: store.city,
                province: store.province,
                country: store.country,
                zipCode: store.zipCode,
                latitude: store.latitude,
                longitude: store.longitude,
            })),
            skipDuplicates: true,
        })

        await prisma.shift.createMany({
            data: [
                { startTime: new Date('2024-12-24T08:00:00Z'), endTime: new Date('2024-12-24T16:00:00Z') },
                { startTime: new Date('2024-12-24T16:00:00Z'), endTime: new Date('2024-12-24T23:59:59Z') }
            ]
        })

        const hashedPassword = await hashPassword("12312312");

        const findShift = await prisma.shift.findMany()
        if (findShift?.length > 0) {
            await prisma.worker.createMany({
                data: dataWorker.map((worker) => ({
                    email: worker.email,
                    password: hashedPassword,
                    workerRole: worker.workerRole,
                    firstName: worker.firstName,
                    lastName: worker.lastName,
                    phoneNumber: worker.phoneNumber,
                    profilePicture: worker.profilePicture,
                    identityNumber: worker.identityNumber,
                    motorcycleType: worker.motorcycleType || null,
                    plateNumber: worker.plateNumber || null,
                    storeId: String(worker.storeId),
                    shiftId: Number(worker?.shiftId)
                })),
                skipDuplicates: true,
            });
        }

        const userPromises = dataUser.map(async (user) => {
            return prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    email: user.email,
                    role: 'CUSTOMER',
                    password: hashedPassword,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    profilePicture: user.profilePicture,
                    isVerified: user.isVerified,
                    verifyCode: user.verifyCode,
                    isGoogleRegister: user.isGoogleRegister,
                    forgotPasswordToken: user.forgotPasswordToken,
                    isDiscountUsed: user.isDiscountUsed,
                    isGooglePasswordChange: user.isGooglePasswordChange
                },
            });
        });

        const createdUsers = await Promise.all(userPromises);
        const firstUserId = createdUsers[0].id;
        const userAddresses = dataUserAddress.map((address) => ({ ...address, userId: firstUserId }));

        await prisma.userAddress.createMany({
            data: userAddresses,
            skipDuplicates: true,
        });

        await prisma.laundryItem.createMany({
            data: dataItem.map((item) => ({
                itemName: item.itemName,
            })),
            skipDuplicates: true,
        });

        await prisma.orderType.createMany({
            data: dataOrderType.map((item) => ({
                type: item.type,
                price: item.price,
            })),
            skipDuplicates: true,
        });

        const dateNow = Date.now() * Math.random()
        const id = `CUST${Math.floor(dateNow)}ANDI`
        const findStore = await prisma.store.findFirst({ where: { id: '1' } })

        if (findStore) {
            await prisma.user.create({
                data: {
                    id,
                    email: "kickandi@cnc.com",
                    firstName: "Andi",
                    lastName: "Kick",
                    phoneNumber: "082308124081",
                    profilePicture: profilePict,
                    role: "CUSTOMER",
                    isVerified: true,
                    verifyCode: "701274",
                    isGoogleRegister: false,
                    password: hashedPassword,
                    userAddress: {
                        create: [
                            {
                                id: 10,
                                addressName: "Rumah",
                                addressDetail: "Jln. Haji Kurun No. 14",
                                city: "Bogor",
                                province: "Jawa Barat",
                                country: "Indonesia",
                                zipCode: "141250",
                                latitude: -6.23348808466673,
                                longitude: 106.6331260189041,
                                isMain: true,
                            },
                        ],
                    },
                    contact: {
                        create: dataContactMessage,
                    },
                    order: {
                        create: dataOrderAndi,
                    },
                },
            })
        }

        console.log("Data seeded successfully.")

    } catch (error) { }
}

main()
    .catch((error) => {
        console.error("Error seeding data:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });