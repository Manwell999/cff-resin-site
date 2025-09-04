"use client";

import { Product } from "./Store";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-resin-blue/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
      onClick={onClick}
    >
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-gray-600 group-hover:text-resin-blue-light transition-colors">
            🛍️
          </div>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-resin-blue-light transition-colors">
            {product.name}
          </h3>
          <span className="text-2xl font-bold text-resin-blue">
            ${product.price}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          <button 
            className="px-4 py-2 bg-resin-blue text-white rounded-lg hover:bg-resin-blue-light transition-colors text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
