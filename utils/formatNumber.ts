export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export function formatPopulation(population: number): string {
  if (population >= 1_000_000) {
    return (population / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' million';
  }
  if (population >= 1_000) {
    return (population / 1_000).toFixed(0) + 'K';
  }
  return population.toLocaleString();
}

export function formatPrice(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
