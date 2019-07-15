const Parser= require("rss-parser");
const axios = require("axios");
const parser = new Parser();
const ArticleModel = require("./../database/models/article_model");
const { extract, extractWithEmbedly } = require("article-parser");

async function RssMedCity() {
    let feed = await parser.parseURL("https://medcitynews.com/feed/");

    feed.items.forEach(async item => {
        // console.log(item.title);
        // console.log(item.creator);
        // console.log(item.link);
        // console.log(item.pubDate);
        // console.log(item.contentSnippet);
        // console.log(item.categories);
        await ArticleModel.create({
            date_posted: item.pubDate,
            metadata: {
                title: item.title,
                author: item.creator,
                source: "Med City",
                url: item.link,
                categories: item.categories
            }
        })
        console.log("one article saved")
    })
     return console.log("all articles saved to database");
};

// async function registerCreate(req, res, next) {
//     const { email, password, firstName,lastName } = req.body;
//     const user = await UserModel.create({ email, password, firstName, lastName });
//     req.login(user,(error) => {
//         if (error) {
//             return next(error);
//         }
//         const token = JWTService.generateToken(user);
//         return res.json({ token }); 
//         // return res.redirect("user/interests");  
//     })   


// }

// async function RssHealthCareIT() {
//     let feed = await parser.parseURL("https://www.healthcareitnews.com/most_popular/feed");

//     feed.items.forEach(item => {
//         console.log(item.title);
//         console.log(item.creator);
//         console.log(item.link);
//         console.log(item.pubDate);
//         console.log(item.contentSnippet);
//         console.log(item.categories);
//     })
//      return console.log(feed);

// };

// function IndividualArticle() {
//     axios.get("https://medcitynews.com/2019/07/kroger-partners-with-myriad-genetics-on-genetic-testing-pilot")
//     .then(response => {
//         let feed = parser.parseString(response.data);
//         return console.log(feed);
//     })
//     .catch(error=>{
//         return console.log(error);
//     });
// }

// function getIndividualArticle() {
//     let url = "https://medcitynews.com/2019/07/kroger-partners-with-myriad-genetics-on-genetic-testing-pilot";

    // let url = "https://www.healthcareitnews.com/news/apple-watches-ai-help-docs-dictate-austin-regional-saving-2-hours-day";

    // let url = "https://www.digitalhx.com/news/patients-push-for-digital-transformation-in-general-practice/";

    // let url = "https://www.digitalhx.com/news/psychological-claims-at-work-why-they-cost-so-much-and-why-you-need-to-prevent-them/";

    // extract(url).then((article) => {
    //     console.log(article);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })

    // extractWithEmbedly(url).then((article) => {
    //     console.log(article);
    //    }).catch((err) => {
    //     console.log(err);
    //    });
// }




module.exports = {
    RssMedCity,
    // RssHealthCareIT
    // IndividualArticle,
    // getIndividualArticle

}