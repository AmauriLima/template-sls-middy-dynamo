export function sanitizeObject<O extends Record<string, any>>(object: O = {} as O) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    return {
      ...acc,
      [key]: value
    }
  }, {})
}
