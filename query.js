const {db,QueryTypes}  = require("./db")
const { get } = require("./redis")
const getAuthorAndBooks = async(authorId)=>{

const data = await db.query('SELECT athrs.id as authorid,athrs.name as authorname, athrs.email as authoremail,bks.name as bookname,pbrs.publish_id as publisherid,pbrs.email as publisheremail from authors athrs  inner join books bks ON athrs.id=bks.authorid INNER JOIN publisher pbrs ON bks.publisherid=pbrs.id WHERE athrs.id=:authorId;',{
        replacements:{authorId},
        type:QueryTypes.SELECT
    })
    return data
}

module.exports = getAuthorAndBooks