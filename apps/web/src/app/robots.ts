import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // mengizinkan semua bot/crawler(mesin pencari data otomatis browser) mengcrawl web kita
      allow: '/', // mengizinkan bot/crawler mengcrawling data dimulai dari path /
      disallow: '/worker/', // menolak bot/crawler mesin pencari untuk mengcrawling data saat pathname dimulai dari /admin
    },
    
    sitemap: process.env.NEXT_PUBLIC_BASE_URL + '/sitemap.xml',
  }
}