const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require("jsonwebtoken")
const { passportCall, authorization } = require('../utils/passportCall.js')

//Register
router.post("/register", passport.authenticate("register", {
    failureRedirect: "/api/sessions/failedregister"
}),(req, res) => {
    try {
        req.session.user={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            cart: req.session.cart,
            role: req.user.role
        }
        req.session.login = true
        const user = req.session.user
        const login = req.session.login
        const token = jwt.sign({user, login}, "coderClave", {expiresIn: "24h"})
        res.cookie("authToken", token, {maxAge: 60*60*1000, httpOnly:true})
        res.redirect("/api/sessions/current")
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

//Ruta admin con autorization
router.get("/admin", passportCall("jwt"), authorization("admin"), (req, res) => {req.user?res.status(200).send(req.user):res.status(401).send("No se encontro un usuario")})

//Current
router.get("/current", passportCall("jwt"), (req, res) => {req.user?res.status(200).send(req.user):res.status(401).send("No se encontro un usuario")})

//Login
router.post("/login", passport.authenticate("login", {
    failureRedirect: "*"
}), async (req, res)=>{
    try {
        req.session.user={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        req.session.login = true

        const user = req.session.user
        const login = req.session.login

        const token = jwt.sign({user, login}, "coderClave", {expiresIn: "24h"})

        console.log("Token: "+ token);
        res.cookie("authToken", token, {maxAge: 60*60*1000, httpOnly:true})
        res.redirect("/")
    } catch (error) {
        console.log("hubo un error: " + error);
    }
})

//Logout
router.get("/logout", (req, res) => {
    if (req.session.login) {
        res.clearCookie("authToken")
        req.session.destroy()
    }
    res.redirect("/login")
})

router.get("/failedregister", (req, res)=>{
    res.send("registro fallido")
})

router.get("*", (req, res)=>{
    res.status(404).send("recurso no encontrado")
})


//ESTRATEGIAS:

//github
router.get("/github",passport.authenticate("github",{scope:['user:email']}), async (req, res)=>{})
router.get("/githubcallback",passport.authenticate("github",{
    failureRedirect:"/login"
    }),
    async (req, res)=>{
        req.session.user= req.user
        req.session.login = true
        res.redirect("/profile")
    })

//Facebook
router.get("/auth/facebook",passport.authenticate("facebook"), async (req, res)=>{})
router.get("/auth/facebook/callback",passport.authenticate("facebook",
    {
        successRedirect:"/profile",
        failureRedirect: "/login"
    }
), async (req, res)=>{})

module.exports = router
