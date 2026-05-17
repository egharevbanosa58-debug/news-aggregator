export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/', // This allows Google to see your site
      // No disallow needed for the dashboard because your metadata handles it!
    },
    sitemap: 'https://newslitenews.vercel.app/', // Replace with your real domain
  }
}