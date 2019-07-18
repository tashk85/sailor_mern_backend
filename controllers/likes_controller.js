const ArticleModel = require("./../database/models/article_model");

// async function update(req, res) {
//     let { articleId } = req.params;
//     let { likes } = req.body;

//     await ArticleModel.findByIdAndUpdate(articleId, {likes});


//     res.redirect(`/article/${article._id}`);
// }

async function update(req, res) {
    let { articleId } = req.params;
    let { _id:userId } = req.body.user;
    console.log(req.body);

    const article =  await ArticleModel.findById(articleId);


    console.log(`likes: ${article.likes}`);

    if (article.likes.includes(userId)){
        //remove userID
        //return send back response : update likes boolean
        console.log("removed user");

    } else {

        //add userID
         //return send back response : update likes boolean
        console.log("addeduser");

    }
    
    console.log("I tried")
    res.redirect(`/article/${articleId}`);
}


module.exports = {
    update
}