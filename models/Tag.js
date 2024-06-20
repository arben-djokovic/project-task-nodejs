const { ObjectId } = require('mongodb');
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

    static async getAllTags(){
        const result = await db.getDb().collection("tags").find({}).toArray()
        return result
    }

    static async getPostsByTag(id){
        const tagId = new ObjectId(id)
        const result = await db.getDb().collection("posts").aggregate([
            {
                $match: { tags: { $in: [tagId] } }
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
        ]).toArray();
        return result
    }
}

module.exports = Tag