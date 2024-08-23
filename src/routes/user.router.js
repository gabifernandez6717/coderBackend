const express = require('express')
const router = express.Router()

//practica COOKIES:
router.get("/setCookie", async (req, res)=>{
    try {
        res.cookie("coderCokie", "Hola sos un capo",{maxAge: 10000}).send("ta pronta la cookie")
    } catch (error) {
        console.log(error);
    }
})
router.get("/getCookie", async (req, res)=>{
    try {
        res.send(req.cookies)
    } catch (error) {
        console.log(error);
    }
})
router.get("/deleteCookie", async (req, res)=>{
    try {
        res.clearCookie("coderCokie").send("TABORRAO")
    } catch (error) {
        console.log(error);
    }
})


router.get("/fimadaCookie", async (req, res)=>{
    try {
        res.cookie("cookieFirmada", "re secreto este mensaje",{signed: true}).send("tapelao la cookie firmada, GENIO!")
    } catch (error) {
        console.log(error);
    }
})
router.get("/getFimadaCookie", async (req, res)=>{
    try {
        const valorCookie = req.signedCookies.cookieFirmada
        if (valorCookie) {
            res.send(valorCookie)
        } else {
            res.send("cookieInvalida jajajja")
        }
    } catch (error) {
        console.log(error);
    }
})





// router.get("/session", async (req, res)=>{
//     try {
//         if (req.session.counter) {
//             req.session.counter++
//             res.send(`visitaste esto ${req.session.counter} veces`)
//         } else {
//             req.session.counter = 1
//             res.send("bienvenido cumpa!")
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })
// router.get("/logOut", async (req, res)=>{
//     try {
//         req.session.destroy((error)=>{
//             if (!error) {
//                 res.send("sesio cerrada")
//             } else {
//                 console.log(error);
//             }
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.get("/login", async (req, res)=>{
//     const {usuario, password} = req.query
//     try {
//         if (usuario ==="gabi"&& password ==="a") {
//             req.session.user = usuario
//             req.session.admin = true
//             res.send(`inicio exitoso`)
//         } else {
//             res.send("re incorrecto")
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

// // Middleware de autorizacion
// function auth (req, res, next){
//     if (req.session.user === "gabi" && req.session.admin === true) {
//         return next()
//     }
//     return res.status(403).send("error de autenticacion amigo")
// }

// router.get("/privado", auth, async (req, res)=>{
//     try {
//         res.send("tas re logueado "+ req.session.user)
//     } catch (error) {
//         console.log(error);
//     }
// })








