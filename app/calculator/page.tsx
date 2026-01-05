import { GoldCalculator } from '../components/ui/GoldCalculator';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            ماشین حساب طلا
          </h1>
          <p className="text-gray-400">
            ابزارهای محاسبه قیمت طلا، اجرت، سود و تبدیل عیار
          </p>
        </div>

        <GoldCalculator />
      </div>
    </div>
  );
}
