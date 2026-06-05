"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { removeFromCart, decreaseQuantity, addToCart } from "@/features/countSlice/countSlice";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);

  const { items, totalQuantity, totalAmount } = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-orange-500 tracking-tight"
        >
          ShopNext
        </Link>

        {/* Cart Button */}
        <div className="relative">
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors font-medium text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
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
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 text-lg">
                  Your Cart ({totalQuantity})
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>

              {items.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="font-medium">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 p-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="rounded-lg border border-gray-100 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-orange-500 font-bold text-sm">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.id))
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-bold flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    id: item.id,
                                    name: item.name,
                                    image: item.image,
                                    price: item.price,
                                    quantity: 1,
                                    amazonLink: item.amazonLink,
                                  })
                                )
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-bold flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-sm font-bold text-gray-700">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item.id))
                            }
                            className="text-red-400 hover:text-red-600 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600 font-medium">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <a
                      href="https://www.amazon.com/cart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 rounded-xl transition-colors"
                    >
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