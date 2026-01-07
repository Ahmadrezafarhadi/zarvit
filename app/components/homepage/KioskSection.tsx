"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaClock, FaCreditCard, FaCheckCircle, FaArrowLeft, FaShoppingCart, FaGem, FaStar } from 'react-icons/fa';
import { CartSummarySection } from './CartSummarySection';
import { goldProducts } from '../../data/goldProducts';
import { GoldImagePlaceholder } from '../ui/GoldImagePlaceholder';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/numberFormat';
import { useCart } from '../../contexts/CartContext';
import Link from 'next/link';

export const KioskSection: React.FC = () => {
  const { addToCart, isInCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const kioskFeatures = [
    {
      icon: <FaMobileAlt className="text-primary text-2xl" />,
      title: "لمسی و ساده",
      description: "صفحه نمایش لمسی برای انتخاب آسان محصولات"
    },
    {
      icon: <FaClock className="text-green-500 text-2xl" />,
      title: "سفارش سریع",
      description: "ثبت سفارش در کمتر از ۲ دقیقه"
    },
    {
      icon: <FaCreditCard className="text-blue-500 text-2xl" />,
      title: "پرداخت آسان",
      description: "پرداخت نقدی یا کارت اعتباری"
    },
    {
      icon: <FaCheckCircle className="text-purple-500 text-2xl" />,
      title: "تأیید فوری",
      description: "دریافت رسید و تأییدیه سفارش"
    }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? goldProducts.slice(0, 12)
    : goldProducts.filter(product => product.category === selectedCategory).slice(0, 12);

  const categories = [
    { id: 'all', title: 'همه محصولات', emoji: '✨' },
    { id: 'ring', title: 'حلقه‌ها', emoji: '💍' },
    { id: 'necklace', title: 'گردنبندها', emoji: '📿' },
    { id: 'bracelet', title: 'دستبندها', emoji: '💍' },
    { id: 'coin', title: 'سکه‌ها', emoji: '🪙' }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-card-bg via-background to-card-bg overflow-hidden" dir="rtl">
      {/* Luxury Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/2 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-20 right-20 w-32 h-px bg-linear-to-l from-primary/50 to-transparent"></div>
      <div className="absolute bottom-20 left-20 w-48 h-px bg-linear-to-r from-primary/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Luxury Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 border border-primary/20 rounded-full mb-6"
          >
            <FaGem className="text-primary text-3xl animate-pulse" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            کیوسک <span className="text-transparent bg-clip-text bg-linear-to-l from-primary via-amber-300 to-primary">سفارش‌گیری</span>
            <br />
            <span className="text-2xl md:text-3xl font-light text-gray-300">طلافروشی مدرن</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            تجربه خرید سریع و آسان با کیوسک‌های خودپرداز طلافروشی -
            بدون نیاز به حضور فروشنده، سفارش خود را ثبت کنید
          </motion.p>
        </motion.div>

        {/* Category Filter - Luxury Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-primary text-background shadow-lg shadow-primary/30'
                  : 'bg-card-bg border border-border text-gray-300 hover:border-primary/50 hover:text-primary'
              }`}
            >
              <span>{category.emoji}</span>
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Showcase - Luxury Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="group relative bg-card-bg border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Product Badge */}
              {product.note && (
                <div className="absolute -top-3 right-4 bg-primary text-background px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  {product.note}
                </div>
              )}

              {/* Product Image - Luxury Design */}
              <div className="relative aspect-square mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-gray-200/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <GoldImagePlaceholder
                  type={product.image as any}
                  className="w-full h-full transition-all duration-500 group-hover:scale-110"
                  width={180}
                  height={180}
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="text-primary">⚖️</span>
                    {product.weight} گرم
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-amber-400">🔶</span>
                    {product.purity}K
                  </span>
                </div>

                {/* Price - Luxury Display */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                  <div className="text-primary font-black text-xl mb-1">
                    {formatCurrency(product.price, 'تومان')}
                  </div>
                  <div className="text-xs text-primary/70 font-medium">قیمت نهایی</div>
                </div>

                {/* Add to Cart Button - Luxury Design */}
                <Button
                  onClick={() => addToCart(product)}
                  size="sm"
                  className={`w-full min-h-[44px] font-bold transition-all duration-300 ${
                    isInCart(product.id)
                      ? 'bg-primary/20 border-primary text-primary hover:bg-primary hover:text-background'
                      : 'gold-gradient hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1'
                  }`}
                >
                  {isInCart(product.id) ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaShoppingCart />
                      در سبد خرید ✓
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaShoppingCart />
                      افزودن به سبد
                    </span>
                  )}
                </Button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cart Summary Section - After Products */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="mt-16"
        >
          <CartSummarySection />
        </motion.div>

        {/* Spacer between cart and features */}
        <div className="mt-20"></div>

        {/* Features & How It Works - Luxury Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kiosk Features - Luxury Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-right">
              <h3 className="text-3xl font-bold text-white mb-4">چرا کیوسک سفارش‌گیری؟</h3>
              <p className="text-gray-400 leading-relaxed">با فناوری مدرن زرماوا، تجربه خرید طلایی خود را متحول کنید</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {kioskFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="group bg-gradient-to-r from-card-bg to-background border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How It Works - Luxury Steps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-right">
              <h3 className="text-3xl font-bold text-white mb-4">چگونه کار می‌کند؟</h3>
              <p className="text-gray-400 leading-relaxed">چهار مرحله ساده برای سفارش طلای شما</p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-8">
              <div className="space-y-6">
                {[
                  { step: "۱", title: "محصولات را انتخاب کنید", desc: "از طریق صفحه لمسی محصولات مورد نظر خود را انتخاب کنید" },
                  { step: "۲", title: "سبد خرید خود را بررسی کنید", desc: "محصولات انتخاب شده را بررسی و تأیید کنید" },
                  { step: "۳", title: "پرداخت خود را انجام دهید", desc: "پرداخت نقدی یا با کارت اعتباری انجام دهید" },
                  { step: "۴", title: "رسید خود را دریافت کنید", desc: "رسید دیجیتال دریافت کرده و سفارش خود را پیگیری کنید" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center font-black text-lg shadow-lg">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats & CTA - Luxury Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-card-bg via-background to-card-bg border border-border rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                تجربه خرید مدرن در فروشگاه‌های طلا
              </h3>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                با کیوسک‌های هوشمند زرماوا، مشتریان می‌توانند بدون نیاز به حضور فروشنده،
                محصولات را انتخاب کرده و سفارش خود را ثبت کنند.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { value: "24/7", label: "دسترسی شبانه‌روزی", icon: "🕐" },
                { value: "۲ دقیقه", label: "زمان ثبت سفارش", icon: "⚡" },
                { value: "۱۰۰٪", label: "دقت در سفارش", icon: "🎯" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  className="text-center p-6 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-colors"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-black text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="text-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="gold-gradient hover:shadow-2xl hover:shadow-primary/20 px-8 py-4 text-lg font-bold transform hover:-translate-y-1 transition-all duration-300"
                >
                  مشاهده همه محصولات
                  <FaArrowLeft className="mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
