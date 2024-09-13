const passport = require('passport')
const passportCall = (strategy) =>{
    return async (req, res, next) =>{
        passport.authenticate(strategy, (err, user, info)=>{
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).send({error: info.message? info.message:info.toString()})
            }
            req.user = user
            next()
        })
        (req, res, next)//Invocacion inmediata
    }
}

const authorization = (role) => {
    return async (req, res, next) => {
        if (req.session.user.role !== role) {
            return res.status(403).send("no tenes permiso")
        }
        next()
    }
}
module.exports = {passportCall, authorization}