"use client";

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { CartItem } from '../cart/CartItem';
import { formatCurrency } from '../../utils/numberFormat';
import Link from 'next/link';
import { FaShoppingCart, FaTrash, FaCreditCard } from 'react-icons/fa';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice, clearCart, removeFromCart } = useCart();

  if (!isOpen) return null;

  const handleQuickCheckout = () => {
    // In a real kiosk, this would open a payment modal or redirect to payment
    alert('در حال حاضر امکان تسویه حساب آنلاین وجود ندارد. لطفا با فروشنده تماس بگیرید.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-card-bg border border-border rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FaShoppingCart className="text-primary text-lg" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">سبد خرید</h3>
              <p className="text-gray-400 text-sm">{totalItems} محصول</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </div>

        {/* Cart Items */}
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center">
              <FaShoppingCart className="text-gray-500 text-4xl mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">سبد خرید شما خالی است</p>
              <p className="text-gray-500 text-sm">محصولات مورد نظر خود را انتخاب کنید</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {item.category === 'ring' && '💍'}
                        {item.category === 'necklace' && '📿'}
                        {item.category === 'bracelet' && '📿'}
                        {item.category === 'coin' && '🪙'}
                        {item.category === 'earring' && '💎'}
                        {item.category === 'bar' && '🏆'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-gray-400 text-xs">{item.weight} گرم • {item.purity}K</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold text-sm">
                        {formatCurrency(item.price * item.quantity, 'تومان')}
                      </span>
                      <Button
                        onClick={() => {
                          // Quick remove for kiosk - no confirmation needed for fast ordering
                          removeFromCart(item.id);
                        }}
                        variant="outline"
                        size="sm"
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white p-1"
                      >
                        <FaTrash size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">مجموع:</span>
              <span className="text-primary font-bold text-lg">
                {formatCurrency(totalPrice, 'تومان')}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={clearCart}
                variant="outline"
                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
              >
                پاک کردن سبد
              </Button>

              <Button
                onClick={handleQuickCheckout}
                className="gold-gradient hover:shadow-lg flex items-center gap-2"
              >
                <FaCreditCard size={14} />
                تسویه حساب
              </Button>
            </div>

            {/* View Full Cart Link */}
            <Link href="/cart" onClick={onClose}>
              <Button variant="outline" size="sm" className="w-full text-center">
                مشاهده سبد کامل
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
