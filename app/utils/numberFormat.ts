// Utility functions for number formatting

export const formatNumber = (num: number): string => {
  return num.toLocaleString('fa-IR');
};

export const parseNumber = (str: string): number => {
  // Remove Persian/Arabic digits and convert to English digits
  const englishDigits = str.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
  return parseFloat(englishDigits.replace(/,/g, '')) || 0;
};

export const formatCurrency = (amount: number, suffix: string = 'ریال'): string => {
  return `${formatNumber(amount)} ${suffix}`;
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage}%`;
};
