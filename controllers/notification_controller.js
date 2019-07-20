const UserModel = require("./../database/models/user_model");

async function index(req,res,next) {

    console.log("I am @ ALL notifications");
    // see all notifications
    let { userId } = req.params;
    let user = await UserModel.findById(userId);
    let notifications = user.notifications;
    let simple_notification = [];

    // each notification show commentor's first name, last name, artilce title 
    notifications.forEach(notification => {
        let mentioner_firstName = notification.user_metadata.firstName
        let mentioner_lastName = notification.user_metadata.lastName
        let mentioned_artileTitle = notification.mentionedArticle.mentioned_artileTitle;
        let simple_note = [];
        simple_note.push(mentioner_firstName, mentioner_lastName, mentioned_artileTitle);
        simple_notification.push(simple_note);
        return simple_notification;
    });

    return res.json(simple_notification);
}

async function showAndDelete(req,res,next) {

    console.log("I am @ One notification");
    //once user click on each notification
    // tricker status change to "read"s
    // thus delete the notification from the array

    //then it re-direct to the in-site article url

    // possible take to specific comment depends on user info

}


module.exports = {
    index,
    showAndDelete
}