"use client";

import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/store/cartSlice";
import { Product } from "@/types/product";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Shield,
  RotateCcw,
  Truck,
  Check,
  Heart
} from "lucide-react";
import { toast } from "react-hot-toast";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart! 🛒`);
  };

  const handleWishlist = () => {
    toast.success("Added to wishlist!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00CCCC]/5 via-white to-[#00CCCC]/3">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#00CCCC] mb-8 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Products</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/30 flex items-center justify-center p-8 lg:p-12">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute top-4 left-4 bg-[#00CCCC] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                Popular
              </div>
            </div>
            <div className="p-6 lg:p-8 space-y-6">
              <div className="inline-block bg-[#00CCCC]/10 text-[#00CCCC] text-sm font-medium px-4 py-1.5 rounded-full border border-[#00CCCC]/20">
                {product.category}
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating.rate)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">
                      {product.rating.rate} · {product.rating.count} reviews
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#00CCCC]">
                    ${product.price}
                  </h2>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed text-base">
                  {product.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className="flex-1 bg-[#00CCCC] hover:bg-[#00AAAA] text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isInCart ? (
                      <>
                        <Check size={20} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWishlist}
                    className="px-4 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    <Heart size={20} className="hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#00CCCC]/10 rounded-xl flex items-center justify-center">
                      <Truck size={18} className="text-[#00CCCC]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Free Shipping</p>
                      <p className="text-gray-500 text-xs">On orders over $50</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#00CCCC]/10 rounded-xl flex items-center justify-center">
                      <RotateCcw size={18} className="text-[#00CCCC]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Easy Returns</p>
                      <p className="text-gray-500 text-xs">30-day policy</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#00CCCC]/10 rounded-xl flex items-center justify-center">
                      <Shield size={18} className="text-[#00CCCC]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Warranty</p>
                      <p className="text-gray-500 text-xs">2 year coverage</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#00CCCC]/5 rounded-xl p-4 border border-[#00CCCC]/10">
                <div className="flex items-center gap-2 text-sm text-[#008888]">
                  <Check size={16} className="text-[#00CCCC]" />
                  <span>In stock · Ready to ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00CCCC]">{product.rating.rate}</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{product.rating.count} reviews</p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">
                Customers love this product for its quality and value.
                {product.rating.rate >= 4.5 ? " Highly recommended!" : " Great choice!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}