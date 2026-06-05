
"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hook";

export default function Navbar() {
  const { totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-500">
            🛍️ ShopHub
          </Link>

          {/* Cart Button */}
          <Link href="/cart" className="relative">
            <div className="flex items-center gap-2 hover:text-orange-500 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="font-semibold">Cart</span>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}