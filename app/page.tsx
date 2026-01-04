"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGem,
  FaRocket,
  FaPlay,
  FaCheckCircle,
  FaUsers,
  FaStore,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import { HiSparkles, HiArrowLeft } from "react-icons/hi";
import { BsStars } from "react-icons/bs";

// Types
interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Feature {
  icon: React.ReactNode;
  text: string;
}

interface Particle {
  id: number;
  left: string;
  delay: number;
  size: number;
}

// Data
const stats: Stat[] = [
  {
    icon: <FaUsers size={24} />,
    value: "+۵۰۰",
    label: "طلافروش فعال",
  },
  {
    icon: <FaStore size={24} />,
    value: "+۱۲۰۰",
    label: "فروشگاه آنلاین",
  },
  {
    icon: <FaChartLine size={24} />,
    value: "+۹۸٪",
    label: "رضایت مشتریان",
  },
];

const features: Feature[] = [
  { icon: <FaCheckCircle />, text: "راه‌اندازی سریع در کمتر از ۱۰ دقیقه" },
  { icon: <FaCheckCircle />, text: "بدون نیاز به دانش فنی" },
  { icon: <FaCheckCircle />, text: "پشتیبانی تخصصی ۲۴ ساعته" },
  { icon: <FaCheckCircle />, text: "امنیت بالا و تضمین شده" },
];

// Gold Particles Component
const GoldParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const generatedParticles = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: i * 0.2,
      size: Math.random() * 3 + 1,
    }));
    setParticles(generatedParticles);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ top: "100%", opacity: 0 }}
          animate={{
            top: "-10%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Shapes Component
const FloatingShapes: React.FC = () => (
  <>
    {/* Large Gradient Orbs */}
    <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

    {/* Decorative Lines */}
    <div className="absolute top-40 right-20 w-32 h-px bg-linear-to-r from-primary/50 to-transparent" />
    <div className="absolute bottom-40 left-20 w-48 h-px bg-linear-to-l from-primary/50 to-transparent" />
  </>
);

// Stat Card Component
const StatCard: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 + 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative p-6 bg-card-bg/50 backdrop-blur-sm border border-border 
               rounded-2xl text-center group hover:border-primary/50 transition-all"
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative">
      <div
        className="inline-flex p-3 bg-primary/10 rounded-xl text-primary mb-4 
                      group-hover:bg-primary group-hover:text-background transition-all"
      >
        {stat.icon}
      </div>
      <h4 className="text-3xl font-black text-white mb-1">{stat.value}</h4>
      <p className="text-gray-400 text-sm">{stat.label}</p>
    </div>
  </motion.div>
);

// Floating Badge Component - جدا شده برای جلوگیری از ارور
const FloatingBadge: React.FC<{
  children: React.ReactNode;
  className: string;
  floatDelay?: number;
  floatDirection?: "up" | "down";
}> = ({ children, className, floatDelay = 0, floatDirection = "up" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.6 + floatDelay }}
    className={className}
  >
    <motion.div
      animate={{
        y: floatDirection === "up" ? [0, -10, 0] : [0, 10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// Avatar Section Component - اصلاح شده
const AvatarSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="relative"
  >
    {/* Main Avatar Container */}
    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
      {/* Rotating Border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
      />

      {/* Second Rotating Border */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-primary/20"
      />

      {/* Glow Effect */}
      <div className="absolute inset-8 bg-linear-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />

      {/* Avatar Image Container */}
      <div
        className="absolute inset-8 bg-linear-to-br from-card-bg to-background 
                      rounded-full border-2 border-border overflow-hidden
                      shadow-2xl shadow-primary/10"
      >
        {/* Replace with your actual image */}
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-transparent">
          <FaGem className="text-primary text-7xl opacity-50" />
        </div>

        {/* Uncomment this to use actual image */}
        {/* <Image
          src="/avatar.png"
          alt="Zarmava Platform"
          fill
          className="object-cover"
        /> */}
      </div>

      {/* Floating Badges - اصلاح شده */}
      <FloatingBadge
        className="absolute top-10 -left-4"
        floatDelay={0}
        floatDirection="up"
      >
        <div className="p-3 bg-card-bg border border-border rounded-xl shadow-lg flex items-center gap-2">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <FaShieldAlt className="text-green-400" />
          </div>
          <span className="text-white text-sm font-medium">امنیت بالا</span>
        </div>
      </FloatingBadge>

      <FloatingBadge
        className="absolute bottom-20 -right-4"
        floatDelay={1}
        floatDirection="down"
      >
        <div className="p-3 bg-card-bg border border-border rounded-xl shadow-lg flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg">
            <FaRocket className="text-primary" />
          </div>
          <span className="text-white text-sm font-medium">راه‌اندازی سریع</span>
        </div>
      </FloatingBadge>

      <FloatingBadge
        className="absolute bottom-5 left-10"
        floatDelay={0.5}
        floatDirection="up"
      >
        <div className="p-3 bg-card-bg border border-border rounded-xl shadow-lg flex items-center gap-2">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FaUsers className="text-blue-400" />
          </div>
          <span className="text-white text-sm font-medium">+۵۰۰ مشتری</span>
        </div>
      </FloatingBadge>

      {/* Sparkle Icons */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-5 right-10"
      >
        <HiSparkles className="text-primary text-2xl" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-10 right-5"
      >
        <BsStars className="text-primary text-xl" />
      </motion.div>
    </div>
  </motion.div>
);

// Main Hero Component
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <GoldParticles />
      <FloatingShapes />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,164,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,164,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <div className="relative container mx-auto px-4 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 
                         border border-primary/30 rounded-full mb-8"
            >
              <HiSparkles className="text-primary animate-pulse" />
              <span className="text-primary text-sm font-medium">
                پلتفرم تخصصی صنف طلا
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              <span className="text-white">پلتفرمی که زبان</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-l from-primary to-amber-300">
                صنف طلا را می‌فهمد
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white/90 mb-6"
            >
              فروش شما را <span className="text-primary">ساده</span> و{" "}
              <span className="text-primary">سریع</span> می‌کند
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              زرماوا با درک نیازهای ویژه صنف طلا و جواهر، بستری ساده، سریع و امن
              برای ورود به فروش آنلاین فراهم کرده است. در این مسیر، ما کنار شما
              هستیم تا ورود خود به فضای آنلاین را بدون پیچیدگی و در کمترین زمان
              شروع کنید.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3 mb-10 max-w-lg mx-auto lg:mx-0"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <span className="text-primary">{feature.icon}</span>
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Primary Button */}
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-linear-to-r from-primary to-amber-500 
                           text-background font-bold text-lg rounded-xl
                           shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
                           transition-all overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    شروع رایگان
                    <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  </span>
                  {/* Shine Effect */}
                  <div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent 
                                  -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                </motion.button>
              </Link>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-card-bg border border-border 
                         text-white font-bold text-lg rounded-xl
                         hover:border-primary/50 hover:bg-card-bg/80
                         transition-all flex items-center gap-3 cursor-pointer"
              >
                <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <FaPlay className="text-primary text-sm" />
                </div>
                مشاهده دمو
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Avatar/Image Section */}
          <AvatarSection />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 mb-6">مورد اعتماد برترین‌های صنف طلا</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.1 }}
                className="w-32 h-12 bg-card-bg/50 border border-border rounded-lg 
                         flex items-center justify-center"
              >
                <FaGem className="text-gray-600 text-xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-sm">اسکرول کنید</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;