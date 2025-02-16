export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/cgi-bin/',
        },
        sitemap: `${process.env.NEXT_PUBLIC_FE_ORIGIN}/sitemap.xml`,
    }
}