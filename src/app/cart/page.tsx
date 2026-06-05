


"use client";

import Link from "next/link";
import Image from "next/image";
// import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useAppSelector, useAppDispatch } from "@/store/hook";

import Navbar from "@/components/layout/Navbar";
import { removeFromCart, increaseQuantity, decreaseQuantity,clearCart } from "@/features/countSlice/countSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalAmount } = useAppSelector((state) => state.cart);
 
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
          <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalQuantity} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b">
                  <Image src={item.image} alt={item.name} width={100} height={100} 
                    className="rounded-lg object-cover" />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-orange-500 font-bold">${item.price}</p>
                    <a href={item.amazonLink} target="_blank" className="text-xs text-blue-500 hover:underline">
                      View on Amazon →
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-8 h-8 rounded-full border hover:bg-gray-100">
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-8 h-8 rounded-full border hover:bg-gray-100">
                      +
                    </button>
                    <button onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 ml-4">
                      Remove
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <a href="https://www.amazon.com/cart" target="_blank"
                className="block text-center bg-yellow-400 hover:bg-yellow-500 font-bold py-3 rounded-xl transition mb-3">
                Proceed to Checkout
              </a>
              
              <button onClick={() => dispatch(clearCart())}
                className="w-full text-center border border-red-500 text-red-500 hover:bg-red-50 font-bold py-3 rounded-xl transition">
                Clear Cart
              </button>
              
              <Link href="/" className="block text-center mt-4 text-orange-500 hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}