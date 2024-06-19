const db = require('../data/database');

class Tag{
    constructor(name){
        this.name = name,
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }

    static async createTag(name){
        const result =  await db.getDb().collection("tags").insertOne({name: name, createdAt: new Date(), updatedAt: new Date()})
        if(!result.acknowledged){
            return {error: [{message: "Tag was not created, please try again"}]}
        }
        return result
    }
}

module.exports = Tag