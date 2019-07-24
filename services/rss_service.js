const Parser = require("rss-parser");
const parser = new Parser();
const ArticleModel = require("./../database/models/article_model");
const InterestModel = require("./../database/models/interest_model");
const { extract, extractWithEmbedly } = require("article-parser");

// Method that generates random interests to push into article interests
function generateRandomInterests() {
    const interestTags = InterestModel.schema.path('tag').enumValues;
    let numOfInterests = Math.floor(Math.random() * 3 + 1);
    let randomInterests = [];

    for(let i = 0; i <= numOfInterests; i++) {
        let interest = interestTags[Math.floor(Math.random()*interestTags.length)];
        if (!randomInterests.includes(interest)) {
            randomInterests.push(interest);
        }
    }

    return randomInterests;
}

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
                },
                article_body: isDHX ? item['content:encoded'] : article.content,
                interests: generateRandomInterests()
            })
        } catch(error) {
            if (error.message.includes("E11000")) {
                console.log("***  This article already exists in the database ***");
            } else if (error.message.includes("article_body: Path `article_body`")) {
                console.log ("*** Article with missing content cannot be saved in database ***")
            } else {
                console.log(`Error: ${error}`);
            }
        }
        isDHX = false;
    })
    
    return console.log("All Articles saved to database");
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