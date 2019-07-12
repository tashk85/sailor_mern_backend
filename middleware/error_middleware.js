module.exports = function ValidationError(err, req, res, next ){
    console.log("***************************   ERROR     ********************************");
    console.log(err);
    
    if (err.joi && err.joi.name === "ValidationError") {
        return res.status(422).json(err.joi.details[0].message);
    }

    next(err);
}

