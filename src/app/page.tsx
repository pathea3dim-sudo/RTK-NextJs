// src/app/page.tsx
"use client";

// import Navbar from "@/components/Navbar";
// import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/product/ProductCart";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h1>
        <p className="text-gray-500 mb-8">Shop our best-selling items</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  );
}