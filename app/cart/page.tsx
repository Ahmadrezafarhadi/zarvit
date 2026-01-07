"use client";
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Button } from '../components/ui/Button';

const CartPage = () => {
  const { items, totalItems, clearCart } = useCart();

  const handleCheckout = () => {
    alert('در حال حاضر امکان تسویه حساب آنلاین وجود ندارد. لطفا با فروشنده تماس بگیرید.');
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-card-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                سبد خرید
              </h1>
              <p className="text-gray-300 text-lg">
                مدیریت محصولات انتخاب شده
              </p>
            </div>

            <Link href="/products">
              <Button variant="outline" className="flex items-center gap-2">
                <span>بازگشت به محصولات</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="bg-card-bg border border-border rounded-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                سبد خرید شما خالی است
              </h2>
              <p className="text-gray-400 mb-6">
                محصولات مورد نظر خود را از فروشگاه اضافه کنید
              </p>
              <Link href="/products">
                <Button size="lg" className="gold-gradient">
                  مشاهده محصولات
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  محصولات ({totalItems})
                </h2>
                <Button
                  onClick={() => {
                    if (window.confirm('آیا از پاک کردن تمام محصولات اطمینان دارید؟')) {
                      clearCart();
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  پاک کردن همه
                </Button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    weight={item.weight}
                    purity={item.purity}
                    price={item.price}
                    quantity={item.quantity}
                    note={item.note}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <CartSummary onCheckout={handleCheckout} />
              </div>
            </div>
          </div>
        )}
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

export default CartPage;
