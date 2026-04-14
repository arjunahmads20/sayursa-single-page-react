import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Send,
  Search,
  LayoutGrid,
  Tag,
} from "lucide-react";

// ==========================================
// 🛠️ CONFIGURATION AREA 🛠️
// ==========================================

const STORE_NAME = "Sayursa";
const ADMIN_WA_NUMBER = "6287892999168"; // Replace with your WhatsApp number

const PRODUCTS = [
  // 🥬 SAYUR
  { id: 1, name: "Kangkung / ikat", category: "Vegetables", price: 3500, originalPrice: "", tags: ["Fresh","Leafy"], image: "/images/products/kangkung.png" },
  { id: 2, name: "Kacang Panjang / ikat", category: "Vegetables", price: 4000, originalPrice: "", tags: ["Fresh","Local"], image: "/images/products/kacang-panjang.png" },
  { id: 3, name: "Labu Siam / bks", category: "Vegetables", price: 4000, originalPrice: "", tags: ["Local","Fresh"], image: "/images/products/labu-siam.png" },
  { id: 4, name: "Tauge / bks", category: "Vegetables", price: 6000, originalPrice: "", tags: ["Fresh","Healthy"], image: "/images/products/tauge.png" },
  { id: 5, name: "Wortel / kg", category: "Vegetables", price: 15000, originalPrice: 17000, tags: ["Healthy","Fresh"], image: "/images/products/wortel.png" },
  { id: 6, name: "Sawi Pahit / ikat", category: "Vegetables", price: 4000, originalPrice: "", tags: ["Leafy","Fresh"], image: "/images/products/sawi-pahit.png" },
  { id: 7, name: "Sawi Pakcoy / ikat", category: "Vegetables", price: 5000, originalPrice: "", tags: ["Green","Fresh"], image: "/images/products/sawi-pakcoy.png" },
  { id: 8, name: "Selada / kg", category: "Vegetables", price: 25000, originalPrice: "", tags: ["Fresh","Salad"], image: "/images/products/selada.png" },
  { id: 9, name: "Timun / bks", category: "Vegetables", price: 8000, originalPrice: "", tags: ["Fresh","Hydrating"], image: "/images/products/timun.png" },
  { id: 10, name: "Bayam / ikat", category: "Vegetables", price: 5000, originalPrice: "", tags: ["Leafy","Healthy"], image: "/images/products/bayam.png" },
  { id: 11, name: "Jagung / bks", category: "Vegetables", price: 7500, originalPrice: "", tags: ["Sweet","Fresh"], image: "/images/products/jagung.png" },
  { id: 12, name: "Terong Ungu / bks", category: "Vegetables", price: 4000, originalPrice: "", tags: ["Fresh","Local"], image: "/images/products/terong-ungu.png" },
  { id: 13, name: "Brokoli / bks", category: "Vegetables", price: 12000, originalPrice: 14000, tags: ["Healthy","Green"], image: "/images/products/brokoli.png" },
  { id: 14, name: "Daun Singkong / ikat", category: "Vegetables", price: 5000, originalPrice: "", tags: ["Local","Leafy"], image: "/images/products/daun-singkong.png" },
  { id: 15, name: "Sayur Pakis / ikat", category: "Vegetables", price: 4000, originalPrice: "", tags: ["Local","Fresh"], image: "/images/products/sayur-pakis.png" },
  { id: 16, name: "Labu Kuning / kg", category: "Vegetables", price: 25000, originalPrice: "", tags: ["Fresh","Healthy"], image: "/images/products/labu-kuning.png" },
  { id: 17, name: "Paket Sayur Sop / bks", category: "Vegetables", price: 6000, originalPrice: "", tags: ["Bundle","Fresh"], image: "/images/products/paket-sayur-sop.png" },

  // 🍎 BUAH
  { id: 18, name: "Salak Pondoh / kg", category: "Fruits", price: 8000, originalPrice: "", tags: ["Local","Fresh"], image: "/images/products/salak-pondoh.png" },
  { id: 19, name: "Pisang Mas / sisir", category: "Fruits", price: 19500, originalPrice: "", tags: ["Sweet","Fresh"], image: "/images/products/pisang-mas.png" },
  { id: 20, name: "Pisang Ambon / sisir", category: "Fruits", price: 12000, originalPrice: 14000, tags: ["Sweet","Popular"], image: "/images/products/pisang-ambon.png" },
  { id: 21, name: "Pisang Susu / sisir", category: "Fruits", price: 15000, originalPrice: "", tags: ["Sweet","Fresh"], image: "/images/products/pisang-susu.png" },
  { id: 22, name: "Pisang Kepok Kecil / sisir", category: "Fruits", price: 12000, originalPrice: "", tags: ["Local","Cooking"], image: "/images/products/pisang-kepok.png" },
  { id: 23, name: "Pepaya / kg", category: "Fruits", price: 8000, originalPrice: "", tags: ["Fresh","Healthy"], image: "/images/products/pepaya.png" },
  { id: 24, name: "Tomat / kg", category: "Fruits", price: 18000, originalPrice: "", tags: ["Fresh","Cooking"], image: "/images/products/tomat.png" },
  { id: 25, name: "Buah Naga / kg", category: "Fruits", price: 21000, originalPrice: "", tags: ["Fresh","Exotic"], image: "/images/products/buah-naga.png" },
  { id: 26, name: "Jeruk Lokal / kg", category: "Fruits", price: 17000, originalPrice: "", tags: ["Vitamin C","Fresh"], image: "/images/products/jeruk.png" },
  { id: 27, name: "Alpukat / kg", category: "Fruits", price: 33000, originalPrice: "", tags: ["Healthy","Premium"], image: "/images/products/alpukat.png" },
  { id: 28, name: "Semangka / kg", category: "Fruits", price: 19000, originalPrice: "", tags: ["Fresh","Hydrating"], image: "/images/products/semangka.png" },
  { id: 29, name: "Nanas / buah", category: "Fruits", price: 6000, originalPrice: "", tags: ["Sweet","Fresh"], image: "/images/products/nanas.png" },
  { id: 30, name: "Stroberi / bks", category: "Fruits", price: 11000, originalPrice: 13000, tags: ["Sweet","Fresh"], image: "/images/products/stroberi.png" },

  // 🍱 PROTEIN
  { id: 31, name: "Ayam Potong / kg", category: "Protein", price: 45000, originalPrice: "", tags: ["Fresh","Protein"], image: "/images/products/ayam-potong.png" },
  { id: 32, name: "Ati Ayam / kg", category: "Protein", price: 32000, originalPrice: "", tags: ["Fresh","Protein"], image: "/images/products/ati-ayam.png" },
  { id: 33, name: "Telur Ayam Negeri / kg", category: "Protein", price: 29500, originalPrice: 31000, tags: ["Protein","Daily"], image: "/images/products/telur-ayan-negeri.png" },
  { id: 34, name: "Telur Ayam Kampung / kg", category: "Protein", price: 34500, originalPrice: "", tags: ["Premium","Protein"], image: "/images/products/telur-ayam-kampung.png" },
  { id: 35, name: "Tempe Daun / bks", category: "Protein", price: 3500, originalPrice: "", tags: ["Local","Healthy"], image: "/images/products/tempe-daun.png" },
  { id: 36, name: "Tempe Plastik / bks", category: "Protein", price: 6000, originalPrice: "", tags: ["Local","Protein"], image: "/images/products/tempe.png" },
  { id: 37, name: "Tahu Putih / bks", category: "Protein", price: 5000, originalPrice: "", tags: ["Healthy","Protein"], image: "/images/products/tahu-putih.png" },
  { id: 38, name: "Tahu Kuning / bks", category: "Protein", price: 5000, originalPrice: "", tags: ["Healthy","Protein"], image: "/images/products/tahu-kuning.png" },
  { id: 39, name: "Ikan Tongkol / 1/2 kg", category: "Protein", price: 40000, originalPrice: "", tags: ["Fish","Fresh"], image: "/images/products/ikan-tongkol.png" },

  // 🥔 UMBI
  { id: 40, name: "Singkong / kg", category: "Tubers", price: 5000, originalPrice: "", tags: ["Local","Staple"], image: "/images/products/singkong.png" },
  { id: 41, name: "Kentang / kg", category: "Tubers", price: 24000, originalPrice: "", tags: ["Staple","Cooking"], image: "/images/products/kentang.png" },
  { id: 42, name: "Ubi Jalar Ungu / kg", category: "Tubers", price: 12000, originalPrice: "", tags: ["Healthy","Local"], image: "/images/products/ubi-ungu.png" },
  { id: 43, name: "Ubi Jalar Oren Madu / kg", category: "Tubers", price: 9000, originalPrice: "", tags: ["Sweet","Local"], image: "/images/products/ubi-oren.png" },

  // 🧄 BUMBU
  { id: 44, name: "Bawang Putih / kg", category: "Spices", price: 40000, originalPrice: "", tags: ["Essential","Cooking"], image: "/images/products/bawang-putih.png" },
  { id: 45, name: "Bawang Merah / kg", category: "Spices", price: 44000, originalPrice: "", tags: ["Essential","Cooking"], image: "/images/products/bawang-merah.png" },
  { id: 46, name: "Bawang Bombai / kg", category: "Spices", price: 36000, originalPrice: "", tags: ["Cooking","Fresh"], image: "/images/products/bawang-bombai.png" },
  { id: 47, name: "Cabai Rawit Merah / kg", category: "Spices", price: 80000, originalPrice: "", tags: ["Spicy","Cooking"], image: "/images/products/cabai-rawit-merah.png" },
  { id: 48, name: "Cabai Merah Besar / kg", category: "Spices", price: 38000, originalPrice: "", tags: ["Spicy","Cooking"], image: "/images/products/cabai-merah-besar.png" },
  { id: 49, name: "Cabai Merah Keriting / kg", category: "Spices", price: 40000, originalPrice: "", tags: ["Spicy","Cooking"], image: "/images/products/cabai-merah-keriting.png" },
  { id: 50, name: "Daun Bawang / kg", category: "Spices", price: null, originalPrice: "", tags: ["Herb","Fresh"], image: "/images/products/daun-bawang.png" },
  { id: 51, name: "Jahe / kg", category: "Spices", price: null, originalPrice: "", tags: ["Herb","Healthy"], image: "/images/products/jahe.png" },
  { id: 52, name: "Kunyit / kg", category: "Spices", price: null, originalPrice: "", tags: ["Herb","Healthy"], image: "/images/products/kunyit.png" },

  // 🍚 BERAS & TEPUNG
  { id: 53, name: "Beras Rojolele / kg", category: "Staples", price: 15000, originalPrice: "", tags: ["Premium","Staple"], image: "/images/products/beras-rojolele.png" },
  { id: 54, name: "Beras Pandan Wangi / kg", category: "Staples", price: 18500, originalPrice: "", tags: ["Aromatic","Premium"], image: "/images/products/beras-pandan-wangi.png" },
  { id: 55, name: "Beras SPHP / 5kg", category: "Staples", price: 65000, originalPrice: 70000, tags: ["Bulk","Staple"], image: "/images/products/beras-sphp.png" },
  { id: 56, name: "Beras Ketan / kg", category: "Staples", price: null, originalPrice: "", tags: ["Sticky","Cooking"], image: "/images/products/beras-ketan.png" },
  { id: 57, name: "Beras Merah / kg", category: "Staples", price: null, originalPrice: "", tags: ["Healthy","Diet"], image: "/images/products/beras-merah.png" },
  { id: 58, name: "Gula Pasir RoseBrand / kg", category: "Staples", price: 20000, originalPrice: "", tags: ["Sweet","Essential"], image: "/images/products/gula-pasir.png" },
  { id: 59, name: "Gula Merah / kg", category: "Staples", price: null, originalPrice: "", tags: ["Traditional","Sweet"], image: "/images/products/gula-merah.png" },
  { id: 60, name: "Tepung Terigu Bogasari / kg", category: "Staples", price: 13000, originalPrice: "", tags: ["Baking","Cooking"], image: "/images/products/tepung-terigu.png" },
  { id: 61, name: "Tepung Tapioka RoseBrand / 500g", category: "Staples", price: 8000, originalPrice: "", tags: ["Cooking","Thickener"], image: "/images/products/tepung-tapioka.png" },
  { id: 62, name: "Tepung Maizena / 300g", category: "Staples", price: 9000, originalPrice: "", tags: ["Cooking","Thickener"], image: "/images/products/tepung-maizena.png" },

  // 🥜 KACANG
  { id: 63, name: "Kacang Hijau / kg", category: "Legumes", price: 32000, originalPrice: "", tags: ["Healthy","Protein"], image: "/images/products/kacang-hijau.png" },
  { id: 64, name: "Kacang Madu / kg", category: "Legumes", price: 26000, originalPrice: "", tags: ["Snack","Sweet"], image: "/images/products/kacang-madu.png" },

  // 🍱 JAJANAN
  { id: 65, name: "Tape Singkong / bks", category: "Snacks", price: 5000, originalPrice: "", tags: ["Traditional","Sweet"], image: "/images/products/tape-singkong.png" },
  { id: 66, name: "Bubur Kacang Hijau / bks", category: "Snacks", price: 6000, originalPrice: "", tags: ["Traditional","Warm"], image: "/images/products/bubur-kacang-hijau.png" },
  { id: 67, name: "Kue Pukis / bks", category: "Snacks", price: 5000, originalPrice: "", tags: ["Sweet","Traditional"], image: "/images/products/kue-pukis.png" },
];



// ==========================================
// 🛒 APP COMPONENTS & LOGIC 🛒
// ==========================================

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Format currency to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const getDiscountPercent = (price, originalPrice) => {
    if (!originalPrice || price >= originalPrice) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Derive categories automatically
  const categories = useMemo(() => {
    const cats = new Set(PRODUCTS.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Cart actions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  // Checkout Handler
  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = `Halo admin, Saya ingin membeli:\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} x ${item.quantity}\n`;
    });

    message += `\n*Total:* ${formatPrice(totalPrice)}\n`;
    message += `*Metode Pembayaran:* ${paymentMethod}\n\n`;
    message += `Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-blue-50/40 font-sans text-gray-800 pb-10">
      {/* 🟣 HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-black text-purple-900 tracking-tight flex items-center gap-2">
            <LayoutGrid className="text-purple-700" size={24} />
            {STORE_NAME}
          </h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-purple-900 hover:text-purple-700 transition-colors bg-blue-50 rounded-full"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 🟣 MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative w-full sm:w-1/3">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-purple-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-purple-900 shadow-sm"
            />
          </div>
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-2/3 pb-2 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-900 text-white shadow-md"
                    : "bg-white border border-blue-100 text-purple-700 hover:bg-blue-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (Exactly 3 columns on md screens, 2 on mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-purple-400 bg-white rounded-2xl border border-blue-50">
            <p>No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filteredProducts.map((product) => {
              // Only consider it a discount if originalPrice exists and is greater than price
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discount = hasDiscount ? getDiscountPercent(product.price, product.originalPrice) : null;
              
              return (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-blue-50 overflow-hidden hover:border-purple-300 hover:shadow-md transition-all flex flex-col group">
                  
                  {/* Product Image Container */}
                  <div className="relative h-28 md:h-36 bg-blue-50/50 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = '[https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found](https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found)' }}
                    />
                    
                    {/* Conditional Discount Badge */}
                    {hasDiscount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] md:text-xs font-black px-1.5 py-0.5 rounded-md shadow-sm">
                        -{discount}%
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-sm md:text-base font-bold text-purple-950 leading-tight mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags && product.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] md:text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
                          {tag}
                        </span>
                      ))}
                    </div>
            
                    {/* Pricing with Conditional Strikethrough */}
                    <div className="mt-auto pt-1 mb-3 flex flex-col min-h-[2.5rem] justify-end">
                      <span className="text-sm md:text-base font-black text-purple-700">
                        {formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] md:text-xs text-gray-400 line-through font-medium">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    {/* Add Button */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-purple-800 hover:bg-purple-900 text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-colors active:scale-95 flex justify-center items-center gap-1 shadow-sm"
                    >
                      <Plus size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 🟣 CART MODAL OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-purple-950/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>
          {/* Modal Panel */}
          <div className="relative w-full max-w-sm md:max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-blue-50">
              <h2 className="text-lg font-bold flex items-center gap-2 text-purple-950">
                <ShoppingCart size={20} className="text-purple-700" />
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-purple-400 hover:text-purple-900 bg-blue-50 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-blue-50/30">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-purple-300 space-y-4">
                  <ShoppingCart size={48} className="opacity-50" />
                  <p className="text-purple-800/60 font-medium text-sm">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-blue-50 shadow-sm"
                    >
                      {/* Cart Item Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-blue-50 border border-blue-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-purple-950 text-xs md:text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-purple-700 font-bold text-xs mt-0.5">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-blue-50/50 border border-blue-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="text-purple-600 hover:text-purple-900 p-1 bg-white rounded shadow-sm"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold w-5 text-center text-xs text-purple-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="text-purple-600 hover:text-purple-900 p-1 bg-white rounded shadow-sm"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {cart.length > 0 && (
              <div className="border-t border-blue-100 p-4 bg-white">
                <div className="mb-4">
                  <label className="block text-[10px] font-bold text-purple-900 mb-1.5 uppercase tracking-wider">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-blue-50/50 border border-blue-100 text-purple-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                  >
                    <option value="COD">Cash on Delivery (COD)</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="E-Wallet">E-Wallet (OVO/GoPay/Dana)</option>
                  </select>
                </div>

                <div className="flex justify-between items-center mb-4 bg-blue-50/80 p-3 rounded-lg border border-blue-100">
                  <span className="text-purple-800 font-semibold text-xs md:text-sm">
                    Total ({totalItems} items)
                  </span>
                  <span className="text-base md:text-lg font-black text-purple-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* WhatsApp Button remains Brand Green */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm shadow-green-200"
                >
                  <Send size={16} />
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

