'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import CartItem from '@/components/Cart/CartItem';
import { ShoppingBag, ArrowRight, Receipt, Package } from 'lucide-react';

export default function CartPage() {
  const { items, total, totalItems } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00CCCC]/5 via-white to-[#00CCCC]/3 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#00CCCC] hover:bg-[#00AAAA] text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00CCCC]/5 via-white to-[#00CCCC]/3 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#00CCCC] rounded-full flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600 text-sm">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-fit sticky top-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Receipt size={20} className="text-[#00CCCC]" />
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center text-gray-600">
                <span className="text-sm">Subtotal ({totalItems} items)</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span className="text-sm">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span className="text-sm">Tax</span>
                <span className="font-medium">${(total * 0.1).toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-[#00CCCC]">${(total * 1.1).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">Incl. VAT</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/checkout"
                className="w-full bg-[#00CCCC] hover:bg-[#00AAAA] text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium text-center block shadow-sm hover:shadow-md"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl transition-all duration-200 font-medium text-center block"
              >
                Continue Shopping
              </Link>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
                <span>✓ Free shipping</span>
                <span>•</span>
                <span>✓ 30-day returns</span>
                <span>•</span>
                <span>✓ Secure payment</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Enjoy free shipping on orders over $50</span>
            <span className="text-[#00CCCC] font-medium">
              ${(50 - total).toFixed(2)} away from free shipping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}