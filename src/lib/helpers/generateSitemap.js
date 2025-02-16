import { getData } from '../api';

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'src/app');
const originUrl = process.env.NEXT_PUBLIC_FE_ORIGIN;

const getNonDynamicRoutes = () => {
    const routes = [];

    const walkDir = (dir, parent = '') => {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);
            const relativePath = path.join(parent, file);

            if (fs.statSync(filePath).isDirectory()) {
                if (file.includes('[') || file.includes(']') || file.includes('(') || file.includes(')')) {
                    return;
                }
                walkDir(filePath, relativePath);
            } else if (file === 'page.js') {
                let formattedRoute = relativePath
                    .replace('src/app', '')
                    .replace(/\/?page\.js$/, '')
                    .replace(/\\/g, '/')
                    .replace(/^\/+/g, '')
                    .replace(/\/+$/, '');

                const finalRoute = `${originUrl}/${formattedRoute}`;
                routes.push(finalRoute);
            }
        });
    };

    walkDir(pagesDir);
    return routes;
};

const getDynamicRoutes = async () => {
    const isCache = true
    const dynamicRoutesData = await getData("/web-development-main-page-headers?populate=*", isCache)
    const dynamicRotues = dynamicRoutesData.map((item) => `${originUrl}/${item.slug}`);
    return dynamicRotues
}

const getBlogRoutes = async () => {
    const isCache = true
    const dynamicBlogs = await getData("/blog-detail-blogs", isCache)
    const blogRoutes = dynamicBlogs.map((item) => `${originUrl}/blog/${item.slug}`)
    return blogRoutes

}

export const getAllRoutes = async () => {

    const nonDynamicRoutes = getNonDynamicRoutes();
    const blogRoutes = await getBlogRoutes()
    const dynamicRoutes = await getDynamicRoutes();

    return [...nonDynamicRoutes, ...dynamicRoutes, ...blogRoutes];
}