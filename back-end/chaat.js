const express = require("express")
const router = express.Router()
const fs = require('fs')

router.post('/chaat', (req, res) => {
    const body = req.body
    // console.log(users.work)
    fs.readFile("./chaat.json",
        (readError, data) => {
            if (readError) {
                res.json({
                    status: "read file error"
                })
            };
            let saveddata = JSON.parse(data);

            const user = {
                id: Date.now().toString(),
                chat: body.chat,
                byname: body.byname,
                name: body.name

            };
            saveddata.push(user)
            fs.writeFile("./chaat.json",
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
//get
router.get('/chaat', (req, res) => {
    fs.readFile("./chaat.json", "utf-8",
        (readError, data) => {
            let saveddata = JSON.parse(data);
            //saveddata = saveddata.map((cur) => ({ id: cur.id, username: cur.username, age: cur.age, work: cur.work, gender: cur.gender, mobile_phone: cur.mobile_phone }))
            res.json({
                data: saveddata
            })
        }
    )
})
module.exports = router