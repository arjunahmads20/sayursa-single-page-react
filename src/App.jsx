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
  // 🥬 Sayur
  {
    id: 1,
    name: "Kangkung / ikat",
    category: "Vegetables",
    price: 3500,
    originalPrice: "",
    tags: ["Fresh"],
    image: "https://source.unsplash.com/400x400/?kangkung,vegetable",
  },
  {
    id: 2,
    name: "Kacang Panjang / ikat",
    category: "Vegetables",
    price: 4000,
    originalPrice: 5000,
    tags: ["Fresh"],
    image: "https://source.unsplash.com/400x400/?long-beans,vegetable",
  },
  {
    id: 3,
    name: "Wortel / kg",
    category: "Vegetables",
    price: 15000,
    originalPrice: 17000,
    tags: ["Healthy"],
    image: "https://source.unsplash.com/400x400/?carrot",
  },
  {
    id: 4,
    name: "Brokoli / bks",
    category: "Vegetables",
    price: 12000,
    originalPrice: 14000,
    tags: ["Healthy"],
    image: "https://source.unsplash.com/400x400/?broccoli",
  },

  // 🍎 Buah
  {
    id: 5,
    name: "Pisang Ambon / sisir",
    category: "Fruits",
    price: 12000,
    originalPrice: 14000,
    tags: ["Sweet"],
    image: "https://source.unsplash.com/400x400/?banana",
  },
  {
    id: 6,
    name: "Pepaya / kg",
    category: "Fruits",
    price: 8000,
    originalPrice: 10000,
    tags: ["Fresh"],
    image: "https://source.unsplash.com/400x400/?papaya",
  },
  {
    id: 7,
    name: "Jeruk Lokal / kg",
    category: "Fruits",
    price: 17000,
    originalPrice: 20000,
    tags: ["Vitamin C"],
    image: "https://source.unsplash.com/400x400/?orange,fruit",
  },
  {
    id: 8,
    name: "Semangka / buah",
    category: "Fruits",
    price: 19000,
    originalPrice: 22000,
    tags: ["Fresh"],
    image: "https://source.unsplash.com/400x400/?watermelon",
  },

  // 🍱 Protein
  {
    id: 9,
    name: "Telur Ayam / kg",
    category: "Protein",
    price: 28500,
    originalPrice: 30000,
    tags: ["Protein"],
    image: "https://source.unsplash.com/400x400/?eggs",
  },
  {
    id: 10,
    name: "Tempe Daun / bks",
    category: "Protein",
    price: 3500,
    originalPrice: "",
    tags: ["Local"],
    image: "https://source.unsplash.com/400x400/?tempeh",
  },
  {
    id: 11,
    name: "Tahu Putih / bks",
    category: "Protein",
    price: 5000,
    originalPrice: 6000,
    tags: ["Healthy"],
    image: "https://source.unsplash.com/400x400/?tofu",
  },

  // 🥔 Umbi
  {
    id: 12,
    name: "Singkong / kg",
    category: "Tubers",
    price: 5000,
    originalPrice: 6000,
    tags: ["Local"],
    image: "https://source.unsplash.com/400x400/?cassava",
  },
  {
    id: 13,
    name: "Kentang / kg",
    category: "Tubers",
    price: 24000,
    originalPrice: 26000,
    tags: ["Staple"],
    image: "https://source.unsplash.com/400x400/?potato",
  },

  // 🧄 Bumbu
  {
    id: 14,
    name: "Bawang Putih / kg",
    category: "Spices",
    price: 40000,
    originalPrice: 42000,
    tags: ["Essential"],
    image: "https://source.unsplash.com/400x400/?garlic",
  },
  {
    id: 15,
    name: "Cabai Rawit Merah / kg",
    category: "Spices",
    price: 80000,
    originalPrice: 85000,
    tags: ["Spicy"],
    image: "https://source.unsplash.com/400x400/?chili",
  },

  // 🍚 Beras
  {
    id: 16,
    name: "Beras Rojolele / kg",
    category: "Staples",
    price: 15000,
    originalPrice: 16000,
    tags: ["Premium"],
    image: "https://source.unsplash.com/400x400/?rice",
  },
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

