'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/lib/store/cartSlice';
import { CartItem as CartItemType } from '@/types/product';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {toast} from 'react-toastify';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.success('Item removed from cart');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="w-20 h-20 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 line-clamp-2 mb-2">
            {item.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${item.price}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>

                <span className="px-3 py-1 font-medium min-w-[3rem] text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleRemove}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}