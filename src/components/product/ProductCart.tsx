// src/components/ProductCard.tsx
"use client";

import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { addToCart } from "@/features/cart/cartSlice";
import { addToCart } from "@/features/countSlice/countSlice";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  amazonLink: string;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  description,
  rating,
  reviews,
  amazonLink,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  const quantity = itemInCart?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, price, quantity: 1, amazonLink }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array(5).fill(0).map((_, i) => i < Math.round(rating));

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border">
      <div className="relative bg-gray-50 p-4 h-52 flex items-center justify-center">
        <img src={image} alt={name} className="max-h-44 object-contain hover:scale-105 transition" />
        {quantity > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {quantity} in cart
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 line-clamp-2">{name}</h3>
        
        <div className="flex items-center gap-1 mt-1">
          {stars.map((filled, i) => (
            <span key={i} className={filled ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviews.toLocaleString()})</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mt-2">{description}</p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
          
          <div className="flex gap-2">
            <a href={amazonLink} target="_blank" rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-xs font-bold px-3 py-2 rounded-xl transition">
              Amazon
            </a>
            
            <button onClick={handleAddToCart}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition ${
                added ? "bg-green-500 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}>
              {added ? "✓ Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}