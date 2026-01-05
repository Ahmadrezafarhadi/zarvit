"use client";

import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { formatNumber, formatCurrency, formatPercentage, parseNumber } from '../../utils/numberFormat';

// Types
type TabType = 'final-price' | 'making-fee' | 'profit-loss' | 'karat-conversion';
type ModeType = 'buy' | 'sell';
type FeeType = 'percent' | 'fixed';
type GoldType = '18' | '24';

interface TabProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface FinalPriceCalculatorProps {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
}

interface CalculationResult {
  basePrice: number;
  makingFee: number;
  sellerProfit: number;
  vat: number;
  finalPrice: number;
}

// Tab Component
const Tab: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'final-price' as TabType, label: 'محاسبه قیمت نهایی' },
    { id: 'making-fee' as TabType, label: 'محاسبه اجرت' },
    { id: 'profit-loss' as TabType, label: 'سود / زیان' },
    { id: 'karat-conversion' as TabType, label: 'تبدیل عیار' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveTab(tab.id)}
          className="flex-1 min-w-0"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

// Final Price Calculator Component
const FinalPriceCalculator: React.FC<FinalPriceCalculatorProps> = ({ mode, setMode }) => {
  const [goldType, setGoldType] = useState<GoldType>('18');
  const [weight, setWeight] = useState<string>('');
  const [pricePerGram, setPricePerGram] = useState<string>('');
  const [makingFeeValue, setMakingFeeValue] = useState<string>('');
  const [makingFeeType, setMakingFeeType] = useState<FeeType>('percent');
  const [sellerProfitPercent, setSellerProfitPercent] = useState<string>('5');
  const [vatPercent, setVatPercent] = useState<string>('9');

  const calculation = useMemo((): CalculationResult | null => {
    const weightNum = parseNumber(weight);
    const priceNum = parseNumber(pricePerGram);
    const feeValueNum = parseNumber(makingFeeValue);
    const profitNum = parseNumber(sellerProfitPercent);
    const vatNum = parseNumber(vatPercent);

    if (!weightNum || !priceNum) return null;

    const basePrice = weightNum * priceNum;
    const makingFee = makingFeeType === 'percent'
      ? basePrice * (feeValueNum / 100)
      : feeValueNum;

    const sellerProfit = basePrice * (profitNum / 100);
    const taxableAmount = makingFee + sellerProfit;
    const vat = taxableAmount * (vatNum / 100);

    const finalPrice = mode === 'buy'
      ? basePrice + makingFee + sellerProfit + vat
      : basePrice - sellerProfit;

    return {
      basePrice,
      makingFee: isNaN(makingFee) ? 0 : makingFee,
      sellerProfit,
      vat,
      finalPrice
    };
  }, [weight, pricePerGram, makingFeeValue, makingFeeType, sellerProfitPercent, vatPercent, mode]);

  const goldTypeOptions = [
    { value: '18', label: '18 عیار' },
    { value: '24', label: '24 عیار' }
  ];

  const feeTypeOptions = [
    { value: 'percent', label: 'درصد (%)' },
    { value: 'fixed', label: 'مبلغ ثابت (ریال)' }
  ];

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={mode === 'buy' ? 'primary' : 'secondary'}
          onClick={() => setMode('buy')}
          className="flex-1"
        >
          خرید
        </Button>
        <Button
          variant={mode === 'sell' ? 'primary' : 'secondary'}
          onClick={() => setMode('sell')}
          className="flex-1"
        >
          فروش
        </Button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            نوع طلا
          </label>
          <Select
            value={goldType}
            onChange={(value) => setGoldType(value as GoldType)}
            options={goldTypeOptions}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            وزن (گرم)
          </label>
          <Input
            type="number"
            placeholder="مثال: ۱۰"
            value={weight}
            onChange={setWeight}
            suffix="گرم"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            قیمت هر گرم (ریال)
          </label>
          <Input
            type="number"
            placeholder="مثال: ۲۵۰۰۰۰۰"
            value={pricePerGram}
            onChange={setPricePerGram}
            suffix="ریال"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            اجرت ساخت
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="مثال: ۵"
              value={makingFeeValue}
              onChange={setMakingFeeValue}
              className="flex-1"
            />
            <Select
              value={makingFeeType}
              onChange={(value) => setMakingFeeType(value as FeeType)}
              options={feeTypeOptions}
              className="w-32"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            سود فروشنده (%)
          </label>
          <Input
            type="number"
            placeholder="۵"
            value={sellerProfitPercent}
            onChange={setSellerProfitPercent}
            suffix="%"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            مالیات بر ارزش افزوده (%)
          </label>
          <Input
            type="number"
            placeholder="۹"
            value={vatPercent}
            onChange={setVatPercent}
            suffix="%"
          />
        </div>
      </div>

      {/* Results */}
      {calculation && (
        <div className="bg-background border border-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">قیمت خام:</span>
            <span className="text-white">{formatCurrency(calculation.basePrice)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">اجرت ساخت:</span>
            <span className="text-white">{formatCurrency(calculation.makingFee)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">سود فروشنده:</span>
            <span className="text-white">{formatCurrency(calculation.sellerProfit)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">مالیات:</span>
            <span className="text-white">{formatCurrency(calculation.vat)}</span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">مبلغ نهایی:</span>
            <span className="text-lg font-bold text-primary">{formatCurrency(calculation.finalPrice)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Making Fee Calculator Component
const MakingFeeCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [pricePerGram, setPricePerGram] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<string>('');

  const calculation = useMemo(() => {
    const weightNum = parseNumber(weight);
    const priceNum = parseNumber(pricePerGram);
    const finalNum = parseNumber(finalPrice);

    if (!weightNum || !priceNum || !finalNum) return null;

    const basePrice = weightNum * priceNum;
    const makingFee = finalNum - basePrice;
    const makingFeePercent = basePrice > 0 ? (makingFee / basePrice) * 100 : 0;

    return {
      makingFeeAmount: makingFee,
      makingFeePercent: makingFeePercent
    };
  }, [weight, pricePerGram, finalPrice]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            وزن (گرم)
          </label>
          <Input
            type="number"
            placeholder="۱۰"
            value={weight}
            onChange={setWeight}
            suffix="گرم"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            قیمت هر گرم (ریال)
          </label>
          <Input
            type="number"
            placeholder="۲۵۰۰۰۰۰"
            value={pricePerGram}
            onChange={setPricePerGram}
            suffix="ریال"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            مبلغ نهایی فاکتور (ریال)
          </label>
          <Input
            type="number"
            placeholder="۲۶۰۰۰۰۰"
            value={finalPrice}
            onChange={setFinalPrice}
            suffix="ریال"
          />
        </div>
      </div>

      {calculation && (
        <div className="bg-background border border-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">مبلغ اجرت:</span>
            <span className="text-white">{formatCurrency(calculation.makingFeeAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">درصد اجرت:</span>
            <span className="text-white">{formatPercentage(parseFloat(calculation.makingFeePercent.toFixed(2)))}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Profit Loss Calculator Component
const ProfitLossCalculator: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<string>('');

  const calculation = useMemo(() => {
    const buyNum = parseNumber(buyPrice);
    const weightNum = parseNumber(weight);
    const currentNum = parseNumber(currentPrice);

    if (!buyNum || !weightNum || !currentNum) return null;

    const buyTotal = buyNum * weightNum;
    const currentTotal = currentNum * weightNum;
    const difference = currentTotal - buyTotal;
    const percentageChange = buyTotal > 0 ? (difference / buyTotal) * 100 : 0;

    return {
      profitLossAmount: difference,
      percentageChange: percentageChange,
      isProfit: difference >= 0
    };
  }, [buyPrice, weight, currentPrice]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            قیمت خرید هر گرم (ریال)
          </label>
          <Input
            type="number"
            placeholder="۲۵۰۰۰۰۰"
            value={buyPrice}
            onChange={setBuyPrice}
            suffix="ریال"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            وزن (گرم)
          </label>
          <Input
            type="number"
            placeholder="۱۰"
            value={weight}
            onChange={setWeight}
            suffix="گرم"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            قیمت فعلی هر گرم (ریال)
          </label>
          <Input
            type="number"
            placeholder="۲۶۰۰۰۰۰"
            value={currentPrice}
            onChange={setCurrentPrice}
            suffix="ریال"
          />
        </div>
      </div>

      {calculation && (
        <div className="bg-background border border-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">مبلغ سود/زیان:</span>
            <span className={`text-lg font-semibold ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(Math.abs(calculation.profitLossAmount))} {calculation.isProfit ? 'سود' : 'زیان'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">درصد تغییر:</span>
            <span className={`font-semibold ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(parseFloat(Math.abs(calculation.percentageChange).toFixed(2)))} {calculation.isProfit ? '↗' : '↘'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Karat Conversion Calculator Component
const KaratConversionCalculator: React.FC = () => {
  const [sourceKarat, setSourceKarat] = useState<GoldType>('18');
  const [pricePerGram, setPricePerGram] = useState<string>('');

  const calculation = useMemo(() => {
    const priceNum = parseNumber(pricePerGram);

    if (!priceNum) return null;

    const convertedPrice = sourceKarat === '18'
      ? (priceNum * 24) / 18  // Convert 18k to 24k
      : (priceNum * 18) / 24; // Convert 24k to 18k

    return {
      convertedPrice,
      targetKarat: sourceKarat === '18' ? '24' : '18'
    };
  }, [sourceKarat, pricePerGram]);

  const karatOptions = [
    { value: '18', label: '18 عیار' },
    { value: '24', label: '24 عیار' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            عیار مبدا
          </label>
          <Select
            value={sourceKarat}
            onChange={(value) => setSourceKarat(value as GoldType)}
            options={karatOptions}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            قیمت هر گرم (ریال)
          </label>
          <Input
            type="number"
            placeholder="۲۵۰۰۰۰۰"
            value={pricePerGram}
            onChange={setPricePerGram}
            suffix="ریال"
          />
        </div>
      </div>

      {calculation && (
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">قیمت {calculation.targetKarat} عیار:</span>
            <span className="text-lg font-semibold text-primary">
              {formatCurrency(calculation.convertedPrice)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Main GoldCalculator Component
export const GoldCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('final-price');
  const [mode, setMode] = useState<ModeType>('buy');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'final-price':
        return <FinalPriceCalculator mode={mode} setMode={setMode} />;
      case 'making-fee':
        return <MakingFeeCalculator />;
      case 'profit-loss':
        return <ProfitLossCalculator />;
      case 'karat-conversion':
        return <KaratConversionCalculator />;
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="transition-opacity duration-200">
        {renderTabContent()}
      </div>
    </Card>
  );
};
