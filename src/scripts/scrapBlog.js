const { parseHtmlToJson } = require("./fetchBlogJSON");
const { modifyHTML } = require("./fetchCleanBlogs");
const { JSDOM } = require('jsdom');
const fs = require('fs').promises;
const { BlogURLs, ImageBlogURLs } = require("../lib/constants/blogURLs.js");


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function createJSON(url, imageBlogJSON) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const isImageBlog = imageBlogJSON[url]
        const htmlString = await response.text();
        const { window } = new JSDOM(htmlString);

        const resultInJSON = await parseHtmlToJson(window.document);
        const modifiedHTML = await modifyHTML({ document: window.document, nodeFilter: window.NodeFilter, isImageBlog });
        resultInJSON.blogData.blog_content = modifiedHTML;

        return resultInJSON;
    } catch (error) {
        console.error(`Error processing URL: ${url}`, error);
        return null;
    }
}

const imageBlogArrayToObject = (urls) => {
    const urlObject = {}

    urls.forEach((url) => {
        urlObject[url] = true
    })

    return urlObject
}


async function fetchDataInBatches(BlogURLs, imageBlogURLs, batchSize = 10, delayBetweenBatches = 50000) {
    try {
        const imageBlogsJSON = imageBlogArrayToObject(imageBlogURLs)
        let results = {};
        const BE_Results = []
        let report = {
            success: [],
            failed: []
        };

        try {
            const existingData = await fs.readFile('output.json', 'utf-8');
            const existingBEData = await fs.readFile('be-output.json', 'utf-8');
            results = JSON.parse(existingData);
            BE_Results = JSON.parse(existingBEData);
        } catch {
            console.log('No existing file found, creating a new one.');
        }

        for (let i = 0; i < BlogURLs.length; i += batchSize) {
            const batch = BlogURLs.slice(i, i + batchSize);

            console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(BlogURLs.length / batchSize)}`);

            await Promise.all(
                batch.map(async (url) => {
                    const slug = new URL(url).pathname.split('/').filter(Boolean).pop();
                    const resultInJSON = await createJSON(url, imageBlogsJSON);

                    if (resultInJSON) {
                        results[slug] = resultInJSON;
                        BE_Results.push({ ...resultInJSON, slug });
                        report.success.push(url);
                    } else {
                        report.failed.push(url);
                    }
                })
            );

            await fs.writeFile('output.json', JSON.stringify(results, null, 2));
            await fs.writeFile('be-output.json', JSON.stringify(BE_Results, null, 2));
            console.log(`Batch ${Math.floor(i / batchSize) + 1} completed.`);

            if (i + batchSize < BlogURLs.length) {
                console.log(`Waiting for ${delayBetweenBatches / 1000} seconds before next batch...`);
                await delay(delayBetweenBatches);
            }
        }

        const reportData = `
module.exports = {
    success: ${JSON.stringify(report.success, null, 2)},
    failed: ${JSON.stringify(report.failed, null, 2)}
};`;
        await fs.writeFile('report.js', reportData);
        console.log('Report saved to report.js');

        console.log('All blogs have been processed and saved to output.json');
    } catch (error) {
        console.error('Error processing batches:', error);
    }
}

fetchDataInBatches(BlogURLs, ImageBlogURLs, 50, 30000);
