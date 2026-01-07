"use client";

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { GoldImagePlaceholder } from '../ui/GoldImagePlaceholder';
import { formatCurrency } from '../../utils/numberFormat';

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  weight: number;
  purity: number;
  price: number;
  quantity: number;
  note?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  image,
  weight,
  purity,
  price,
  quantity,
  note
}) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const itemTotal = price * quantity;

  return (
    <div className="bg-card-bg border border-border rounded-lg p-4 shadow-sm" dir="rtl">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
          <GoldImagePlaceholder
            type={image as 'ring' | 'necklace' | 'bracelet' | 'earring' | 'coin' | 'bar'}
            className="w-full h-full"
            width={80}
            height={80}
          />
        </div>

        {/* Product Details */}
        <div className="grow">
          <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>

          {note && (
            <p className="text-primary text-sm mb-2">{note}</p>
          )}

          <div className="text-sm text-gray-300 space-y-1">
            <div>عیار: {purity}K</div>
            <div>وزن: {weight} گرم</div>
            <div>قیمت واحد: {formatCurrency(price, 'تومان')}</div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleQuantityChange(quantity - 1)}
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 flex items-center justify-center"
              disabled={quantity <= 1}
            >
              -
            </Button>

            <span className="text-white font-semibold min-w-8 text-center">
              {quantity}
            </span>

            <Button
              onClick={() => handleQuantityChange(quantity + 1)}
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 flex items-center justify-center"
            >
              +
            </Button>
          </div>

          {/* Total Price */}
          <div className="text-primary font-bold text-lg">
            {formatCurrency(itemTotal, 'تومان')}
          </div>
        </div>

        {/* Remove Button */}
        <div className="shrink-0">
          <Button
            onClick={handleRemove}
            variant="outline"
            size="sm"
            className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};
