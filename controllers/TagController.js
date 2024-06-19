const { validationResult } = require('express-validator');
const Tag = require('../models/Tag');
const { isValidObjectId } = require('mongoose');

const createTag = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({error: errors.array()}) 
    }
    try{
        const result = await Tag.createTag(req.body.name)
        if(result.error){
            return res.status(400).json(result)
        }
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}

const getTags = async(req, res) => {
    try{
        const result = await Tag.getAllTags()
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}

const getPostByTagId = async(req, res) => {
    if(!isValidObjectId(req.params.id)){
        return res.status(400).json({error: [{message: "Id is not valid"}]})
    }
    try{
        const result = await Tag.getPostsByTag(req.params.id)
        res.json(result)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    createTag,
    getTags,
    getPostByTagId
}