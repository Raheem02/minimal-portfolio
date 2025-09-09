const basePath = process.env.NODE_ENV === 'production' ? '/Portfolio' : ''

export const assetPath = (path) => `${basePath}${path}`
