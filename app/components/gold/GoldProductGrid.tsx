"use client";

import React from 'react';
import { GoldProduct } from '../../types/goldProduct';
import { GoldProductCard } from './GoldProductCard';

interface GoldProductGridProps {
  products: GoldProduct[];
  onAddToOrder: (product: GoldProduct) => void;
}

export const GoldProductGrid: React.FC<GoldProductGridProps> = ({
  products,
  onAddToOrder
}) => {
  return (
    <div className="w-full">
      {/* Grid Layout - Responsive for different screen sizes */}
      <div className="
        grid gap-6
        grid-cols-1     /* Mobile: 1 column */
        sm:grid-cols-2  /* Small tablet: 2 columns */
        md:grid-cols-3  /* Desktop: 3 columns */
        lg:grid-cols-4  /* Large screens/Kiosk: 4 columns */
        xl:grid-cols-4  /* Extra large: maintain 4 columns */
      ">
        {products.map((product) => (
          <GoldProductCard
            key={product.id}
            product={product}
            onAddToOrder={onAddToOrder}
          />
        ))}
      </div>

      {/* Empty state when no products */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            هیچ محصولی یافت نشد
          </div>
        </div>
      )}
    </div>
  );
};
