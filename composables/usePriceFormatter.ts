/**
 * Composable pour formater les prix.
 *
 * @returns {Object} - Une méthode pour formater les prix.
 */
export function usePriceFormatter() {
  const locale = "fr-FR";
  /**
   * Formate le prix donné selon la locale et la devise spécifiées.
   *
   * @param {number} priceInCents - Le prix en centimes à formater.   * @param {string} locale - La locale à utiliser pour le formatage (par défaut 'fr-FR').
   * @param {string} currency - La devise à utiliser pour le formatage (par défaut 'EUR').
   * @returns {string} - Le prix formaté.
   */
  const formatPrice = (priceInCents: number = 0, currency: string = "EUR"): string => {
    const priceInEuros = priceInCents / 100;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(priceInEuros);
  };

  /**
   * Formate le prix donné selon la locale et la devise spécifiées, sans inclure les centimes.
   *
   * @param {number} priceInCents - Le prix en centimes à formater.
   * @param {string} currency - La devise à utiliser pour le formatage (par défaut 'EUR').
   * @returns {string} - Le prix formaté sans centimes.
   */
  const formatPriceWithoutCents = (priceInCents: number, currency: string = "EUR"): string => {
    const priceInEuros = priceInCents / 100;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(priceInEuros);
  };

  return { formatPrice, formatPriceWithoutCents };
}
