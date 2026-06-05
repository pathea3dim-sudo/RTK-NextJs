
"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../features/countSlice/cart/cartSlice";
import Navbar from "../../components/layout/Navbar";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalAmount } = useAppSelector((state) => state.cart);

  // If cart is empty
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add items to get started</p>
          <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
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
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({totalQuantity} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Products appear here */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border">
              {items.map((item) => (
                <div key={item.id} className="border-b p-6 last:border-b-0">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      
                      {item.bestSeller && (
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded mt-1">
                          #1 Best Seller
                        </span>
                      )}
                      
                      <p className="text-green-600 text-sm font-semibold mt-2">In Stock</p>
                      <p className="text-xs text-gray-500 mt-1">FREE Returns</p>
                      
                      {/* Specifications */}
                      <div className="flex gap-3 mt-2 text-xs text-gray-600">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      
                      {/* Quantity Controls and Actions */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 border rounded">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="w-8 h-8 hover:bg-gray-100 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="w-8 h-8 hover:bg-gray-100 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-blue-600 hover:text-orange-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link href="/" className="text-blue-600 hover:text-orange-600">
                ← Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Items ({totalQuantity}):</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition">
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full text-center text-red-600 hover:text-red-700 text-sm mt-3"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}