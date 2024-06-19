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
        const result = await db.getDb().collection("comments").insertOne({postId: new ObjectId(postId), body: body, createdAt: new Date(), updatedAt: new Date()})
        if(!result.acknowledged){
            return {error: [{message: "Comment was not created, please try again"}]}
        }
        return result
    }

    static async deleteComment(id){
        const result = await db.getDb().collection("comments").deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount == 0){
            return {error: [{message: "Comment was not found"}]}
        }
        return result
    }

    static async editComment(id, body){
        const result = await db.getDb().collection("comments").updateOne({_id: new ObjectId(id)}, {$set: {body: body}})
        if (result.matchedCount === 0) {
            return {error: [{message: "Comment was not found"}]}
        }
        if (result.modifiedCount === 0) {
            return {error: [{message: "Nothing to update"}]}
        }
        return result
    }
}

module.exports = Comment