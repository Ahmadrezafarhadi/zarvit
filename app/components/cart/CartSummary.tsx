"use client";

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/numberFormat';

interface CartSummaryProps {
  showCheckout?: boolean;
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  showCheckout = true,
  onCheckout
}) => {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-card-bg border border-border rounded-lg p-6 text-center" dir="rtl">
        <div className="text-gray-400 text-lg mb-2">سبد خرید شما خالی است</div>
        <div className="text-gray-500 text-sm">محصولات مورد نظر خود را اضافه کنید</div>
      </div>
    );
  }

  const taxRate = 0.09; // 9% 
  const subtotal = totalPrice;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      alert('در حال حاضر امکان تسویه حساب آنلاین وجود ندارد. لطفا با فروشنده تماس بگیرید.');
    }
  };

  const handleClearCart = () => {
    if (window.confirm('آیا از پاک کردن تمام محصولات سبد خرید اطمینان دارید؟')) {
      clearCart();
    }
  };

  return (
    <div className="bg-card-bg border border-border rounded-lg p-6" dir="rtl">
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold text-lg">
          سبد خرید ({totalItems} محصول)
        </h3>
        <Button
          onClick={handleClearCart}
          variant="outline"
          size="sm"
          className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
        >
          پاک کردن سبد
        </Button>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>جمع کل:</span>
          <span>{formatCurrency(subtotal, 'تومان')}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>مالیات ارزش افزوده (۹%):</span>
          <span>{formatCurrency(tax, 'تومان')}</span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-white font-bold text-xl">
            <span>مجموع نهایی:</span>
            <span className="text-primary">{formatCurrency(finalTotal, 'تومان')}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      {showCheckout && (
        <Button
          onClick={handleCheckout}
          size="lg"
          className="w-full gold-gradient hover:shadow-lg text-lg font-bold min-h-[56px]"
        >
          تسویه حساب
        </Button>
      )}

      {/* Additional Info */}
      <div className="mt-4 text-center text-gray-400 text-xs">
        تمامی قیمت‌ها شامل مالیات ارزش افزوده می‌باشد
      </div>
    </div>
  );
};
