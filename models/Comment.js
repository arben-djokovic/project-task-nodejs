const { ObjectId } = require('mongodb');
const db = require('../data/database');

class Comment{
    constructor(postId, body){
        this.postId = postId
        this.body = body
        this.createdAt = new Date()
        this.updatedAT = new Date()
    }

    static async addComment(postId, body){
        const result = db.getDb().collection("comments").insertOne({postId: new ObjectId(postId), body: body, createdAt: new Date(), updatedAt: new Date()})
        return result
    }
}

module.exports = Comment