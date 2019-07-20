const ArticleModel = require("../database/models/article_model");
const UserModel = require("../database/models/user_model");
const { fetchArticleBodyExtract } = require("./../services/rss_service")
const { extract } = require("article-parser");

// API to show individual article
async function show(req, res, next) {
    let { id } = req.params;
    //find the article
    let article = await ArticleModel.findById(id);
    // send back all users' first&last name&userId for mention functions
    
    let users = await UserModel.find({});
//     let allUsers = {"default": "none"};
//    console.log(`before sending users: ${allUsers}`);
    
    users.forEach((user)=>{
        delete user.lastName;
        console.log(`test delete:${user}`);
    })

    console.log(`retrieved users: ${users}`);
    // console.log(`send to front users infor: ${allUsers}`);

    return res.send({ article});
    // return res.send({ article, users});
}

// API to add an article - available only to admin users
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
        return res.json({ article })
    } catch(error) {
        console.log("***************************  Ignore if E11000: article has already been saved to database  ********************************");
        console.log(`Error: ${error}`);
        return res.json({ error: error.code })
    } 
}

module.exports = {
    show,
    create
}