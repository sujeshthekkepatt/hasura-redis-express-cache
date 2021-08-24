const dotenv =require("dotenv")
const bodyParser = require('body-parser')


dotenv.config()
const express = require("express")
const redis = require("./redis")
const app  = express()
app.use(bodyParser.json())

const getAuthorAndBooks = require("./query")
const cacheRedis = require("./cache")
const processTrigger = require("./trigger")
const PORT = process.env.PORT || 3000 
app.get('/api/:id',cacheRedis,async(req,res,next)=>{
const {id}  = req.params
 const data = await getAuthorAndBooks(id)
res.setHeader('x-cache','miss')
redis.set(`author:${id}`,JSON.stringify(data),(err,reply)=>{
    if (err) {
        console.log(err)
    }
})
res.setHeader('Content-Type','application/json')
res.json((data))
})


app.post('/trigger',async(req,res,next)=>{
    console.log(req.body)
    processTrigger(req.body)
    res.send("ok")
    })

app.listen(PORT,()=>console.log(`listening at ${PORT || 3000}`))