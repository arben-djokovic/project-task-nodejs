const { isValidObjectId } = require('mongoose');
const Post = require('../models/Post')
const { validationResult } = require('express-validator');

const createPost = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({error: errors.array()}) 
    }
    try{
        const result = await Post.addPost(req.body.title, req.body.body, req.body.tags)
        if(result.error){
            return res.status(400).json(result)
        }
        return res.status(201).json(result)
    }catch(err){
        res.json({error: [{message: "Post was not created, please try again"}]})
    }
}
const getPost = async(req, res, next) => {
    if(!isValidObjectId(req.params.id)){
        res.status(400).json({error: [{message: "Id is not valid"}]})
    }
    try{
        const result = await Post.getPostById(req.params.id)
        if(result.error){
            return res.status(400).json(result)
        }
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}

const getPosts = async(req, res, next) => {
    try{
        const result = await Post.getAllPosts()
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}
const deletePost = async(req, res) => {
    if(!isValidObjectId(req.params.id)){
        res.status(400).json({error: [{message: "Id is not valid"}]})
    }
    try{
        const result = await Post.deletePostById(req.params.id)
        if(result.error){
            return res.status(400).json(result)
        }
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}

const editPost = async(req, res) => {
    if(!isValidObjectId(req.params.id)){
        res.status(400).json({error: [{message: "Id is not valid"}]})
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({error: errors.array()}) 
    }
    try{
        const result = await Post.editPost(req.params.id, req.body.title, req.body.body, req.body.tags)
        if(result.error){
            return res.status(400).json(result)
        }
        return res.json(result)
    }catch(err){
        console.log(err)
        res.status(500).json("w"+err)
    }
}

module.exports = {
    createPost,
    getPost,
    getPosts,
    deletePost,
    editPost
}