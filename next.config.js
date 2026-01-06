/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Aumenta o timeout da API para permitir scraping de múltiplas páginas
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

module.exports = nextConfig

