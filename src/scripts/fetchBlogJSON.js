function extractBlogData(doc) {
    const title = doc.querySelector('h1')?.textContent?.trim() || '';
    const short_description = doc.querySelector('p')?.textContent?.trim() || '';
    const categoryTag = doc.querySelector('a[rel="category tag"]')
    const category = categoryTag?.textContent?.trim() || '';
    const tagElements = doc.querySelectorAll('a[rel="tag"]');
    const tags = Array.from(tagElements).reduce((acc, el) => {
        const tagText = el.textContent.trim();
        if (tagText && !acc.includes(tagText)) {
            acc.push(tagText);
        }
        return acc;
    }, []);
    const author_name = doc.querySelector('.elementor-author-box__name')?.textContent?.trim() || null;
    const author_bio = doc.querySelector(".elementor-author-box__bio")?.textContent?.trim() || null;
    const authorProfile = doc.querySelector('.elementor-author-box__avatar img')?.getAttribute('src') || null;
    const published_date = doc.querySelector('head meta[property="article:published_time"]')?.getAttribute('content') || null;
    const last_updated_date = doc.querySelector('head meta[property="article:modified_time"]')?.getAttribute('content') || null;
    const time_to_read = doc.querySelector('head meta[name="twitter:data2"]')?.getAttribute('content') || "~5 mins";

    const featured_image = {
        url: doc.querySelector('head meta[property="og:image"]')?.getAttribute('content') || null,
        width: doc.querySelector('head meta[property="og:image:width"]')?.getAttribute('content') || null,
        height: doc.querySelector('head meta[property="og:image:height"]')?.getAttribute('content') || null,
        alternativeText: doc.querySelector('head meta[property="og:image:alt"]')?.getAttribute('content') || null,
        mimeType: doc.querySelector('head meta[property="og:image:type"]')?.getAttribute('content') || null,
    }

    return {
        title,
        category,
        short_description,
        published_date,
        last_updated_date,
        time_to_read,
        featured_image,
        tags: tags.map(tag => ({ label: tag })),
        author_name,
        author_image: { url: authorProfile },
        author_description: author_bio,
    };
}

function extractFAQs(doc) {
    let faqQuestionElements = doc.querySelectorAll('span.eael-accordion-tab-title');
    let faqAnswerElements = doc.querySelectorAll('.eael-accordion-content');
    if (faqQuestionElements.length === 0 || faqAnswerElements.length === 0) {
        faqQuestionElements = doc.querySelectorAll('a.elementor-accordion-title');
        faqAnswerElements = doc.querySelectorAll('.elementor-tab-content p');
    }
    const faqCount = Math.min(faqQuestionElements.length, faqAnswerElements.length);
    const faqs = [];
    for (let i = 0; i < faqCount; i++) {
        const question = faqQuestionElements[i]?.textContent?.trim() || `Question ${i + 1}`;
        const answer = faqAnswerElements[i]?.textContent?.trim() || `Answer for question ${i + 1}`;
        faqs.push({ question, answer });
    }
    return faqs;
}

function extractPosts(doc) {
    const postElements = doc.querySelectorAll('article.elementor-post');
    return Array.from(postElements).map((article, index) => {
        const titleElement = article.querySelector('h3.elementor-post__title a');
        const postTitle = titleElement?.textContent?.trim() || `Post Title ${index + 1}`;
        const shortDescElement = article.querySelector('div.elementor-post__excerpt p');
        const shortDescription = shortDescElement?.textContent?.trim() || '';
        const featuredImgElement = article.querySelector('a.elementor-post__thumbnail__link img');
        const featuredImageUrl = featuredImgElement?.getAttribute('src') || null;
        const categoryElement = article.querySelector('div.vamtam-post__categories a[rel="category tag"]');
        const categoryLabel = categoryElement?.textContent?.trim() || null;
        const thumbnailLink = article.querySelector('a.elementor-post__thumbnail__link');
        const thumbnailHref = thumbnailLink?.getAttribute('href') || '';
        let slug = '';
        try {
            const urlObj = new URL(thumbnailHref);
            const pathname = urlObj.pathname.replace(/\/$/, '');
            const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
            slug = pathSegments[pathSegments.length - 1] || '';
        } catch (error) {
            slug = '';
        }
        return {
            title: postTitle,
            short_description: shortDescription,
            featured_image: { url: featuredImageUrl },
            category: { label: categoryLabel },
            slug: slug,
        };
    });
}

function extractListOfLinks(doc) {
    const dataTable = doc.querySelector('table.eael-data-table');
    const listOfLinks = [];
    if (dataTable) {
        const rows = dataTable.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                const serviceElement = cells[0]?.querySelector('div.td-content-wrapper div.td-content');
                const serviceText = serviceElement ? serviceElement.textContent.replace(/\s+/g, ' ').trim() : `Service ${index + 1}`;
                const description = cells[1]?.querySelector('div.td-content-wrapper div.td-content p')?.textContent?.trim() || '';
                const resourceLink = cells[2]?.querySelector('div.td-content-wrapper div.td-content p a')?.getAttribute('href') || '';
                const resourceLabel = cells[2]?.querySelector('div.td-content-wrapper div.td-content p a')?.textContent?.trim() || '';
                let slug = '';
                try {
                    const urlObj = new URL(resourceLink);
                    const pathname = urlObj.pathname.replace(/\/$/, '');
                    const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
                    slug = pathSegments[pathSegments.length - 1] || '';
                } catch (error) {
                    slug = '';
                }
                listOfLinks.push({
                    service: serviceText,
                    description: description,
                    resources: { slug, label: resourceLabel },
                });
            }
        });
    }
    return listOfLinks;
}

function extractAdditionalCTAs(doc) {
    const firstCTATitle = doc.querySelector('div.elementor-element-97bc4d2')?.textContent?.trim() || '';
    const firstCTABtnTxt = doc.querySelector('.elementor-element-b85d98c')?.textContent?.trim() || '';
    const firstCTA = { title: firstCTATitle, buttonTxt: firstCTABtnTxt, buttonLink: '#' };
    const secondCTATitle = doc.querySelector('div.elementor-element-94424f0')?.textContent?.trim() || '';
    const secondCTABtnTxt = doc.querySelector('.elementor-element-21a3352')?.textContent?.trim() || '';
    const secondCTA = { title: secondCTATitle, buttonTxt: secondCTABtnTxt, buttonLink: '#' };
    return [firstCTA, secondCTA];
}

function extractHeadElements(doc) {
    const meta_title = doc.querySelector('head > title')?.textContent || 'No title found';
    const meta_description = doc.querySelector('head > meta[property="og:description"]')?.getAttribute('content') || null;
    const ldJsonScript = doc.querySelector('script[type="application/ld+json"]')?.textContent;


    let meta_keywords = null;

    if (ldJsonScript) {
        try {
            const ldJsonData = JSON.parse(ldJsonScript);
            const blogPosting = ldJsonData['@graph']?.find(item => item['@type'] === 'BlogPosting');
            if (blogPosting) {
                meta_keywords = blogPosting.keywords || null;
            }
        } catch (error) {
            console.error("Error parsing ld+json:", error);
        }
    }
    const seo = {
        meta_title,
        meta_description,
        meta_keywords
    }

    return seo
}

async function parseHtmlToJson(doc) {
    try {
        const seo = extractHeadElements(doc)
        const blogData = extractBlogData(doc);
        const faqs = extractFAQs(doc);
        const posts = extractPosts(doc);
        const listOfLinks = extractListOfLinks(doc);
        const additionalCTAs = extractAdditionalCTAs(doc);
        return { seo, blogData, faqs, posts, listOfLinks, additionalCTAs };
    } catch (err) {
        console.log(err)
        return null;
    }
}

module.exports = { parseHtmlToJson };