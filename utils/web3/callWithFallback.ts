export async function callWithFallback<T = any>(
  getter: () => Promise<T>,
  fallback: T | null = null,
) {
  try {
    return getter()
  } catch (e) {
    return fallback
  }
}
