"use client";

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { CartItem } from '../cart/CartItem';
import { formatCurrency } from '../../utils/numberFormat';
import Link from 'next/link';
import { FaShoppingCart, FaTrash, FaCreditCard, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const CartSummarySection: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart, removeFromCart } = useCart();

  const handleCheckout = () => {
    // In a real application, this would integrate with payment processing
    alert('در حال حاضر امکان تسویه حساب آنلاین وجود ندارد. لطفا با فروشنده تماس بگیرید.');
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-card-bg to-background border border-border rounded-3xl p-8 text-center shadow-2xl"
      >
        <div className="max-w-md mx-auto">
          <FaShoppingCart className="text-6xl text-gray-500 mx-auto mb-6 opacity-50" />
          <h3 className="text-2xl font-bold text-white mb-4">سبد خرید شما خالی است</h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            محصول مورد نظر خود را از بالا انتخاب کنید و به سبد خرید اضافه کنید
          </p>
          <div className="text-primary font-semibold text-lg">
            محصولات را انتخاب کنید ←
          </div>
        </div>
      </motion.div>
    );
  }

  const taxRate = 0.09; // 9% VAT
  const subtotal = totalPrice;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  return (
    <div className="bg-gradient-to-r from-card-bg to-background border border-border rounded-3xl p-8 shadow-2xl">
      {/* Cart Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pb-6 border-b border-border"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <FaShoppingCart className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">سبد خرید شما</h3>
            <p className="text-gray-400">{totalItems} محصول انتخاب شده</p>
          </div>
        </div>

        <Button
          onClick={() => {
            if (window.confirm('آیا از پاک کردن تمام محصولات اطمینان دارید؟')) {
              clearCart();
            }
          }}
          variant="outline"
          size="sm"
          className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white flex items-center gap-2"
        >
          <FaTrash size={14} />
          پاک کردن سبد
        </Button>
      </motion.div>

      {/* Cart Items */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8 max-h-96 overflow-y-auto"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background/50 border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  {item.category === 'ring' && '💍'}
                  {item.category === 'necklace' && '📿'}
                  {item.category === 'bracelet' && '💍'}
                  {item.category === 'coin' && '🪙'}
                  {item.category === 'earring' && '💎'}
                  {item.category === 'bar' && '🏆'}
                </span>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-lg truncate mb-1">{item.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{item.weight} گرم</span>
                  <span>{item.purity}K</span>
                  <span>×{item.quantity}</span>
                </div>
              </div>

              {/* Price and Remove */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-primary font-bold text-lg">
                    {formatCurrency(item.price * item.quantity, 'تومان')}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatCurrency(item.price, 'تومان')} هر عدد
                  </div>
                </div>

                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white p-2"
                >
                  <FaTrash size={12} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Price Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6"
      >
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>جمع کل:</span>
            <span className="font-semibold">{formatCurrency(subtotal, 'تومان')}</span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>مالیات ارزش افزوده (۹%):</span>
            <span className="font-semibold">{formatCurrency(tax, 'تومان')}</span>
          </div>

          <div className="border-t border-primary/30 pt-3">
            <div className="flex justify-between text-white font-bold text-xl">
              <span>مجموع نهایی:</span>
              <span className="text-primary">{formatCurrency(finalTotal, 'تومان')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={handleCheckout}
          size="lg"
          className="flex-1 gold-gradient hover:shadow-2xl hover:shadow-primary/20 text-lg font-bold py-4 flex items-center justify-center gap-3"
        >
          <FaCreditCard size={18} />
          تسویه حساب
        </Button>

        <Link href="/cart" className="flex-1">
          <Button
            size="lg"
            variant="outline"
            className="w-full text-lg font-semibold py-4 flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-colors"
          >
            مشاهده سبد کامل
            <FaArrowLeft size={16} />
          </Button>
        </Link>
      </motion.div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-gray-400 text-sm"
      >
        تمامی قیمت‌ها شامل مالیات ارزش افزوده می‌باشد • امکان پرداخت نقدی یا کارت اعتباری
      </motion.div>
    </div>
  );
};
