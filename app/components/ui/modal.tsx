import React from "react";
import Button from "./button";

type ModalProps = {
  product: any;
  onClose: () => void;
  addToCart: (product: any) => void; // ✅ Add function to add item to cart
};

export default function Modal({ product, onClose, addToCart }: ModalProps) {
  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
      onClick={onClose} // ✅ Click outside to close
    >
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside modal
      >
        {/* ❌ Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          onClick={onClose}
        >
          ❌
        </button>

        {/* 🖼️ Product Image */}
        {product.image && (
          <img 
            src={`/api/image?path=${encodeURIComponent(product.image)}`} 
            alt={product.name} 
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        )}

        {/* 📝 Product Details */}
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</p>

        {/* 📌 Additional Details */}
        <div className="mt-4">
          <p><strong>Price:</strong> {product.price ? `$${product.price}` : "Free"}</p>
          <p><strong>Brand:</strong> {product.brand || "N/A"}</p>
          <p><strong>Household ID:</strong> {product.house_hold_id || "N/A"}</p>
          <p><strong>Tags:</strong> {product.tags?.join(", ") || "N/A"}</p>
        </div>

        {/* 🛒 Add to Cart Button */}
        <Button 
          onClick={() => addToCart(product)}
          className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add to Cart
        </Button>
      </div>
    </div>
  );
}
