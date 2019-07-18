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
    console.log(userId);
    console.log(req.body);

    const article =  await ArticleModel.findById(articleId);
    const articleLikes = article.likes;

    console.log(`likes: ${articleLikes}`);

    if (articleLikes.includes(userId)){
        //remove userID
        //return send back response : update likes boolean
        let index = articleLikes.indexOf(userId);
        if (index > -1) {
            articleLikes.splice(index, 1);
            await article.save();
        }
        console.log(`likes: ${articleLikes}`);
        console.log("removed user");

    } else {
        //add userID
        articleLikes.push(userId);
        await article.save();
         //return send back response : update likes boolean
            //res.json({true});
        console.log("addeduser");
        console.log(`likes: ${articleLikes}`);

    }
    
    console.log("I tried")
    res.redirect(`/article/${articleId}`);
}


module.exports = {
    update
}