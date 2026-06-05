
"use client";

import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/product/ProductCart";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
          <p className="text-gray-600 mt-2">Click "Add to Cart" to add products to your cart</p>
        </div>
        
        <div className="space-y-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  );
}