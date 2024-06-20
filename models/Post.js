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
        const result = await db.getDb().collection("posts").aggregate([
            {
                $match: { _id: new ObjectId(id) }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tagsInfo"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            }
        ]).toArray()
        if(!result){
            return {error: [{message: "Post was not found"}]}
        }
        return result
    }

    static async getAllPosts(){
        const result = await db.getDb().collection("posts").aggregate([
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tagsInfo"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            }
        ]).toArray()
        return result
    }

    static async deletePostById(id){
        const result = await db.getDb().collection('posts').deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount == 0){
            return {error: [{message: "Post was not found"}]}
        }
        return result
    }

    static async editPost(id, title, body, tags){
        let set = {}

        if(title && title.length > 0){
            set.title = title
        }else if(title && title.length == 0){
            return {error: [{message: "Title cant have 0 catacters"}]}
        }

        if(body && body.length > 0 && body.length <= 500){
            set.body = body
        }else if(body && body.length > 500){
            return {error: [{message: "max length is 500 for body field "}]}
        }

        if (tags !== undefined) { 
            if (tags.length > 0) {
                set.tags = tags.map(tag => {
                    if (isValidObjectId(tag) && tag.length == 24) {
                        return new ObjectId(tag);
                    }
                    return null;
                });

                if (!set.tags.every(tag => tag !== null)) {
                    return {error: [{message: "Tags should contain ids of tags"}]}
                }
            } else {
                set.tags = [];
            }
        }
        
        if(set.title != undefined || set.body != undefined || set.tags != undefined){
            set.updatedAt = new Date()
        }
        const result = await db.getDb().collection("posts").updateOne({_id: new ObjectId(id)}, {$set: set})
        if (result.matchedCount === 0) {
            return {error: [{message: "Post was not found"}]}
        }
        if (result.modifiedCount === 0) {
            return {error: [{message: "Nothing to update"}]}
        }
        return result
    }
}

module.exports = Post