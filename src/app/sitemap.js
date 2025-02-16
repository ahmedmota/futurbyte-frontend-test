import { getAllRoutes } from "@/lib/helpers/generateSitemap";
 
export default async function sitemap() {
    const allRoutes = await getAllRoutes()
    return allRoutes.map(item => ({
        url: item,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    }))
}