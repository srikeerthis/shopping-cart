"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import Image from "next/image";
import Modal from "./components/ui/modal";
import { ShoppingCart, Send, Search, X } from "lucide-react";

const PRODUCTS_API_BASE_URL = process.env.NEXT_PUBLIC_PRODUCTS_API_BASE_URL || "/api/products";
const SEARCH_API_BASE_URL = process.env.NEXT_PUBLIC_SEARCH_API_BASE_URL || "/api/search";
const IMAGE_API_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_BASE_URL || "/api/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  price?: number;
  image?: string;
  brand?: string;
  tags?: string[];
  house_hold_id?: string;
};

export default function ShoppingCartApp() {
  const [cart, setCart] = useState<Product[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  

  // ✅ Fetch Products from API
  const fetchProducts = useCallback(async (query: string = "") => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = query
        ? `${SEARCH_API_BASE_URL}?query=${encodeURIComponent(query)}&page=1&pageSize=10`
        : PRODUCTS_API_BASE_URL;

      console.log("Fetching from API:", apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);

      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError("⚠️ Failed to load products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Debounce API Calls for Search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchInput) fetchProducts(searchInput);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput, fetchProducts]);

  // ✅ Load Default Products on Page Load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Save Cart to MongoDB
  const saveCartToDatabase = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      if (response.ok) {
        alert("✅ Cart saved to database successfully!");
      } else {
        alert("❌ Failed to save cart.");
      }
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addToCart = (item: Product) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛍️ Shopping Cart</h1>

      {/* 🔍 Search Bar */}
      <div className="relative w-full max-w-xl mb-8">
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-5 py-3 text-lg border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={() => fetchProducts(searchInput)}
          className="absolute right-3 top-2 text-gray-500 dark:text-gray-400 cursor-pointer"
        >
          <Search size={24} />
        </button>
      </div>

      {/* 🔄 Loading and ⚠️ Error Handling */}
      {loading && <p className="text-gray-500">🔄 Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🛒 Full Page Grid Layout for Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full max-w-[90%]">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product._id}
              onClick={() => setSelectedProduct(product)} 
              className="cursor-pointer flex flex-col items-center p-5 bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full h-full hover:shadow-xl transition-transform transform hover:scale-105"
            >
              {product.image && (
                <Image
                  src={`${IMAGE_API_BASE_URL}?path=${encodeURIComponent(product.image)}`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="w-36 h-36 object-cover mb-3 rounded-lg"
                  unoptimized={true}
                />
              )}
              <CardContent className="text-center">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-blue-500 font-bold text-md mt-2">
                  {product.price ? `$${product.price}` : "Free"}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          !loading && <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No items found</p>
        )}
      </div>

      {/* 📌 Product Details Modal */}
      {selectedProduct && (
        <Modal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          addToCart={addToCart} // ✅ Fix: Pass addToCart function
        />
      )}

      {/* 🛒 Shopping Cart Section */}
      <h2 className="text-2xl font-bold mt-12">🛒 Cart ({cart.length})</h2>
      <div className="w-full max-w-lg mt-6">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-4 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-md mb-3">
              <p className="text-lg">{item.name} - {item.price ? `$${item.price}` : "Free"}</p>
              <Button onClick={() => removeFromCart(index)} variant="destructive">
                ❌ Remove
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">Your cart is empty.</p>
        )}
      </div>

      {/* 💾 Request Items Button */}
      <Button
        onClick={saveCartToDatabase}
        className="mt-8 px-8 py-4 text-lg rounded-xl"
        variant="default"
        disabled={cart.length === 0}
      >
        <Send className="mr-2" /> Request Items
      </Button>
    </div>
  );
}
