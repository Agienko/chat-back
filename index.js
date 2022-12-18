
const express = require('express')
const cors = require('cors')
const {add} = require("nodemon/lib/rules");

const app = express()

app.use(cors())


const data = {
    users: ['dxgxfbfx', 'dx33'],
    messages: [
        {user: 'dxgxfbfx', message: 'ergdrth', date: '2022-12-16T21:14:12.318Z'},
        {user: 'dxgxxcvfbfx', message: 'ergdxcvxcvrth', date: '2022-12-16T21:14:12.318Z'},
        {user: 'dx33', message: 'ergdxcxxvxcvrth', date: '2022-12-16T21:14:12.318Z'}
    ]
}

const PORT = 3000


app.listen(PORT, error=>{
    error ? console.log(error): console.log(`Сервер запущен, слушаю ${PORT} порт`)
})

app.get('/', (req, res)=>{
    const addMessage = req?.query?.addMessage
    const addUser = req?.query?.addUser
    const delUser = req?.query?.delUser


    if(addMessage) {
        const user = req.query?.user

        const messageObj = {"user": user, "message": addMessage, "date": new Date}
        data.messages.push(messageObj)
        res.json({"messageAdded": true, "status": "success"})

    }
    else if(addUser){
        if(data.users.includes(addUser)){
           res.json({"userAdded": false, "status": "user already exists"})
       } else {
           data.users.push(addUser)
           res.json({"userAdded": true, "status": "success"})
       }
    }
    else if (delUser){
        if(!data.users.includes(delUser)){
            res.json({"delete": false, "status": "user is not exist"})
        } else {
            data.users = data.users.filter(el=> el !== delUser)
            res.json({"delete": true, "status": "success"})
        }
    }
    else {
        res.json(data)
    }


})

// app.get('/addUser', (req, res)=>{
//     const user = req.query?.user
//    if(user){
//        if(data.users.includes(user)){
//            res.json({"userAdded": false, "status": "user already exists"})
//        } else {
//            data.users.push(user)
//            res.json({"userAdded": true, "status": "success"})
//        }
//    } else {
//        res.status(404)
//            .json({"userAdded": false, "status": "error"})
//    }
//
// })
//
// app.get('/delUser', (req, res)=>{
//     const user = req.query?.user
//     if(user){
//         if(!data.users.includes(user)){
//             res.json({"delete": false, "status": "user is not exist"})
//         } else {
//             data.users = data.users.filter(el=> el !== user)
//             res.json({"delete": true, "status": "success"})
//         }
//     } else {
//         res.status(404)
//             .json({"delete": false, "status": "error"})
//     }
//
// })
//
//
// app.get('/addMessage', (req, res)=>{
//     const message = req.query?.message
//     const user = req.query?.user
//     if(message){
//             const messageObj = {"user": user, "message": message, "date": new Date}
//         data.messages.push(messageObj)
//         res.json({"messageAdded": true, "status": "success"})
//
//     } else {
//         res.status(404).json({"messageAdded": false, "status": "error"})
//     }
//
// })


app.use((req, res)=>{
    res.status(404)
        .json(null)
})
