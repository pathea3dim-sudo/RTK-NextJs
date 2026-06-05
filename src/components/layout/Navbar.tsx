// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useAppSelector, useAppDispatch } from "@/store/hooks";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "@/features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "@/features/countSlice/cart/cartSlice";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalAmount } = useAppSelector((state) => state.cart);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-500">
          🛍️ ShopHub
        </Link>

        {/* Cart Button */}
        <div className="relative">
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border z-50">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg">Your Cart ({totalQuantity})</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="text-5xl mb-3">🛒</div>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 border-b">
                        <Image src={item.image} alt={item.name} width={60} height={60} 
                          className="rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-orange-500 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => dispatch(decreaseQuantity(item.id))}
                              className="w-6 h-6 rounded-full border hover:bg-gray-100">
                              -
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button onClick={() => dispatch(increaseQuantity(item.id))}
                              className="w-6 h-6 rounded-full border hover:bg-gray-100">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          <button onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-400 text-xs hover:text-red-600">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="flex justify-between mb-3">
                      <span>Total:</span>
                      <span className="font-bold text-xl">${totalAmount.toFixed(2)}</span>
                    </div>
                    <a href="https://www.amazon.com/cart" target="_blank"
                      className="block text-center bg-yellow-400 hover:bg-yellow-500 font-bold py-2 rounded-xl transition">
                      Checkout on Amazon →
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}