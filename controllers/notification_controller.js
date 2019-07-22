const UserModel = require("./../database/models/user_model");

async function index(req,res,next) {

    console.log("I am @ ALL notification");
    // see all notifications
    // each notification show mentioner's first & last name & in-site article url
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