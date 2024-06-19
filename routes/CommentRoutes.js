const express = require("express")
const { addComment, deleteComment, editComment } = require("../controllers/CommentController")
const { commentValidator } = require("../middlewares/middleware")
const router = express.Router()

router.post("/:postId", commentValidator, addComment)
router.delete("/:id", deleteComment)
router.patch("/:id",commentValidator,  editComment)


module.exports = router