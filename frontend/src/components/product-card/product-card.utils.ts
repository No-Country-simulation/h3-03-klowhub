export const formatPrice = (price: number) => {
  const formatted = new Intl.NumberFormat('de-DE').format(price);
  return formatted
};
