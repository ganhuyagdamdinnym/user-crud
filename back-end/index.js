//const { log } = require("console");
const express = require("express");
//import { express } from "express";

//import './App.css';
const fs = require('fs')
const router = express.Router();
const cors = require('cors')

const port = 8000;
const app = express();
app.use(cors())
app.use(express.json())


const userRouter = require("./user")
app.use(userRouter)

const userchaat = require("./chaat")
app.use(userchaat)

//backend
app.get('/users', (req, res) => {
    fs.readFile("./user.json", "utf-8",
        (readError, data) => {
            let saveddata = JSON.parse(data);
            saveddata = saveddata.map((cur) => ({ id: cur.id, username: cur.username, age: cur.age, work: cur.work, gender: cur.gender, mobile_phone: cur.mobile_phone }))
            res.json({
                data: saveddata
            })
        }
    )
})
//password
// const isPasswordCorrect = users.filter(
//     (e) => e.password === passwordvalue && e.username === uservalue
// );
// if (isPasswordCorrect.length === 1) {
//     console.log("aaa", isPasswordCorrect);
// }
//
app.get('/users/:password/:name', (req, res) => {
    const { password } = req.params;
    const { name } = req.params
    fs.readFile("./user.json", "utf-8",
        (readError, data) => {
            let saveddata = JSON.parse(data);
            const isPasswordCorrect = saveddata.filter(
                (e) => e.password === password && e.username === name
            )[0];
            res.json({
                data: isPasswordCorrect
            })
        }
    )
})


///post


// back-end ymar id irsiin
// back-end ene id eer ustgaj chadsimu
// back-end ymar user uus butsaasiin

//delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile("./user.json", "utf-8",
        (readError, data) => {
            let saveddata = JSON.parse(data);
            const newdta = saveddata.filter((ele) => ele.id !== id)

            fs.writeFile("./user.json",
                JSON.stringify(newdta),
                (writeError) => {
                    if (writeError) {
                        res.json({
                            status: "error hhhh"
                        })
                    } else {
                        res.json({
                            status: "success",
                            data: newdta
                        })
                    }
                })
        }
    )
})
app.put("/users", (req, res) => {
    //const { id } = req.params;
    const body = req.body;
    fs.readFile("./user.json", "utf-8",
        (readError, data) => {
            let savedData = JSON.parse(data);
            if (readError) {
                res.json({
                    status: "read file error",
                });
            }
            const updatedData = savedData.map((d) => {
                if (d.id === body.id) {
                    (d.username = body.name),
                        (d.age = body.age),
                        (d.work = body.work),
                        (d.gender = body.gender),
                        (d.home_address = body.home_address),
                        (d.mobile_phone = body.mobile_phone)

                }
                return d;
            });
            fs.writeFile("./user.json",
                JSON.stringify(updatedData),
                (writeError) => {
                    res.json({
                        data: updatedData
                    });

                }

            )

        }

    )


});

//put impormation



app.listen(port, () => {
    console.log("power on" + port)
})
