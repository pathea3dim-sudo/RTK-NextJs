"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addToCart } from "@/features/countSlice/countSlice";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
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

  const cartItems = useAppSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  const quantityInCart = itemInCart?.quantity ?? 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, price, amazonLink }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
      {/* Image */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center h-52">
        <img
          src={image}
          alt={name}
          className="max-h-44 object-contain transition-transform duration-300 hover:scale-105"
        />
        {quantityInCart > 0 && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {quantityInCart} in cart
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2">
          {name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {stars.map((filled, i) => (
            <span key={i} className={filled ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviews.toLocaleString()})</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <span className="text-2xl font-extrabold text-gray-900">
            ${price.toFixed(2)}
          </span>

          <div className="flex gap-2">
            {/* Amazon link */}
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-2 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 6.288 0 2.5 3.201 2.5 7.858c0 4.048 3.167 5.952 5.92 7.189l.876.4c2.282.99 3.28 1.705 3.28 2.872 0 .951-.748 1.555-2.123 1.555-2.11 0-4.623-.817-6.621-2.03L2.71 23.1c1.918 1.278 5.062 2.163 8.011 2.163 6.22 0 10.135-3.087 10.135-8.012-.001-4.326-2.837-6.246-6.88-8.101z" />
              </svg>
              Amazon
            </a>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200 ${
                added
                  ? "bg-green-500 text-white scale-95"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {added ? (
                <>✓ Added</>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}