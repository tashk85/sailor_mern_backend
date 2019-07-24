const UserModel = require("./../database/models/user_model");

async function index(req,res,next) {

    console.log("I am @ ALL notifications");
    // see all notifications
    let { user } = req;

    let notifications = user.notifications;
    let simple_notification = [];

    // each notification show commentor's first name, last name, artilce title 
    notifications.forEach(notification => {
        let mentioner_firstName = notification.user_metadata.firstName
        let mentioner_lastName = notification.user_metadata.lastName
        let mentioned_artileTitle = notification.mentionedArticle.mentioned_artileTitle;
        let mentioned_url = notification.mentionedArticle.mentioned_url;
        let notification_id = notification._id;
        let simple_note = {
            firstName: mentioner_firstName,
            lastName: mentioner_lastName,
            articleTitle: mentioned_artileTitle,
            notificationId: notification_id,
            url: mentioned_url
        };
        if (!simple_notification.includes(simple_note)) {
            simple_notification.push(simple_note);
        }
        
        return simple_notification;
    });

    return res.json(simple_notification);
}

async function showAndDelete(req,res,next) {

    console.log("I am @ One notification");
    //once user click on each notification

    //find all notifications from userId 
    let { userId, notificationId } = req.params;
    let user = await UserModel.findById(userId);
    let notification = user.notifications;
    console.log(`${notification}`);

    //find the viewed_notification by notificationId 
    let index = notification.indexOf(notificationId);
    let viewed_notification = notification[index+1];
    console.log(`can i find notificationId? ${viewed_notification}`);

    //find article_url from viewed_notification;
    let articleId = viewed_notification.mentionedArticle.mentioned_url
    console.log(`can i find article_url? ${articleId}`);

    //delete the notification
    notification.splice(index, 1);
    await user.save();
    console.log(`can i delete the notification see updated user info? ${user}`);

    //re-direct to the in-site article url
    res.redirect(`${articleId}`);

    // possible take to specific comment depends on user info in the future

}


module.exports = {
    index,
    showAndDelete
}