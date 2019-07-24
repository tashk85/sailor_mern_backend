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


const interestTags = InterestModel.schema.path('tag').enumValues;



ArticleModel.find()
    .then(articles => {
        articles.forEach(article => {
            let numOfInterests = Math.floor(Math.random() * 3 + 1);
            for(let i = 0; i <= numOfInterests; i++) {
                let interest = interestTags[Math.floor(Math.random()*interestTags.length)];
                if (!article.interests.includes(interest)) {
                    article.interests.push(interest)
                }
            }
            article.save().catch(err => console.log("&&&&&&&&&&", err));
        })
    })
    .catch(err => console.log(err))


Promise.all(adminUserPromises)
    .then(user => {
        console.log(`Seeds file successful, created ${user.length} users`);
    })
    .catch(err => console.log(`Seeds file had an error: ${err}`))
    //.finally(() => mongoose.disconnect());