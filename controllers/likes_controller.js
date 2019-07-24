const ArticleModel = require("./../database/models/article_model");

// API to update user likes for an article
async function update(req, res, next) {
    let { articleId } = req.params;
    let { _id: userId } = req.body.user;

    // access current article and the likes array
    const article =  await ArticleModel.findById(articleId);
    const articleLikes = article.likes;

    // if article likes array includes current user id
    if (articleLikes.includes(userId)){
        //remove this user id
        let index = articleLikes.indexOf(userId);
        if (index > -1) {
            articleLikes.splice(index, 1);
            await article.save();
        }

        // update the likes count for article
        likesCount = articleLikes.length;

        // return response to update likes boolean and count
        return res.json({ like: false, likesCount });

    } else {
        //add this user id
        articleLikes.push(userId);
        await article.save();

        // update the likes count for article
        likesCount = articleLikes.length;
      
        // console.log("added user");
        // console.log(`likes: ${articleLikes}`);

        //return response to update likes boolean and count
        return res.json({ like: true, likesCount });
    }
    
}


module.exports = {
    update
}