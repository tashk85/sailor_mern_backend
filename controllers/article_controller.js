const ArticleModel = require("../database/models/article_model");
const { fetchArticleBodyExtract } = require("./../services/rss_service")
const { extract } = require("article-parser");

async function show(req, res) {
    let { id } = req.params;
    let article = await ArticleModel.findById(id);
    return res.send({ article });
}

async function create(req, res) {
    const { url } = req.body;

    try {
        const article = await fetchArticleBodyExtract(url);
        await ArticleModel.create({
            date_posted: article.publishedTime || 0,
            metadata: {
                title: article.title,
                author: article.author,
                source: article.source,
                url: article.url,
                image: article.image,
                // rssCategories: item.categories,
                // localCategories: importCategories
            },
            article_body: article.content.replace(/<\/*html>|<\/*body>/g, "")

        })
        console.log(`article added: ${article.title}`)
    } catch(error) {
        console.log("***************************  Ignore if E11000: article has already been saved to database  ********************************");
        console.log(`Error: ${error}`);
    } 
}

module.exports = {
    show,
    create
}