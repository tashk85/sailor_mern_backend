function authRedirect(req, res, next) {
    if (req.user) {
        return res.redirect("/feed");
    }
    return next();
}


function authorise(req, res, next) {
    if (req.user) {
        return next();
    }
    return res.redirect("/auth/login");
}

function admin_authorise(req, res, next) {
    if (req.user.admin == true) {
        return next();
    }
    return res.redirect("/feed");
}


module.exports = {
    authRedirect,
    authorise,
    admin_authorise  
}