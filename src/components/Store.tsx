"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes?: string[];
  colors?: string[];
  category: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "CFF Resin Logo T-Shirt",
    price: 24.99,
    description: "Premium quality cotton t-shirt featuring the CFF Resin logo. Perfect for showing your support for quality epoxy solutions.",
    image: "/api/placeholder/400/400",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy Blue"],
    category: "Apparel",
    inStock: true,
  },
];

export default function Store() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-resin-text">CFF Resin</span>
            <br />
            <span className="text-white">Store</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Show your support for quality epoxy solutions with our exclusive merchandise. 
            From apparel to accessories, find everything you need to represent the resin community.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === category
                    ? "bg-resin-blue text-white resin-glow"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
