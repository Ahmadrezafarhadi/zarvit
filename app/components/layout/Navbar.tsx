"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaCashRegister,
  FaBoxes,
  FaClipboardList,
  FaSearch,
  FaBell,
  FaSignOutAlt,
  FaChevronDown,
  FaGem,
  FaCog,
  FaUser,
  FaWallet,
  FaUserPlus,
  FaSignInAlt,
  FaChartLine,
  FaCalculator,
  FaNewspaper,
} from "react-icons/fa";
import { HiSparkles, HiMenuAlt3, HiX } from "react-icons/hi";

// Types
interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  authRequired?: boolean;
}

interface UserInfo {
  name: string;
  role: string;
  avatar?: string;
}

// Data
// منوی عمومی (برای همه کاربرا نمایش داده میشه)
const publicMenuItems: MenuItem[] = [
  { title: "صفحه اصلی", href: "/", icon: <FaHome size={18} /> },
  { title: "قیمت لحظه‌ای", href: "/prices", icon: <FaChartLine size={18} /> },
  { title: "محاسبه‌گر", href: "/calculator", icon: <FaCalculator size={18} /> },
  { title: "اخبار", href: "/news", icon: <FaNewspaper size={18} /> },
];

// منوی خصوصی (برای کاربران لاگین شده فقط نمایش داده میشه)
const privateMenuItems: MenuItem[] = [
  { title: "داشبورد", href: "/dashboard", icon: <FaHome size={18} /> },
  { title: "فروش حضوری", href: "/pos", icon: <FaCashRegister size={18} /> },
  { title: "محصولات", href: "/products", icon: <FaBoxes size={18} /> },
  { title: "سفارشات", href: "/orders", icon: <FaClipboardList size={18} />, badge: 3 },
];

// Animation Variants
const menuItemVariants = {
  closed: { y: 20, opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05 },
  }),
};

// Logo Component
const Logo: React.FC = () => (
  <Link href="/" className="flex items-center gap-3 group">
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-11 h-11 bg-linear-to-br from-primary to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-shadow duration-300"
    >
      <FaGem className="text-background text-lg" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-1 -right-1"
      >
        <HiSparkles className="text-primary text-sm" />
      </motion.div>
    </motion.div>
    <div className="hidden sm:block">
      <motion.h1 className="font-black text-xl text-white group-hover:text-primary transition-colors duration-300">
        زرماوا
      </motion.h1>
      <span className="text-[10px] text-primary/70 font-medium tracking-wider">
        ZARMAVA GOLD
      </span>
    </div>
  </Link>
);

// Desktop Menu Item
const DesktopMenuItem: React.FC<{ item: MenuItem; isActive: boolean }> = ({
  item,
  isActive,
}) => (
  <motion.li whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
    <Link
      href={item.href}
      className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-primary bg-primary/15 shadow-sm shadow-primary/10" : "text-gray-400 hover:text-white hover:bg-card-bg"}`}
    >
      <span className={isActive ? "text-primary" : ""}>{item.icon}</span>
      <span>{item.title}</span>
      {item.badge && (
        <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full px-1">
          {item.badge}
        </span>
      )}
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-sm shadow-primary"
        />
      )}
    </Link>
  </motion.li>
);

// Icon Button
const IconButton: React.FC<{
  icon: React.ReactNode;
  badge?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ icon, badge, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 bg-transparent hover:text-white hover:bg-card-bg transition-all duration-300 cursor-pointer ${className}`}
  >
    {icon}
    {badge && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-background"
      />
    )}
  </motion.button>
);

// Auth Buttons (برای کاربران لاگین نشده)
const AuthButtons: React.FC = () => (
  <div className="flex items-center gap-2">
    {/* دکمه ورود */}
    <Link href="/login">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-300 hover:text-white border border-border hover:border-primary/50 hover:bg-card-bg transition-all duration-300 cursor-pointer"
      >
        <FaSignInAlt size={14} />
        <span className="text-sm font-medium">ورود</span>
      </motion.button>
    </Link>

    {/* دکمه ثبت نام */}
    <Link href="/register">
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 164, 0, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-background font-bold bg-linear-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300 cursor-pointer"
      >
        <FaUserPlus size={14} />
        <span className="text-sm">ثبت نام</span>
      </motion.button>
    </Link>
  </div>
);

// Mobile Auth Buttons
const MobileAuthButtons: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex gap-3 w-full">
    <Link href="/login" onClick={onClose} className="flex-1">
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-white font-medium border border-border hover:border-primary/50 hover:bg-card-bg transition-all duration-300 cursor-pointer"
      >
        <FaSignInAlt size={16} />
        <span>ورود</span>
      </motion.button>
    </Link>
    <Link href="/register" onClick={onClose} className="flex-1">
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-background font-bold bg-linear-to-r from-primary to-amber-500 shadow-lg shadow-primary/30 transition-all duration-300 cursor-pointer"
      >
        <FaUserPlus size={16} />
        <span>ثبت نام</span>
      </motion.button>
    </Link>
  </div>
);

// User Profile Button (برای کاربران لاگین شده)
const UserProfile: React.FC<{
  user: UserInfo;
  showDetails?: boolean;
  onLogout: () => void;
}> = ({ user, showDetails = true, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-card-bg transition-all duration-300 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300">
          <span className="text-primary font-bold text-sm">
            {user.name.charAt(0)}
          </span>
        </div>
        {showDetails && (
          <>
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="hidden lg:block text-gray-500"
            >
              <FaChevronDown size={12} />
            </motion.div>
          </>
        )}
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-56 z-50 bg-card-bg border border-border rounded-xl shadow-xl shadow-black/20 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-border bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                    <span className="text-primary font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {[
                  { icon: <FaUser size={14} />, title: "پروفایل من", href: "/profile" },
                  { icon: <FaWallet size={14} />, title: "کیف پول", href: "/wallet" },
                  { icon: <FaCog size={14} />, title: "تنظیمات", href: "/settings" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-background/50 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <div className="p-2 border-t border-border">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                >
                  <FaSignOutAlt size={14} />
                  <span className="text-sm">خروج از حساب</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu
const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  isLoggedIn: boolean;
  user: UserInfo | null;
  onLogout: () => void;
}> = ({ isOpen, onClose, pathname, isLoggedIn, user, onLogout }) => {
  const menuItems = isLoggedIn ? privateMenuItems : publicMenuItems;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background md:hidden flex flex-col"
        >
          <div className="h-16" />

          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            {/* Header - نمایش بر اساس وضعیت لاگین */}
            {isLoggedIn && user ? (
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <span className="text-primary font-bold text-xl">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-lg text-white">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center border-2 border-primary/30">
                  <FaGem className="text-primary text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg text-white">زرماوا</p>
                  <p className="text-sm text-gray-500">خوش آمدید</p>
                </div>
              </div>
            )}

            {/* Quick Stats - فقط برای کاربران لاگین شده */}
            {isLoggedIn && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-card-bg rounded-2xl text-center">
                  <p className="text-2xl font-bold text-primary">۱۲۳</p>
                  <p className="text-sm text-gray-500 mt-1">سفارش</p>
                </div>
                <div className="p-4 bg-card-bg rounded-2xl text-center">
                  <p className="text-2xl font-bold text-green-500">۴۵</p>
                  <p className="text-sm text-gray-500 mt-1">محصول</p>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <ul className="space-y-3">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <motion.li
                    key={item.href}
                    custom={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`relative flex items-center gap-4 p-4 rounded-2xl font-medium transition-all duration-300 ${isActive ? "text-background bg-linear-to-r from-primary to-amber-500 shadow-lg shadow-primary/30" : "text-gray-400 hover:text-white bg-card-bg"}`}
                    >
                      <span className={isActive ? "text-background" : ""}>
                        {item.icon}
                      </span>
                      <span className="text-base">{item.title}</span>
                      {item.badge && (
                        <span className={`mr-auto min-w-[24px] h-[24px] flex items-center justify-center text-xs font-bold rounded-full px-2 ${isActive ? "bg-background/30 text-background" : "bg-red-500 text-white"}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Footer - بر اساس وضعیت لاگین */}
            <div className="mt-auto pt-6">
              {isLoggedIn ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl text-red-400 bg-red-500/10 hover:bg-red-500/20 font-medium transition-all duration-300 cursor-pointer"
                >
                  <FaSignOutAlt size={18} />
                  <span>خروج از حساب</span>
                </motion.button>
              ) : (
                <MobileAuthButtons onClose={onClose} />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Search Modal
const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
        >
          <div className="bg-card-bg border border-border rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-border">
              <FaSearch className="text-primary text-xl" />
              <input
                type="text"
                placeholder="جستجو در محصولات، قیمت‌ها..."
                autoFocus
                className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-background transition-all cursor-pointer"
              >
                <HiX size={24} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">جستجوی محبوب</p>
              <div className="flex flex-wrap gap-2">
                {["طلای ۱۸ عیار", "سکه امامی", "شمش طلا", "نیم سکه"].map((item) => (
                  <button
                    key={item}
                    className="px-3 py-1.5 bg-background rounded-lg text-sm text-gray-400 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Main Navbar Component
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // وضعیت لاگین - این را با سیستم احراز هویت واقعی جایگزین خواهم کرد
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  // شبیه‌سازی چک کردن وضعیت لاگین
  useEffect(() => {
    // در اینجا باید از API یا localStorage چک کنید
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
        setUser({
          name: "کاربر تست",
          role: "مدیر سیستم",
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // تابع لاگین (برای تست)
  const handleLogin = () => {
    localStorage.setItem("authToken", "test-token");
    setIsLoggedIn(true);
    setUser({
      name: "کاربر تست",
      role: "مدیر سیستم",
    });
  };

  // تابع خروج
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // انتخاب منو بر اساس وضعیت لاگین
  const menuItems = isLoggedIn ? privateMenuItems : publicMenuItems;

  if (!isMounted) {
    return (
      <>
        <nav className="fixed top-0 right-0 left-0 z-50 h-16 bg-background border-b border-border" />
        <div className="h-16" />
      </>
    );
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${isScrolled ? "shadow-lg shadow-primary/5" : ""}`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Logo />

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <DesktopMenuItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                />
              ))}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <IconButton
                icon={<FaSearch size={16} />}
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex"
              />

              {/* اگر لاگین کرده: نوتیفیکیشن و پروفایل */}
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <IconButton
                    icon={<FaBell size={16} />}
                    badge={true}
                    className="hidden sm:flex"
                  />

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-8 bg-border mx-1" />

                  {/* User Profile */}
                  <div className="hidden sm:block">
                    <UserProfile user={user!} onLogout={handleLogout} />
                  </div>
                </>
              ) : (
                <>
                  {/* Divider */}
                  <div className="hidden sm:block w-px h-8 bg-border mx-1" />

                  {/* Auth Buttons */}
                  <div className="hidden sm:flex">
                    <AuthButtons />
                  </div>
                </>
              )}

              {/* Mobile Menu Button */}
              <IconButton
                icon={isMenuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              />
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary to-transparent origin-center"
        />
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Spacer */}
      <div className="h-16" />

      {/* دکمه تست برای تغییر وضعیت لاگین - در پروداکشن حذف خواهد شد */}
      <button
        onClick={() => (isLoggedIn ? handleLogout() : handleLogin())}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-all cursor-pointer"
      >
        {isLoggedIn ? "🔓 تست خروج" : "🔐 تست ورود"}
      </button>
    </>
  );
};

export default Navbar;