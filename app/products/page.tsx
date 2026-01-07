
"use client";

import React from 'react';
import { goldProducts } from '../data/goldProducts';
import { GoldProductGrid } from '../components/gold/GoldProductGrid';
import { useCart } from '../contexts/CartContext';

const ProductsPage = () => {
  const { addToCart, totalItems } = useCart();

  const handleAddToOrder = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-card-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              محصولات طلایی
            </h1>
            <p className="text-gray-300 text-lg">
              انتخاب بهترین محصولات طلا با بهترین قیمت
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Grid */}
        <GoldProductGrid
          products={goldProducts}
          onAddToOrder={handleAddToOrder}
        />

      </main>

      {/* Footer Note */}
      <div className="border-t border-border bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-gray-400 text-sm">
            تمامی قیمت‌ها به تومان و شامل مالیات ارزش افزوده می‌باشد
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
