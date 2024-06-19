const { isValidObjectId } = require('mongoose');
const Post = require('../models/Post')
const { validationResult } = require('express-validator');

const createPost = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.json({error: errors.array()}) 
    }
    try{
        const result = await Post.addPost(req.body.title, req.body.body)
        res.json(result)
    }catch(err){
        res.json({error: [{message: "Post was not created, please try again"}]})
    }
}
const getPost = async(req, res, next) => {
    console.log(req.params.id)
    if(!isValidObjectId(req.params.id)){
        res.json({error: [{message: "Id is not valid"}]})
    }
    try{
        const result = await Post.getPostById(req.params.id)
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}

module.exports = {
    createPost,
    getPost
}