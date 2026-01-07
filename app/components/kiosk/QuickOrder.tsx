"use client";

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { goldProducts } from '../../data/goldProducts';
import { GoldImagePlaceholder } from '../ui/GoldImagePlaceholder';
import { Button } from '../ui/Button';
import { MiniCart } from './MiniCart';
import { formatCurrency } from '../../utils/numberFormat';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

interface QuickOrderItem {
  product: any;
  quantity: number;
}

export const QuickOrder: React.FC = () => {
  const { addToCart, totalItems } = useCart();
  const [selectedItems, setSelectedItems] = useState<QuickOrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Show only popular/featured products for quick ordering
  const featuredProducts = goldProducts.slice(0, 6);

  const addToQuickOrder = (product: any) => {
    const existingItem = selectedItems.find(item => item.product.id === product.id);
    if (existingItem) {
      setSelectedItems(prev =>
        prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems(prev => [...prev, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setSelectedItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const addAllToCart = () => {
    selectedItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item.product);
      }
    });
    setSelectedItems([]);
    setIsCartOpen(true);
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="bg-card-bg border border-border rounded-2xl p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">سفارش سریع</h2>
          <p className="text-gray-400">محصولات محبوب را انتخاب و سفارش دهید</p>
        </div>

        {/* Cart Button */}
        <Button
          onClick={() => setIsCartOpen(true)}
          className="relative gold-gradient hover:shadow-lg"
          size="lg"
        >
          <FaShoppingCart className="ml-2" />
          سبد خرید
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {/* Quick Order Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {featuredProducts.map((product) => {
          const quickItem = selectedItems.find(item => item.product.id === product.id);
          const quantity = quickItem?.quantity || 0;

          return (
            <div
              key={product.id}
              className="bg-background/50 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              {/* Product Image */}
              <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <GoldImagePlaceholder
                  type={product.image as any}
                  width={80}
                  height={80}
                />
              </div>

              {/* Product Info */}
              <h3 className="text-white font-semibold text-sm mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-gray-400 text-xs mb-2">
                {product.weight} گرم • {product.purity}K
              </p>
              <p className="text-primary font-bold text-sm mb-3">
                {formatCurrency(product.price, 'تومان')}
              </p>

              {/* Quantity Controls */}
              {quantity > 0 ? (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 flex items-center justify-center"
                  >
                    <FaMinus size={12} />
                  </Button>
                  <span className="text-white font-semibold min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => addToQuickOrder(product)}
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 flex items-center justify-center"
                  >
                    <FaPlus size={12} />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => addToQuickOrder(product)}
                  size="sm"
                  className="w-full gold-gradient hover:shadow-lg"
                >
                  <FaPlus size={12} className="ml-1" />
                  افزودن
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Order Summary */}
      {selectedItems.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">
              انتخاب شده ({selectedItems.length} محصول)
            </h3>
            <span className="text-primary font-bold text-lg">
              {formatCurrency(getTotalPrice(), 'تومان')}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedItems([])}
              variant="outline"
              className="flex-1 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              پاک کردن
            </Button>
            <Button
              onClick={addAllToCart}
              className="flex-1 gold-gradient hover:shadow-lg"
            >
              افزودن به سبد
            </Button>
          </div>
        </div>
      )}

      {/* Mini Cart Modal */}
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
