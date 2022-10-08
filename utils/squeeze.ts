export function squeeze(value: string): string {
  return value.toLowerCase().replace(/[\s-]+/g, '')
}
