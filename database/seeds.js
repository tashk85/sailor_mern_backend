require("dotenv").config();
const mongoose = require("./connect");
const UserModel = require("./models/user_model");
const InterestModel = require("./models/interest_model");
const ArticleModel = require("./models/article_model");

// Seeds admin users
const adminUserPromises = [];
function setUpAdminUser(i) {
    
    return UserModel.create({ 
        email: `admin${i}@test.com`,
        firstName: "admin", 
        lastName: "first",
        password: "admin",
        admin: true
    });
}

for(let i = 0; i < 2; i++) {
    adminUserPromises.push(setUpAdminUser(i));
    console.log(`Created admin ${i}`);
}

// Seeds interest tags to article
// const interestPromises = [];

const interestTags = InterestModel.schema.path('tag').enumValues;


// const interestPromises = [];
//     const articles = await ArticleModel.find();

//     articles.forEach(article => {
//         let numOfInterests = Math.floor(Math.random() * 3 + 1);
//         for(let i = 0; i <= numOfInterests; i++) {
//             article.interests.push(interestTags[Math.floor(Math.random()*interestTags.length)])
//         }
//         console.log("I'm in an article:")
//         console.log(article);
//         article.save();
//     })



ArticleModel.find()
    .then(articles => {
        articles.forEach(article => {
            let numOfInterests = Math.floor(Math.random() * 3 + 1);
            for(let i = 0; i <= numOfInterests; i++) {
                article.interests.push(interestTags[Math.floor(Math.random()*interestTags.length)])
            }
            console.log("I'm in an article:")
            console.log(article);
            article.save().catch(err => console.log("&&&&&&&&&&", err));
        })
        // articles.save()
    })
    .catch(err => console.log(err))


// for(let i = 0; i <= numOfInterests; i++) {
//     interestTags[Math.floor(Math.random()*interestTags.length)]
//     console.log(interestTags[Math.floor(Math.random()*interestTags.length)]);
//     interestPromises.push(ArticleModel.updateMany(
//         {}, 
//         { $set: { 
//             interests:  
//             } 
//         }
            
//     ));
//     console.log(`Updated ${i} articles`)
// }


Promise.all(adminUserPromises)
    .then(user => {
        console.log(`Seeds file successful, created ${user.length} users`);
    })
    .catch(err => console.log(`Seeds file had an error: ${err}`))
    //.finally(() => mongoose.disconnect());