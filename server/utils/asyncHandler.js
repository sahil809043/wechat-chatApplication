const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


module.exports = asyncHandler  




/*
async-await code for asyncHandler function

const asyncHandler = (func) => {
    async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch( (err) => {
            res.status(err.code || 500).json({
                message : err.message,
                status : false
            })
        })
    }
}
*/