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
        let tagsWithObjectIds = []
        if(tags && tags.length > 0){
            tagsWithObjectIds = tags.map(tag => {
                if (isValidObjectId(tag)) {
                    return new ObjectId(tag);
                }
                return null;
            });
            if (tags.length > 0 && !tagsWithObjectIds.every(tag => tag !== null)) {
                return { error: [{ message: "Tags should contain valid ObjectIds or be empty" }] };
            }
        }
        const result = await db.getDb().collection("posts").insertOne({title: title, body: body, tags: tagsWithObjectIds, createdAt: new Date(), updatedAt: new Date()})
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

    static async getAllPosts(){
        const result = await db.getDb().collection("posts").find({}).toArray()
        return result
    }

    static async deletePostById(id){
        const result = await db.getDb().collection('posts').deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount == 0){
            return {error: [{message: "Post was not found"}]}
        }
        return result
    }
}

module.exports = Post