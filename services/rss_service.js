const Parser = require("rss-parser");
const parser = new Parser();
const ArticleModel = require("./../database/models/article_model");
const { extract, extractWithEmbedly } = require("article-parser");

// Method that fetches article information from RSS feeds and saves data to database
async function fetchRSS(url) {
    let feed = await parser.parseURL(url);
    feed.items.forEach(async item => {        
        const articleURL = item.link;

        // We need to extract information slightly differently for the DHX feed due to its formatting
        const dhx = "https://www.digitalhx.com/feed/";
        let isDHX = false;
        if (url === dhx) {
            isDHX = true;
        }

        try {
            const article = await fetchArticleBodyEmbedly(articleURL);
            await ArticleModel.create({
                date_posted: item.pubDate,
                metadata: {
                    title: item.title,
                    author: item.creator,
                    source: feed.title,
                    url: item.link,
                    image: isDHX ? item.enclosure.url : article.image,
                    // rssCategories: item.categories,
                    // localCategories: importCategories
                },
                article_body: isDHX ? item['content:encoded'] : article.content
            })
        } catch(error) {
            console.log("***************************  Ignore if E11000: article has already been saved to database  ********************************");
            console.log(`Error: ${error}`);
        }
        isDHX = false;
    })
    return console.log("All articles saved to database");
};

// extract article body using embedly from article-parser
function fetchArticleBodyEmbedly(url) {
    return extractWithEmbedly(url)
        .then((article) => {
            return article;
        })
        .catch((error) => {
        console.log(error);
        });
}

// extract article body using extract from article-parser
function fetchArticleBodyExtract(url) {
    return extract(url)
        .then((article) => {
            return article;
        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = {
    fetchRSS,
    fetchArticleBodyExtract
}