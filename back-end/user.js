const express = require("express")
const router = express.Router()
const fs = require('fs')

router.use((req, res, next) => {
    // method === post
    // url === /users
    // token ===



    // if (req.headers.token === undefined) {
    // res.json("not authorized")
    // } else {
    // }
    next();
})


router.post('/users', (req, res) => {
    const body = req.body
    // console.log(users.work)
    fs.readFile("./user.json",
        (readError, data) => {
            if (readError) {
                res.json({
                    status: "read file error"
                })
            };
            let saveddata = JSON.parse(data);

            const user = {
                id: Date.now().toString(),
                username: body.name,
                age: body.age,
                work: body.work,
                password: body.password,
                gender: body.gender,
                mobile_phone: body.mobile_phone,
                home_address: body.home_address
            };
            saveddata.push(user)
            fs.writeFile("./user.json",
                JSON.stringify(saveddata),
                (writeError) => {
                    if (writeError) {
                        res.json({
                            status: "error hhhh"
                        })
                    } else {
                        res.json(
                            saveddata
                        )
                    }
                })
        }
    )
})

module.exports = router