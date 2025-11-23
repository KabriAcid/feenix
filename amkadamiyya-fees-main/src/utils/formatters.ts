export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const formatDate = (date: Date | string, format: 'short' | 'long' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return d.toLocaleDateString('en-NG', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  }
  
  return d.toLocaleDateString('en-NG', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    weekday: 'long'
  });
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-NG');
};

export const formatPercent = (decimal: number): string => {
  return `${(decimal * 100).toFixed(1)}%`;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const calculateBalance = (total: number, paid: number): number => {
  return total - paid;
};

export const getPaymentStatus = (total: number, paid: number): 'paid' | 'partial' | 'unpaid' => {
  if (paid >= total) return 'paid';
  if (paid > 0) return 'partial';
  return 'unpaid';
};
