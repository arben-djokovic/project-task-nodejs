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
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}

module.exports = {
    addComment
}