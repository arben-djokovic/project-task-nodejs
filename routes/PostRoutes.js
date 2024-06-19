const express = require("express")
const { createPost, getPost, getPosts, deletePost, editPost } = require("../controllers/PostController")
const { postValidation } = require("../middlewares/middleware") 
const router = express.Router()


router.get("/", getPosts)
router.get("/:id", getPost)
router.delete("/:id", deletePost)
router.post("/", postValidation, createPost)
router.patch("/:id", editPost)


module.exports = router