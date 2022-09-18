export function TextNameCouple(...names: string[]) {
  return names.map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }).join(" dan ")
}

export function DateLocale(date: string | Date): string {
  if (!date) return date + "";
  try {
    return new Date(date).toLocaleString()
  } catch (er) {
    return date + "";
  }
}

export function DateOnlyLocale(date: string | Date): string {
  if (!date) return date + "";
  try {
    return new Date(date).toLocaleDateString()
  } catch (er) {
    return date + "";
  }
}

export function CurrencyID(number: number | string, defaultVal?: any): string {
  if (!number) return defaultVal || "Rp 0"

  return Number(number).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}