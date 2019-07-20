const ArticleModel = require("./../database/models/article_model");

// API to show articles according to date posted
async function index(req, res, next){
    const articles = await ArticleModel.find().sort({"date_posted": -1});
    const { user } = req;
    
    if (user.interests.length === 0) {
        return res.send({ articles });
    }

    let curatedArticles = {
        tag0: {
            articles: [],
            tag: ""
        },
        tag1: {
            articles: [],
            tag: ""
        },
        tag2: {
            articles: [],
            tag: ""
        },
        remainingArticles: []
    };

    let selectedInterests = [];

    if (user.interests.length <= 3) {
        selectedInterests = user.interests;
    } else {
        while (selectedInterests.length < 3) {
            let randomInterest = user.interests[Math.floor(Math.random()*user.interests.length)];
            if (!selectedInterests.includes(randomInterest)) {
                selectedInterests.push(randomInterest);
            }
        }
    }

    articles.forEach(article => {
        selectedInterests.forEach((interest, i) => {
            if (article.interests.includes(interest) && !curatedArticles[`tag${i}`].articles.includes(article) && curatedArticles[`tag${i}`].articles.length < 3) {
                curatedArticles[`tag${i}`].articles.push(article);
            } else {

            }           
        });
        curatedArticles.remainingArticles.push(article);
    });

    // ALTERNATIVElY:: iterate through interests first
    // selectedInterests.forEach((interest, i) => {
    //     articles.forEach(article => {
    //         if (article.interests.includes(interest) && !curatedArticles[`tag${i}`].articles.includes(article) && curatedArticles[`tag${i}`].articles.length < 3) {
    //             curatedArticles[`tag${i}`].articles.push(article);
    //         }
    //     });
    //     curatedArticles[`tag${i}`].tag = interest;
    //     return curatedArticles;
    // });
    // END
    // console.log("###########################")
    // console.log(curatedArticles, "IM HEEERE ********");
    // console.log("###########################")

    return res.send({ articles, curatedArticles });
}

async function showArticlesByInterest(req, res, next) {
    const { interest } = req.params;
    const interestTag = interest.replace("-", " ");
    const selectedArticles = await ArticleModel.find({ "interests": interestTag });

    return res.send({ selectedArticles });
}


module.exports = {
    index,
    showArticlesByInterest
}