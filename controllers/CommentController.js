const { validationResult } = require('express-validator');
const Comment = require("../models/Comment");
const { isValidObjectId } = require('mongoose');

const addComment = async(req, res) => {
    if(!isValidObjectId(req.params.postId)){
        res.status(400).json({error: [{message: "Id is not valid"}]})
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({error: errors.array()}) 
    }
    try{
        const result = await Comment.addComment(req.params.postId, req.body.body)
        if(result.error){
            return res.status(400).json(result)
        }
        return res.status(201).json(result)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

const deleteComment = async(req, res) => {
    if(!isValidObjectId(req.params.id)){
        res.status(400).json({error: [{message: "Id is not valid"}]})
    }
    try{
        const result = await Comment.deleteComment(req.params.id)
        if(result.error){
            return res.status(400).json(result)
        }
        return res.json(result)
    }catch(err){
        res.status(500)
    }
}

module.exports = {
    addComment,
    deleteComment
}