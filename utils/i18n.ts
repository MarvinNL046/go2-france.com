/**
 * Safely resolve an i18n value that may be either a plain string or an object with language keys.
 * Returns the English string, or falls back to the first available value, or empty string.
 *
 * Examples:
 *   resolveI18n("Hello")               => "Hello"
 *   resolveI18n({ en: "Hello" })        => "Hello"
 *   resolveI18n({ en: "Hello", fr: "Bonjour" })  => "Hello"
 *   resolveI18n(undefined)              => ""
 *   resolveI18n(null)                   => ""
 */
export function resolveI18n(value: any, locale: string = 'en'): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    // Try requested locale first, then English, then first available value
    return value[locale] || value.en || Object.values(value).find(v => typeof v === 'string') || '';
  }
  return String(value);
}
