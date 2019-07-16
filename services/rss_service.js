const Parser= require("rss-parser");
const axios = require("axios");
const parser = new Parser();
const ArticleModel = require("./../database/models/article_model");
const { extract, extractWithEmbedly } = require("article-parser");


//Function to retrieve rss feed from MedCity and save to local database
async function RssMedCity() {
    let feed = await parser.parseURL("https://medcitynews.com/feed/");

    feed.items.forEach(async item => {        
        const url = item.link;
        const checkCategories = item.categories; //which is an array
        // console.log(checkCategories);
        const importCategories = [];
        const health = regexHealth(checkCategories);
        importCategories.push(health);
        // const bio = await regexBio(checkCategories);
        // importCategories.push(bio);
        console.log(importCategories);
        //regex function
        // loop through each item in the array and check
        // if .... containts "health",
        // if any item return true,
        // then push "Health" into importCategories
         // if .... containts "bio",
        // then push "BioPharmacy" into importCategories
        // try {
        //     const article = await ArticleBody2(url);
        //     // console.log(article);
        //     await ArticleModel.create({
        //         date_posted: item.pubDate,
        //         metadata: {
        //             title: item.title,
        //             author: item.creator,
        //             source: "Med City",
        //             url: item.link,
        //             image: article.image,
        //             rssCategories: item.categories,
        //             localCategories: importCategories
        //         },
        //         article_body: article.content
        //     })
        // } catch(error) {
        //     console.log("***************************  Ignore the error if the error is duplicate keys: E11000  ********************************");
        //     console.log(`Error: ${error}`);
        // }
        // console.log("one article saved")
    })
     return console.log("all articles saved to database");
};

//Function 1 to retrieve article body from the article url
    // package that extract individual article from url & save inside <body> as html;
    // the image is available both inside the div and outside as object key-value pair;
    // Problem: have no \n at the end of the each tag, however need to remove html & body tag
function ArticleBody1(url){
    let urlLink = url;
    return extract(urlLink)
        .then((article) => {
            let {image, content} = article;
            let articleBody = {image, content};
            return articleBody
        })
        .catch((err) => {
            console.log(err);
        })
}

//Function 2 to retrieve article body from the article url
    // package that extract individual article from url & save as div
    // the image is available both inside the div and outside as object key-value pair;
    //feed to use this strategy: medcity, healthcareIT, digitalhealthX?
    // Problem: have \n at the end of each tag
    // We are mainingly use ArticleBody2 function now
function ArticleBody2(url){
    let urlLink = url;
    return extractWithEmbedly(urlLink)
        .then((article) => {
            let articleBody = article;
            return articleBody
        })
        .catch((err) => {
        console.log(err);
        });
}

//regex function -> common function for check regex;
function regexHealth(array,checkItem){
    let health = "";
    for (item of array) {
        if (/checkItem/i.test(item)) {
            health = `${checkItem}`;
            break;
        }
    }
    return health;
}

function regexBio(array){
    let check = [];
    array.forEach( item=> {
       check.push(/bio/.test(item));
    })
    if (check.includes('true')) {
        return 'bio';
    }
}

//Function to retrieve rss feed from HealthCareIT and save to local database
// async function RssHealthCareIT() {
//     let feed = await parser.parseURL("https://www.healthcareitnews.com/most_popular/feed");

//     feed.items.forEach(item => {

//     })
//      return console.log(feed);
// };


module.exports = {
    RssMedCity
    // RssHealthCareIT

}