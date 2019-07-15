const Parser= require("rss-parser");
const axios = require("axios");
const parser = new Parser();
const express = require("express");

async function RssMedCity() {
    let feed = await parser.parseURL("https://medcitynews.com/feed/");

    feed.items.forEach(item => {
        console.log(item.title);
        console.log(item.creator);
        console.log(item.link);
        console.log(item.pubDate);
        console.log(item.contentSnippet);
        console.log(item.categories);
    })
     return console.log(feed);
};

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


module.exports = {
    RssMedCity,
    // RssHealthCareIT
    // IndividualArticle,

}