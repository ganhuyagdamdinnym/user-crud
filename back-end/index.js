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
//password
app.post('/password', (req, res) => {
    const pass = req.body
    // console.log(users.work)
    fs.readFile("./password.json",
        (readError, data) => {
            if (readError) {
                res.json({
                    status: "read file error"
                })
            };
            let saveddata = JSON.parse(data);

            const key = {
                id: Date.now().toString(),
                password: pass.password
            };
            saveddata.push(key)
            fs.writeFile("./password.json",
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
//getpass
app.get('/password', (req, res) => {
    fs.readFile("./password.json", "utf-8",
        (readError, data) => {
            let saveddata = JSON.parse(data);
            res.json({
                data: saveddata
            })
        }
    )
})
///put passs
app.put("/password", (req, res) => {
    const body = req.body;
    fs.readFile("./password.json", "utf-8",
        (readError, data) => {
            let savedData = JSON.parse(data);
            if (readError) {
                res.json({
                    status: "read file error",
                });
            }
            const updatedData = savedData.map((d) => {
                if (d.id === body.id) {
                    (d.password = body.password)

                }
                return d;
            });
            fs.writeFile("./password.json",
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


//backend
app.get('/users', (req, res) => {
    fs.readFile("./user.json", "utf-8",
        (readError, data) => {
            let saveddata = JSON.parse(data);
            saveddata = saveddata.map((cur) => ({ id: cur.id, username: cur.username, age: cur.age, work: cur.work }))
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
app.post('/users', (req, res) => {
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
                password: body.password
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
                        (d.work = body.work);
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
app.listen(port, () => {
    console.log("power on" + port)
})
