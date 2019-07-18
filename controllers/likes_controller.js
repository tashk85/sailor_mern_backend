const ArticleModel = require("./../database/models/article_model");

// async function update(req, res) {
//     let { articleId } = req.params;
//     let { likes } = req.body;

//     await ArticleModel.findByIdAndUpdate(articleId, {likes});


//     res.redirect(`/article/${article._id}`);
// }

async function update(req, res) {
    let { articleId } = req.params;
    let { _id: userId } = req.body.user;
    console.log(userId);
    console.log(req.body);

    const article =  await ArticleModel.findById(articleId);
    const articleLikes = article.likes;

    console.log(`likes: ${articleLikes}`);

    if (articleLikes.includes(userId)){
        //remove userID
        let index = articleLikes.indexOf(userId);
        if (index > -1) {
            articleLikes.splice(index, 1);
            await article.save();
        }

        console.log("removed user");
        console.log(`likes: ${articleLikes}`);

        //return response to update likes boolean
        return res.json({ like: false });

    } else {
        //add userID
        articleLikes.push(userId);
        await article.save();
      
        console.log("added user");
        console.log(`likes: ${articleLikes}`);

        //return response to update likes boolean
        return res.json({ like: true });
    }
    
    console.log("I tried")
    res.redirect(`/article/${articleId}`);
}


module.exports = {
    update
}