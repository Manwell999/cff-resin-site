"use client";

import { useState } from "react";
import { Product } from "./Store";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Here you would typically integrate with a shopping cart system
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-8xl text-gray-600">
              🛍️
            </div>
          </div>
          
          {/* Product Details */}
          <div className="p-8 flex flex-col">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              {product.name}
            </h1>
            
            <div className="text-3xl font-bold text-resin-blue mb-6">
              ${product.price}
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedSize === size
                          ? "border-resin-blue bg-resin-blue/20 text-resin-blue-light"
                          : "border-white/20 text-gray-300 hover:border-white/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedColor === color
                          ? "border-resin-blue bg-resin-blue/20 text-resin-blue-light"
                          : "border-white/20 text-gray-300 hover:border-white/40"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:border-resin-blue transition-colors"
                >
                  -
                </button>
                <span className="text-white text-lg font-semibold min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:border-resin-blue transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || (product.sizes && !selectedSize) || (product.colors && !selectedColor)}
              className="w-full py-4 bg-resin-blue text-white rounded-lg font-semibold text-lg hover:bg-resin-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed resin-glow"
            >
              {!product.inStock 
                ? "Out of Stock" 
                : "Add to Cart - $" + (product.price * quantity).toFixed(2)
              }
            </button>
            
            {/* Stock Status */}
            <div className="mt-4 text-center">
              {product.inStock ? (
                <span className="text-green-400 text-sm">✓ In Stock</span>
              ) : (
                <span className="text-red-400 text-sm">✗ Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
