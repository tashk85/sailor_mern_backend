function authRedirect(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect("/feed");
    }
    return next();
}


function authorise(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect("/auth/login");
}


module.exports = {
    authRedirect,
    authorise
}