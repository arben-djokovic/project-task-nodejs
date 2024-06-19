const express = require("express")
const { addComment } = require("../controllers/CommentController")
const { commentValidator } = require("../middlewares/middleware")
const router = express.Router()

router.post("/:postId", commentValidator, addComment)


module.exports = router