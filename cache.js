const redis = require("./redis")
const cacheRedis = (req,res,next)=>{

    const {id} = req.params
    if (!id) {
        res.status(422).json({error:"id is a required parameter"})
    }
    
    redis.get(`author:${id}`,(err,reply)=>{
        if(err) {
            console.log(err)
            next()
        }
        if (reply) {
        console.log("res",reply)

            res.setHeader('x-cache','hit')
            res.setHeader('Content-Type','application/json')
            return res.send(reply)
        }
        next()
    })


}
module.exports = cacheRedis