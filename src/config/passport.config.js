const passport = require('passport')
const local = require('passport-local')
const GithubStrategy = require("passport-github2")
const FacebookStrategy = require("passport-facebook")
const jwt = require('passport-jwt')

const userModel = require("../dao/models/user.model")
const CartManager = require('../dao/db/manager/cart.manager.js')
const cartManager = new CartManager()

const {createHash, isValid} = require ("../utils/hashbcrypt.js")

const LocalStrategy = local.Strategy

const JWTStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const initialzePassport = () =>{
    //Register
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,//poder acceder al objeto req
        usernameField: "email"
    },
    async (req, username, password, done) =>{
        const {first_name, last_name, email, age} = req.body
        try {
                const user =await userModel.find({email:email})
                if (!user){
                    return done(null, false)
                } else {
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        cart: await cartManager.createCart()
                    }
                    const result = await userModel.create(newUser)
                    return done(null, result)
                }
        } catch (error) {
            return done("No se pudo encontrar el usuario: " + error);
        }
    }
    ))

    //Login
    passport.use("login", new local(
        {
        usernameField: "email"
        },
    async(email, password, done)=>{
        try {
            const user = await userModel.findOne({email:email})
            if (user) {
                const validPassword = isValid(password,user)
                if (validPassword) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } else {
                console.log("El usuario no existe");
                return done(null,false)
            }
        } catch (error) {
            return done(error);
        }
    }
    ))

    //Serializar
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    //Deserializar
    passport.deserializeUser(async (id, done)=>{
        const user = await userModel.findOne({_id:id})
        done(null, user)
    })

    //Github
    passport.use("github", new GithubStrategy({
        clientID: "Iv23li4q5npkVxwKRrEv",
        clientSecret: "155554055e5502f382e8d3b2c1571f3b0918c43c",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    },
    async(accessToken, refreshToken, profile, done)=>{
        console.log("profile: " + JSON.stringify(profile,null,2));
        try {
            const user = await userModel.findOne({email: profile._json.email})
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "cualquiera",
                    age: 18,
                    email: profile._json.email,
                    password:"13"
                }
                const result = await userModel.create(newUser)
                done(null, result)
            }else{
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    //Facebook
    passport.use(new FacebookStrategy({
        clientID: "524668580086905",
        clientSecret: "dff1888155ac65d687e31c2247e497cb",
        callbackURL: "https://localhost:8080/api/sessions/auth/facebook/callback"
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log("profile: " + JSON.stringify(profile,null,2));
        try {
            const user = await userModel.findOne({
                accountId: profile.id,
                provider: "Facebook"
            })
            if (!user) {
                const newUser = {
                    first_name: profile.diaplayName,
                    last_name: "cualquiera",
                    age: 18,
                    email: "profile._json.email4",
                    password:"13",
                    provider: "Facebook"
                }
                const result = await userModel.create(newUser)
                done(null, result)
            }else{
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    //JWT
    const cookieExtractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies["authToken"]
        }
        return token
    }
    passport.use("jwt", new JWTStrategy({
            jwtFromRequest : ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: "coderClave"
        }, async (jwt_payload, done)=>{
            try {
                return done(null,jwt_payload)
            } catch (error) {
                return done(null, false)
            }
        }
    ))
}
module.exports = initialzePassport