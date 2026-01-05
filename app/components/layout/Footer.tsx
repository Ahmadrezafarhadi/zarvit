"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGem,
  FaShieldAlt,
  FaMoneyBill,
  FaHeadset,
  FaCoins,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsArrowUpShort } from "react-icons/bs";

// Types
interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Particle {
  id: number;
  left: string;
  delay: number;
}

//  Data 
const footerSections: FooterSection[] = [
  {
    title: "دسترسی سریع",
    links: [
      { title: "صفحه اصلی", href: "/" },
      { title: "قیمت لحظه‌ای طلا", href: "/prices" },
      { title: "محاسبه‌گر طلا", href: "/calculator" },
      { title: "نمودار قیمت", href: "/charts" },
      { title: "اخبار بازار", href: "/news" },
    ],
  },
  {
    title: "محصولات",
    links: [
      { title: "طلای ۱۸ عیار", href: "/products/18k" },
      { title: "طلای ۲۴ عیار", href: "/products/24k" },
      { title: "سکه طلا", href: "/products/coins" },
      { title: "شمش طلا", href: "/products/bars" },
      { title: "جواهرات", href: "/products/jewelry" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { title: "خرید آنلاین", href: "/buy" },
      { title: "فروش طلا", href: "/sell" },
      { title: "ذخیره طلا", href: "/save" },
      { title: "مشاوره سرمایه‌گذاری", href: "/consult" },
      { title: "آموزش‌ها", href: "/learn" },
    ],
  },
  {
    title: "اطلاعات",
    links: [
      { title: "درباره ما", href: "/about" },
      { title: "تماس با ما", href: "/contact" },
      { title: "سوالات متداول", href: "/faq" },
      { title: "قوانین و مقررات", href: "/terms" },
      { title: "حریم خصوصی", href: "/privacy" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    icon: <FaInstagram size={20} />,
    href: "https://instagram.com",
    label: "اینستاگرام",
    color: "#E1306C",
  },
  {
    icon: <FaTelegram size={20} />,
    href: "https://telegram.org",
    label: "تلگرام",
    color: "#0088cc",
  },
  {
    icon: <FaWhatsapp size={20} />,
    href: "https://whatsapp.com",
    label: "واتساپ",
    color: "#25D366",
  },
  {
    icon: <FaTwitter size={20} />,
    href: "https://twitter.com",
    label: "توییتر",
    color: "#1DA1F2",
  },
  {
    icon: <FaYoutube size={20} />,
    href: "https://youtube.com",
    label: "یوتیوب",
    color: "#FF0000",
  },
  {
    icon: <FaLinkedin size={20} />,
    href: "https://linkedin.com",
    label: "لینکدین",
    color: "#0077B5",
  },
];

const features: Feature[] = [
  {
    icon: <FaShieldAlt size={28} />,
    title: "ضمانت اصالت",
    description: "تضمین کیفیت و اصالت کالا",
  },
  {
    icon: <FaMoneyBill size={28} />,
    title: "مناسب برای صنف طلا",
    description: "طراحی شده ویژه برای نیازهای صنف طلا و جواهر",
  },
  {
    icon: <FaHeadset size={28} />,
    title: "پشتیبانی ۲۴/۷",
    description: "پاسخگویی در تمام ساعات",
  },
  {
    icon: <FaCoins size={28} />,
    title: "قیمت منصفانه",
    description: "بهترین نرخ خرید و فروش",
  },
];

//  Gold Particles Component (Fixed Hydration)
const GoldParticles: React.FC = () => {
  const [particles] = useState<Particle[]>(() => {
    // تولید ذرات فقط در سمت کلاینت
    if (typeof window === 'undefined') return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: i * 0.3,
    }));
  });

  // رندر فقط در سمت کلاینت
  if (typeof window === 'undefined') return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-primary"
          style={{ left: particle.left }}
          initial={{ bottom: -10, opacity: 0 }}
          animate={{
            bottom: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

//  Newsletter Component 
const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-linear-to-r from-card-bg to-background 
                 border border-border rounded-2xl p-8 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Text Content */}
        <div className="text-center lg:text-right">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
            <HiSparkles className="text-primary text-2xl" />
            <h3 className="text-xl font-bold text-white">
              عضویت در خبرنامه طلایی
            </h3>
          </div>
          <p className="text-gray-400 text-sm">
            از آخرین قیمت‌ها و تحلیل‌های بازار طلا مطلع شوید
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید..."
              className="w-full px-5 py-3 bg-background border border-border rounded-xl
                       text-white placeholder-gray-500 focus:border-primary
                       focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-linear-to-r from-primary to-amber-500 
                     text-background font-bold rounded-xl whitespace-nowrap
                     hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            {isSubscribed ? "✓ ثبت شد" : "عضویت"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

//  Feature Card Component 
const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-4 p-4 bg-card-bg/50 rounded-xl
               border border-border/50 hover:border-primary/30 transition-all group"
  >
    <div
      className="p-3 bg-primary/10 rounded-lg text-primary
                    group-hover:bg-primary group-hover:text-background transition-all"
    >
      {feature.icon}
    </div>
    <div>
      <h4 className="font-bold text-white">{feature.title}</h4>
      <p className="text-sm text-gray-400">{feature.description}</p>
    </div>
  </motion.div>
);

// Social Button Component 
const SocialButton: React.FC<{ social: SocialLink; index: number }> = ({
  social,
  index,
}) => (
  <motion.a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="p-3 bg-card-bg border border-border rounded-xl text-gray-400
               hover:text-white transition-all group relative overflow-hidden"
    aria-label={social.label}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ backgroundColor: social.color }}
    />
    <span className="relative z-10">{social.icon}</span>
  </motion.a>
);

// Scroll To Top Button 
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 p-3 bg-linear-to-r from-primary to-amber-500
                 text-background rounded-xl shadow-lg shadow-primary/30 z-50
                 hover:shadow-primary/50 transition-all"
      aria-label="بازگشت به بالا"
    >
      <BsArrowUpShort size={28} />
    </motion.button>
  );
};

//  Main Footer Component 
const Footer: React.FC = () => {
  const [currentYear] = useState<number>(new Date().getFullYear());

  return (
    <footer className="relative bg-background overflow-hidden">
      {/* Gold Particles - Fixed */}
      <GoldParticles />

      {/* Top Decorative Border */}
      <div className="relative h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 pb-12">
        <Newsletter />
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-3 mb-6 group"
              >
                <div
                  className="relative w-14 h-14 bg-linear-to-br from-primary to-amber-600 
                              rounded-2xl flex items-center justify-center
                              group-hover:shadow-lg group-hover:shadow-primary/30 transition-all"
                >
                  <FaGem className="text-background text-2xl" />
                  <div className="absolute -top-1 -right-1">
                    <HiSparkles className="text-primary text-sm animate-pulse" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">زرماوا</h2>
                  <span className="text-xs text-primary">ZARMAVA GOLD</span>
                </div>
              </Link>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-6">
                زرماوا، معتبرترین مرجع خرید و فروش طلا و جواهرات در ایران. با
                سالها تجربه در صنعت طلا، ما بهترین خدمات و محصولات را با
                ضمانت اصالت به شما ارائه می‌دهیم.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <motion.a
                  href="tel:02112345678"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaPhoneAlt className="text-primary" />
                  </div>
                  <span className="font-medium" dir="ltr">
                    021-1234-5678
                  </span>
                </motion.a>

                <motion.a
                  href="mailto:info@zarmava.gold"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <span>info@zarmava.gold</span>
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <span></span>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaClock className="text-primary" />
                  </div>
                  <span></span>
                </motion.div>
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 }}
                  >
                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link.title}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: sectionIndex * 0.1 + linkIndex * 0.05,
                          }}
                        >
                          <Link
                            href={link.href}
                            className="text-gray-400 hover:text-primary transition-colors
                                     relative group flex items-center gap-2"
                          >
                            <span
                              className="w-0 h-0.5 bg-primary transition-all 
                                          group-hover:w-3"
                            />
                            {link.title}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges & Social Links */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {/* Enamad Badge */}
              <div
                className="w-20 h-20 bg-card-bg border border-border rounded-xl 
                           flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl text-primary mb-1">🛡️</div>
                  <span className="text-xs text-gray-500">ای‌نماد</span>
                </div>
              </div>

              {/* Samandehi Badge */}
              <div
                className="w-20 h-20 bg-card-bg border border-border rounded-xl 
                           flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl text-primary mb-1">✅</div>
                  <span className="text-xs text-gray-500">ساماندهی</span>
                </div>
              </div>

              {/* Senfi Badge */}
              <div
                className="w-20 h-20 bg-card-bg border border-border rounded-xl 
                           flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl text-primary mb-1">🏅</div>
                  <span className="text-xs text-gray-500">اتحادیه صنف</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <SocialButton key={social.label} social={social} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-card-bg/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm text-center md:text-right"
            >
              © {currentYear} زرماوا - تمامی حقوق محفوظ است.
              <span className="mx-2">|</span>
            طراحی و توسعه  with{" "}
              <span className="inline-block text-red-500">❤️</span>  
              <span>توسط </span>
              <Link href="https://www.linkedin.com/in/ahmadrezafarhadi">احمدرضا فرهادی</Link>
            </motion.p>
            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                قوانین و مقررات
              </Link>
              <span className="text-border">|</span>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                حریم خصوصی
              </Link>
              <span className="text-border">|</span>
              <Link
                href="/sitemap"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                نقشه سایت
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </footer>
  );
};

export default Footer;