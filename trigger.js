const redis = require("./redis")
const processTrigger = (eventData)=>{
      
const {event,trigger:{name}} = eventData;

switch (name) {
    case "author_update":{

        const {new:{id:authorId}} = event.data
        console.log(authorId)
        redis.del([`author:${authorId}`],(err,reply)=>{
            if(err) {
                console.error(err)
            }else {
                console.info("Invalidate Success",reply)
            }
        })
        break;
    }
    default:{
        break;
    }
}
}

module.exports = processTrigger