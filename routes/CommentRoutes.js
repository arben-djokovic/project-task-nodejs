const express = require("express")
const { addComment, deleteComment } = require("../controllers/CommentController")
const { commentValidator } = require("../middlewares/middleware")
const router = express.Router()

router.post("/:postId", commentValidator, addComment)
router.delete("/:id", deleteComment)


module.exports = router