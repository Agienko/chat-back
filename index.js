
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())


const data = {
    users: [],
    messages: []
}

setInterval(() => {
    data.messages = []

}, 1000 * 60 * 60)

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


app.use((req, res)=>{
    res.status(404)
        .json(null)
})
