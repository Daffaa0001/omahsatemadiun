import { useState, useEffect } from "react";

const heroImg = "https://images.unsplash.com/photo-1636301175218-6994458a4b0a?w=1800&h=1000&fit=crop&auto=format";
const WHATSAPP_NUMBER = "6281230328485";

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type MenuItem = { id: number; name: string; desc: string; price: string; img: string; badge: string | null; };
type MenuCategory = { label: string; emoji: string; items: MenuItem[] };

const menuCategories: MenuCategory[] = [
  {
    label: "Makanan",
    emoji: "🍖",
    items: [
      { id: 1,  name: "Sate Kambing",  desc: "Tusukan daging kambing muda pilihan, dibakar di atas bara arang kelapa, disajikan dengan sambal kecap spesial.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&h=400&fit=crop&auto=format", badge: "Terlaris" },
      { id: 2,  name: "Gulai",         desc: "Kuah gulai pekat berbumbu kunyit & santan kental, daging kambing empuk hingga ke tulang.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1708782340377-882559d544fb?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 3,  name: "Balungan",      desc: "Tulang kambing bertekstur gurih, dimasak berbumbu rempah Jawa hingga meresap sempurna.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1550367363-ea12860cc124?w=600&h=400&fit=crop&auto=format", badge: "Khas Jawa" },
      { id: 4,  name: "Tongseng",      desc: "Perpaduan kari & sayuran segar dengan aroma kecap manis dan sedikit pedas yang menggugah selera.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1658372873359-91a8227f4f44?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 5,  name: "Nasi Putih",    desc: "Nasi putih pulen hangat, cocok sebagai pendamping semua menu.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 6,  name: "Nasi Gulai",    desc: "Nasi yang disiram kuah gulai kambing kental, gurih dan mengenyangkan.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1578704311488-bce5feb2780b?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 7,  name: "Soto Ayam",     desc: "Soto kuah bening khas Jawa dengan ayam suwir, telur, dan rempah segar.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1677029969063-23ecbb98d0af?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 8,  name: "Rujak Buah",    desc: "Aneka buah segar dengan bumbu rujak pedas-manis khas Jawa sebagai penutup segar.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1689031831628-a3c200fb1768?w=600&h=400&fit=crop&auto=format", badge: null },
    ],
  },
  {
    label: "Minuman",
    emoji: "🥤",
    items: [
      { id: 9,  name: "Teh (Es/Hangat)",      desc: "Teh manis segar pilihan — nikmati dingin dengan es atau hangat menenangkan.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1777993623617-abc6adebea40?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 10, name: "Jeruk (Es/Hangat)",     desc: "Perasan jeruk segar alami, pilihan es atau hangat sesuai selera.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 11, name: "Es Tebu",               desc: "Air tebu segar diperas langsung, manis alami dan menyegarkan.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1676976198567-454aac912a69?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 12, name: "Es Degan",              desc: "Air kelapa muda segar dengan potongan daging kelapa pilihan.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1617611140379-0e0ec17cc45f?w=600&h=400&fit=crop&auto=format", badge: null },
      { id: 13, name: "Degan Utuh",            desc: "Kelapa muda utuh langsung disajikan, air segar dan daging kelapa lembut.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1638517307486-4c2ae5c45764?w=600&h=400&fit=crop&auto=format", badge: "Favorit" },
      { id: 14, name: "Temulawak Hangat",      desc: "Minuman herbal tradisional Jawa, hangat dan menyehatkan tubuh.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1610450622827-195cb7308af8?w=600&h=400&fit=crop&auto=format", badge: "Herbal" },
      { id: 15, name: "Kopi Jawa",             desc: "Kopi tubruk tradisional Jawa, kental, harum, dan otentik.", price: "Hubungi kami", img: "https://images.unsplash.com/photo-1669872484166-e11b9638b50e?w=600&h=400&fit=crop&auto=format", badge: null },
    ],
  },
  {
    label: "Paket Hemat",
    emoji: "🎁",
    items: [
      { id: 16, name: "Paket 20K", desc: "Sate Kambing 4 Tusuk + Nasi Gulai + Teh. Paket hemat spesial paling favorit pelanggan!", price: "Rp 20.000", img: "https://images.unsplash.com/photo-1703946908870-200ef3067952?w=600&h=400&fit=crop&auto=format", badge: "Terfavorit" },
    ],
  },
];

const menuItems = menuCategories.flatMap((c) => c.items);

const galleryImgs = [
  { url: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&h=500&fit=crop&auto=format", alt: "Sate Kambing" },
  { url: "https://images.unsplash.com/photo-1708782340377-882559d544fb?w=600&h=500&fit=crop&auto=format", alt: "Gulai Kambing" },
  { url: "https://images.unsplash.com/photo-1550367363-ea12860cc124?w=600&h=500&fit=crop&auto=format", alt: "Balungan Kambing" },
  { url: "https://images.unsplash.com/photo-1658372873359-91a8227f4f44?w=600&h=500&fit=crop&auto=format", alt: "Tongseng Kambing" },
  { url: "https://images.unsplash.com/photo-1677029969063-23ecbb98d0af?w=600&h=500&fit=crop&auto=format", alt: "Soto Ayam" },
  { url: "https://images.unsplash.com/photo-1703946908870-200ef3067952?w=600&h=500&fit=crop&auto=format", alt: "Paket 20K — Sate + Nasi Gulai + Teh" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [cart, setCart] = useState<{ id: number; qty: number }[]>(
    menuItems.map((m) => ({ id: m.id, qty: 0 }))
  );
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["beranda", "tentang", "menu", "pesan", "galeri", "kontak"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
    );
  };

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);

  const buildOrderMessage = () => {
    const hasItems = cart.some((c) => c.qty > 0);
    if (!hasItems) return null;

    const categoryLines = menuCategories
      .map((cat) => {
        const catItems = cat.items
          .filter((item) => (cart.find((c) => c.id === item.id)?.qty ?? 0) > 0)
          .map((item) => {
            const qty = cart.find((c) => c.id === item.id)?.qty ?? 0;
            return `  • ${item.name} × ${qty}`;
          });
        if (!catItems.length) return null;
        return `${cat.emoji} *${cat.label}*\n${catItems.join("\n")}`;
      })
      .filter(Boolean)
      .join("\n\n");

    return (
      `Assalamualaikum, Omah Sate Kota Madiun! 🐑🔥\n` +
      `Saya ingin melakukan pemesanan berikut:\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🛒 *PESANAN*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `${categoryLines}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 *DATA PEMESAN*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Nama    : ${form.name || "-"}\n` +
      `📱 No. HP  : ${form.phone || "-"}\n` +
      `📝 Catatan : ${form.note || "-"}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Mohon konfirmasi ketersediaan menu dan total pembayarannya. Terima kasih! 🙏`
    );
  };

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "menu", label: "Menu" },
    { id: "pesan", label: "Pesan" },
    { id: "galeri", label: "Galeri" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0a04] text-[#f5ead8] font-sans selection:bg-amber-600 selection:text-black">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f0a04]/95 border-b border-[#2e200a] backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo & Text */}
          <button onClick={() => scrollTo("beranda")} className="flex items-center gap-3 text-left group">
            {/* Logo SVG Simpel */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="38" height="38" className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <rect x="5" y="5" width="90" height="90" rx="16" fill="#1e1507" stroke="#d97706" strokeWidth="2" />
              <line x1="50" y1="18" x2="50" y2="82" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="35" r="10" fill="none" stroke="#f5ead8" strokeWidth="2.5" />
              <path d="M38 58 C38 50, 62 50, 62 66 C62 74, 38 74, 38 66" fill="none" stroke="#f5ead8" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold text-amber-500 group-hover:text-amber-400 transition-colors leading-tight">
                Omah Sate
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#f5ead8]/80">
                Kota Madiun
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`nav-link text-sm font-medium ${
                  activeSection === l.id ? "text-amber-500" : "text-[#f5ead8]"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("pesan")} className="btn-amber text-sm py-2 px-5">
              Pesan Sekarang
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            aria-label="Menu"
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-[#1e1507] border border-[#2e200a]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-amber-500 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-amber-500 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-amber-500 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f0a04]/98 border-b border-[#2e200a] px-6 py-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl animate-fadeIn">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left text-base font-medium nav-link py-1"
                style={{ color: activeSection === l.id ? "#d97706" : "#f5ead8" }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("pesan")}
              className="btn-amber w-full justify-center mt-2"
            >
              Pesan Sekarang
            </button>
          </div>
        )}
      </nav>

      {/* BERANDA */}
      <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Sate Kambing Omah Sate"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a04] via-[#0f0a04]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a04] via-transparent to-[#0f0a04]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <span className="section-label inline-block mb-4 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded">
              Kuliner Legendaris Madiun
            </span>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
              Cita Rasa <span className="italic text-amber-500">Sate Kambing</span> Otentik
            </h1>
            <p className="text-base sm:text-lg text-[#c4a882] leading-relaxed mb-8 max-w-lg">
              Nikmati kelezatan sate kambing muda, gulai kental, dan aneka menu pilihan di <strong className="text-[#f5ead8]">Omah Sate</strong>. Buka setiap hari pukul 10.00 hingga 15.00 WIB.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("pesan")} className="btn-amber text-sm sm:text-base">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan via WhatsApp
              </button>
              <button
                onClick={() => scrollTo("menu")}
                className="text-sm sm:text-base font-medium px-8 py-3 border border-[#f5ead8]/30 hover:border-amber-500 rounded text-[#f5ead8] transition-all hover:bg-white/5"
              >
                Lihat Menu
              </button>
            </div>

            {/* Jam Info Badge */}
            <div className="mt-10 inline-flex items-center gap-3 px-4 py-2.5 bg-[#1e1507]/80 border border-[#2e200a] rounded-lg backdrop-blur">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs sm:text-sm text-[#f5ead8]">Jam Buka: <strong className="text-amber-500">10.00 – 15.00 WIB</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="py-24 bg-[#0f0a04] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-lg border border-[#2e200a] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1636301175138-08aba8191957?w=700&h=900&fit=crop&auto=format"
                  alt="Proses pembakaran sate"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 text-center bg-amber-600 rounded-lg shadow-xl text-black">
                <p className="font-display text-3xl font-bold">100%</p>
                <p className="text-xs font-semibold mt-1 uppercase tracking-wider">Kambing Muda</p>
              </div>
            </div>

            <div>
              <span className="section-label mb-3 inline-block">Tentang Kami</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Lezatnya Sate Kambing di <span className="italic text-amber-500">Jl. Terate Madiun</span>
              </h2>
              <p className="text-[#a08060] text-sm sm:text-base leading-relaxed mb-4">
                Berlokasi strategis di <strong className="text-[#f5ead8]">Jl. Terate RT. 18, Banjarejo, Kota Madiun</strong>, kami menyajikan olahan daging kambing pilihan berkualitas tinggi, empuk, dan sama sekali tidak berbau prengus.
              </p>
              <p className="text-[#a08060] text-sm sm:text-base leading-relaxed mb-8">
                Setiap porsi dimasak dengan rempah-rempah pilihan khas tradisional Nusantara. Kunjungi warung kami setiap hari pukul 10.00 hingga 15.00 WIB atau pesan langsung secara online melalui WhatsApp.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Daging Pilihan", desc: "Kambing muda berkualitas terbaik" },
                  { title: "Bumbu Meresap", desc: "Rempah tradisional gurih otentik" },
                  { title: "Lokasi Nyaman", desc: "Mudah dijangkau di Banjarejo Madiun" },
                  { title: "Harga Bersahabat", desc: "Menu lengkap dan Paket Hemat 20K" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-[#1e1507] border border-[#2e200a] rounded-lg">
                    <p className="font-semibold text-sm text-amber-500 mb-1">{item.title}</p>
                    <p className="text-xs text-[#a08060]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 bg-[#0a0703] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label mb-3 inline-block">Daftar Menu</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              Menu <span className="italic text-amber-500">Spesial Kami</span>
            </h2>
            <p className="mt-3 text-sm text-[#a08060] max-w-md mx-auto">
              Pilih menu favorit Anda mulai dari makanan berat, minuman segar, hingga paket hemat ekonomis.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
            {menuCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveMenuTab(i)}
                className={`px-5 py-2.5 text-sm font-medium rounded transition-all duration-300 border ${
                  activeMenuTab === i
                    ? "bg-amber-600 text-black border-amber-500 shadow-md scale-105"
                    : "bg-[#1e1507] text-[#a08060] border-[#2e200a] hover:text-[#f5ead8]"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Items */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuCategories[activeMenuTab].items.map((item) => (
              <div
                key={item.id}
                className="menu-card bg-[#1e1507] border border-[#2e200a] rounded-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-amber-950">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="menu-img w-full h-full object-cover transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-amber-600 text-black rounded shadow">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#f5ead8] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#a08060] leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2e200a]">
                    <span className="font-semibold text-xs text-amber-500">{item.price}</span>
                    <button
                      onClick={() => {
                        scrollTo("pesan");
                        setTimeout(() => updateQty(item.id, 1), 300);
                      }}
                      className="text-xs font-medium px-3.5 py-1.5 border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-black rounded transition-colors"
                    >
                      + Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PESAN / ORDER */}
      <section id="pesan" className="py-24 bg-[#0f0a04] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-3 inline-block">Pemesanan Online</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              Buat <span className="italic text-amber-500">Pesanan Anda</span>
            </h2>
            <p className="mt-3 text-sm text-[#a08060] max-w-md mx-auto">
              Pilih jumlah menu yang diinginkan di bawah ini, isi data diri, dan kirimkan langsung via WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Menu selection list */}
            <div className="bg-[#1e1507]/50 border border-[#2e200a] p-6 rounded-xl">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-amber-500 mb-6">
                Pilih Menu & Jumlah
              </h3>
              <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2">
                {menuCategories.map((cat) => (
                  <div key={cat.label}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">{cat.emoji}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#a08060]">{cat.label}</span>
                      <div className="flex-1 h-px bg-[#2e200a]" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {cat.items.map((item) => {
                        const qty = cart.find((x) => x.id === item.id)?.qty ?? 0;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              qty > 0 ? "bg-[#2a1a06] border-amber-600 shadow-sm" : "bg-[#1e1507] border-[#2e200a]"
                            }`}
                          >
                            <div className="w-10 h-10 overflow-hidden flex-shrink-0 rounded bg-amber-950">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#f5ead8] truncate">{item.name}</p>
                              <p className="text-xs text-amber-500">{item.price}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                aria-label="Kurangi"
                                onClick={() => updateQty(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center font-bold bg-[#2e200a] text-[#f5ead8] hover:bg-amber-600 hover:text-black rounded transition-colors"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm font-bold text-amber-500">
                                {qty}
                              </span>
                              <button
                                aria-label="Tambah"
                                onClick={() => updateQty(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center font-bold bg-[#2e200a] text-[#f5ead8] hover:bg-amber-600 hover:text-black rounded transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-[#1e1507]/50 border border-[#2e200a] p-6 rounded-xl lg:sticky lg:top-28">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-amber-500 mb-6">
                Informasi Pemesan
              </h3>

              {totalItems > 0 && (
                <div className="p-4 mb-6 bg-[#1e1507] border border-amber-600/50 rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-3">
                    🛒 Ringkasan Pesanan ({totalItems} item dipilih)
                  </p>
                  {menuCategories.map((cat) => {
                    const catSelected = cat.items.filter((item) => (cart.find((c) => c.id === item.id)?.qty ?? 0) > 0);
                    if (!catSelected.length) return null;
                    return (
                      <div key={cat.label} className="mb-2">
                        <p className="text-xs font-medium text-[#a08060]">{cat.emoji} {cat.label}</p>
                        {catSelected.map((item) => {
                          const qty = cart.find((c) => c.id === item.id)?.qty ?? 0;
                          return (
                            <div key={item.id} className="flex justify-between text-xs py-0.5 pl-3">
                              <span className="text-[#c4a882]">{item.name}</span>
                              <span className="font-semibold text-[#f5ead8]">×{qty}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#a08060] mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Contoh: Ahmad Fauzi"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#1e1507] border border-[#2e200a] focus:border-amber-500 rounded text-[#f5ead8] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#a08060] mb-2">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#1e1507] border border-[#2e200a] focus:border-amber-500 rounded text-[#f5ead8] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#a08060] mb-2">Catatan Tambahan (Opsional)</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Sate jangan terlalu gosong, bungkus pisah..."
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-[#1e1507] border border-[#2e200a] focus:border-amber-500 rounded text-[#f5ead8] outline-none resize-none transition-colors"
                  />
                </div>

                {totalItems > 0 ? (
                  <a
                    href={whatsappLink(buildOrderMessage() || "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amber w-full justify-center text-center text-sm py-3 mt-2 shadow-lg"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Kirim Pesanan via WhatsApp ({totalItems} item)
                  </a>
                ) : (
                  <div className="w-full py-3 text-center text-xs bg-[#1e1507] text-[#a08060] border border-[#2e200a] rounded">
                    Silakan pilih minimal 1 menu di sebelah kiri untuk melanjutkan
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section id="galeri" className="py-24 bg-[#0a0703] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-3 inline-block">Galeri Warung</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              Potret <span className="italic text-amber-500">Sajian Kami</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImgs.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden bg-amber-950 rounded-lg border border-[#2e200a]"
                style={{ aspectRatio: i === 0 || i === 3 ? "1/1.2" : "1/1" }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a04]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-xs sm:text-sm font-medium text-[#f5ead8]">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK & LOKASI */}
      <section id="kontak" className="py-24 bg-[#0f0a04] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-3 inline-block">Informasi Kontak</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">
              Lokasi & <span className="italic text-amber-500">Kontak Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Alamat Warung",
                lines: ["Jl. Terate RT. 18", "Banjarejo, Kota Madiun", "Jawa Timur"],
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: "Nomor Telepon / WA",
                lines: ["0812-3032-8485", "Layanan Pesan Antar", "& Makan di Tempat"],
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
              },
              {
                title: "Jam Operasional",
                lines: ["Senin – Minggu", "Pukul 10.00 – 15.00 WIB", "Setiap Hari Buka"],
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((c, i) => (
              <div
                key={i}
                className="p-6 bg-[#1e1507] border border-[#2e200a] rounded-xl flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#2e200a] rounded-full text-amber-500 mb-1">
                  {c.icon}
                </div>
                <p className="font-semibold text-sm text-[#f5ead8]">{c.title}</p>
                {c.lines.map((l, idx) => (
                  <p key={idx} className="text-xs text-[#a08060]">{l}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="w-full h-64 sm:h-80 relative rounded-xl overflow-hidden border border-[#2e200a] bg-[#1e1507] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1584455486010-760bd0b28fc2?w=1200&h=400&fit=crop&auto=format"
              alt="Lokasi Omah Sate Madiun"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-600 rounded-full text-black mb-2 shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-display text-base sm:text-lg font-semibold text-[#f5ead8]">Omah Sate Kota Madiun</p>
              <p className="text-xs text-[#a08060] mb-4">Jl. Terate RT. 18, Banjarejo, Kota Madiun</p>
              <a
                href="https://maps.google.com/?q=Jl+Terate+Banjarejo+Madiun"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber text-xs py-2 px-6"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070503] border-t border-[#2e200a]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <p className="font-display text-2xl font-bold text-amber-500 mb-1">Omah Sate</p>
              <p className="text-xs uppercase tracking-widest text-[#f5ead8]/70 mb-4">Kota Madiun</p>
              <p className="text-xs sm:text-sm text-[#a08060] leading-relaxed mb-6 max-w-sm">
                Warung sate kambing pilihan di Kota Madiun. Menyajikan kelezatan otentik dari bahan-bahan segar setiap hari pukul 10.00 – 15.00 WIB.
              </p>
              <a
                href={whatsappLink("Halo Omah Sate Madiun, saya ingin bertanya seputar menu.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber text-xs py-2 px-4"
              >
                Chat WhatsApp Admin
              </a>
            </div>

            <div>
              <p className="font-semibold text-xs uppercase tracking-widest text-amber-500 mb-4">Navigasi</p>
              <div className="flex flex-col gap-2.5">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-left text-xs sm:text-sm text-[#a08060] hover:text-amber-500 transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-xs uppercase tracking-widest text-amber-500 mb-4">Menu Favorit</p>
              <div className="flex flex-col gap-2.5">
                {menuItems.slice(0, 4).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => scrollTo("menu")}
                    className="text-left text-xs sm:text-sm text-[#a08060] hover:text-amber-500 transition-colors"
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#2e200a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a08060]">
            <p>© 2026 Omah Sate Kota Madiun. Hak cipta dilindungi.</p>
            <p>Jl. Terate RT. 18, Banjarejo, Kota Madiun • Telp: 0812-3032-8485</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Bubble */}
      <a
        href={whatsappLink("Halo Omah Sate Madiun, saya ingin pesan.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}