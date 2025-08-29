"use client";

import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/store/cartSlice";
import { Product } from "@/types/product";
import { ShoppingCart, Star, Check } from "lucide-react";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props:ProductCardProps) {
 const { product }= props
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100/50 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-gray-100/20 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden bg-gray-50/50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleAddToCart}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full transition-all duration-300 backdrop-blur-md border flex items-center justify-center ${
              isInCart
                ? 'bg-[#283841] border-[#283841] text-white shadow-lg shadow-[#283841]/20'
                : 'bg-white/90 border-white/60 text-[#283841] hover:bg-white hover:scale-110 hover:shadow-md'
            }`}
            title={isInCart ? "Added to cart" : "Add to cart"}
          >
            {isInCart ? (
              <Check size={16} className="animate-in zoom-in duration-200" />
            ) : (
              <ShoppingCart size={16} />
            )}
          </button>
        </div>
        <div className="p-4 space-y-3">
          <h2 className="font-semibold text-[#283841] text-lg leading-tight line-clamp-1 group-hover:text-[#283841]/80 transition-colors">
            {product.title}
          </h2>
          <p className="text-[#283841]/60 text-sm line-clamp-2 leading-relaxed">
            {product.description.length > 60
              ? `${product.description.substring(0, 60)}...`
              : product.description
            }
          </p>
          <div className="pt-2 border-t border-gray-100/80">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-semibold text-[#283841]">
                  ${product.price}
                </span>
              </div>
              <div className="flex items-center gap-3">
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
                  <span className="text-[#283841]/60 font-medium text-sm">
                    {product.rating.rate}
                  </span>
                </div>


            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}