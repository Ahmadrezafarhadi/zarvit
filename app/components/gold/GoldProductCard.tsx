"use client";

import React, { useState } from 'react';
import { GoldProduct } from '../../types/goldProduct';
import { Button } from '../ui/Button';
import { GoldImagePlaceholder } from '../ui/GoldImagePlaceholder';
import { formatCurrency } from '../../utils/numberFormat';
import { useCart } from '../../contexts/CartContext';

interface GoldProductCardProps {
  product: GoldProduct;
  onAddToOrder: (product: GoldProduct) => void;
}

export const GoldProductCard: React.FC<GoldProductCardProps> = ({
  product,
  onAddToOrder
}) => {
  const { addToCart, isInCart } = useCart();
  const [isSelected, setIsSelected] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const inCart = isInCart(product.id);

  const handleAddToOrder = () => {
    setIsSelected(true);
    addToCart(product);

    setTimeout(() => setIsSelected(false), 2000);
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  return (
    <div
      className={`
        bg-card-bg border border-border rounded-xl p-6 shadow-lg
        transition-all duration-200 ease-out gold-shadow
        ${isSelected ? 'ring-2 ring-success bg-success/5 gold-shadow' : ''}
        ${isPressed ? 'scale-95 shadow-md' : 'hover:scale-[1.02] hover:shadow-xl'}
        cursor-pointer touch-feedback
      `}
      dir="rtl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Product Image */}
      <div className="relative aspect-square mb-4 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        <GoldImagePlaceholder
          type={product.image as 'ring' | 'necklace' | 'bracelet' | 'earring' | 'coin' | 'bar'}
          className="w-full h-full transition-transform duration-300 hover:scale-105"
          width={200}
          height={200}
        />
        {product.note && (
          <div className="absolute top-2 right-2 bg-primary text-background px-2 py-1 rounded-md text-sm font-medium gold-text-shadow">
            {product.note}
          </div>
        )}
      </div>

      {/* Product Name */}
      <h3 className="text-white font-bold text-lg mb-3 text-right leading-tight">
        {product.name}
      </h3>

      {/* Gold Specifications */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">عیار طلا:</span>
          <span className="text-white font-semibold">{product.purity}K</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">وزن:</span>
          <span className="text-white font-semibold">{product.weight} گرم</span>
        </div>
      </div>

      {/* Price - Most Visually Dominant */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4 text-center">
        <div className="text-primary text-2xl font-bold">
          {formatCurrency(product.price, 'تومان')}
        </div>
      </div>

      {/* Add to Order Button */}
      <Button
        onClick={handleAddToOrder}
        size="lg"
        className={`
          w-full min-h-[56px] text-lg font-bold kiosk-touch-target
          transition-all duration-200
          ${isSelected ? 'bg-success hover:bg-success/90' : inCart ? 'bg-primary/20 border-primary text-primary' : 'gold-gradient hover:shadow-lg'}
        `}
        disabled={isSelected}
      >
        {isSelected ? 'افزوده شد ✓' : inCart ? 'در سبد خرید ✓' : 'افزودن به سفارش'}
      </Button>
    </div>
  );
};
