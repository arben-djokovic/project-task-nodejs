const express = require("express")
const { createPost, getPost } = require("../controllers/PostController")
const { postValidation } = require("../middlewares/middleware") 
const router = express.Router()


router.get("/:id", getPost)
router.post("/", postValidation, createPost)



module.exports = router