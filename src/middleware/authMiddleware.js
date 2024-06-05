const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const authMiddleware = (req, res, next) =>{
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
        if(err){
            return res.status(404).json({
                message:'The authemtication',
                status: "Error",
            });
        }
        if(user?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                message:'The authemtication',
                status: "Error",
            });
        }

    })
}

const authUserMiddleware = (req, res, next) =>{
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
        if(err){
            return res.status(404).json({
                message:'The authemtication',
                status: "Error",
            });
        }
        if(user?.isAdmin || user?.id === userId){
            next()
        }else{
            return res.status(404).json({
                message:'The authemtication',
                status: "Error",
            });
        }

    })
}

module.exports = {
    authMiddleware,
    authUserMiddleware,
}