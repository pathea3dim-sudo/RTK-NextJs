
// import ProductCard from "./components/ProductCard";
// import Navbar from "./components/Navbar";

import ProductCard from "@/components/product/ProductCart";
import Navbar from '../components/layout/Navbar'


const PRODUCTS = [
  {
    id: 1,
    name: "Apple AirPods Pro (2nd Generation)",
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
    price: 189.99,
    description:
      "Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio.",
    rating: 4.7,
    reviews: 82340,
    amazonLink: "https://www.amazon.com/dp/B0BDHWDR12",
  },
  {
    id: 2,
    name: "Samsung 65\" 4K QLED Smart TV",
    image: "https://m.media-amazon.com/images/I/91juxJOEwyL._AC_SL1500_.jpg",
    price: 799.99,
    description:
      "Quantum HDR, Motion Xcelerator, Object Tracking Sound, built-in Alexa.",
    rating: 4.5,
    reviews: 14230,
    amazonLink: "https://www.amazon.com/dp/B0C3GZKJ6D",
  },
  {
    id: 3,
    name: "Kindle Paperwhite (16 GB)",
    image: "https://m.media-amazon.com/images/I/61PGcMkLorL._AC_SL1000_.jpg",
    price: 139.99,
    description:
      "6.8\" display, adjustable warm light, waterproof, weeks-long battery.",
    rating: 4.8,
    reviews: 53910,
    amazonLink: "https://www.amazon.com/dp/B09TMF6742",
  },
  {
    id: 4,
    name: "Logitech MX Master 3S Mouse",
    image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
    price: 99.99,
    description:
      "8K DPI optical sensor, ultra-fast MagSpeed scroll, quiet clicks.",
    rating: 4.7,
    reviews: 28450,
    amazonLink: "https://www.amazon.com/dp/B09HM94VDS",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Headphones",
    image: "https://m.media-amazon.com/images/I/61vJmBvMPDL._AC_SL1500_.jpg",
    price: 279.99,
    description:
      "Industry-leading noise canceling, 30hr battery, multipoint connection.",
    rating: 4.6,
    reviews: 41200,
    amazonLink: "https://www.amazon.com/dp/B09XS7JWHH",
  },
  {
    id: 6,
    name: "Anker 100W USB-C Charging Station",
    image: "https://m.media-amazon.com/images/I/61wjAvw9W0L._AC_SL1500_.jpg",
    price: 45.99,
    description:
      "Charges laptop, phone, and tablet simultaneously with GaN tech.",
    rating: 4.5,
    reviews: 9870,
    amazonLink: "https://www.amazon.com/dp/B09W2PNLX7",
  },
];

export default function Home() {
  return (
    <>
      <Navbar/>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Featured Products
          </h1>
          <p className="text-gray-500 mt-1">
            Add items to your cart, then checkout on Amazon.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </>
  );
}
