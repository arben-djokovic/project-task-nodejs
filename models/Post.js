const { ObjectId } = require('mongodb');
const db = require('../data/database');
const { isValidObjectId } = require('mongoose');

class Post{
    constructor(title, body, tags){
        this.title = title
        this.body = body
        this.tags = tags
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }

    static async addPost(title, body, tags){
        const result = await db.getDb().collection("posts").insertOne({title: title, body: body, tags: tags, createdAt: new Date(), updatedAt: new Date()})
        if(!result.acknowledged){
            result = {error: [{message: "Post was not created, please try again"}]}
        }
        return result
    }

    static async getPostById(id){
        const result = await db.getDb().collection("posts").findOne({_id: new ObjectId(id)})
        if(!result){
            return {error: [{message: "Post was not found"}]}
        }
        return result
    }
}

module.exports = Post