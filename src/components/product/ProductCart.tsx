
"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/features/countSlice/cart/cartSlice";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rating?: number;
  reviews?: number;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  description,
  rating,
  reviews,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  const quantity = itemInCart?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, price, quantity: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-100 p-8">
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          showOverlay ? "opacity-40" : "opacity-0"
        }`}></div>
        
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}>
          <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105">
            View Product
          </button>
        </div>

        {quantity > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            {quantity} in cart
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {name}
        </h3>
        
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(rating) ? "text-yellow-400 text-sm" : "text-gray-300 text-sm"}>
                  ★
                </span>
              ))}
            </div>
            {reviews && (
              <span className="text-xs text-gray-500 ml-1">({reviews.toLocaleString()})</span>
            )}
          </div>
        )}

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 font-bold text-2xl">
            ${price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className={`py-2 px-5 rounded-full font-bold transition-all duration-200 ${
              added 
                ? "bg-green-500 text-white" 
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}