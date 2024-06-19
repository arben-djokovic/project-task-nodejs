const express = require("express")
const { tagValidation } = require("../middlewares/middleware") 
const { createTag, getTags, getPostByTagId } = require("../controllers/TagController")
const router = express.Router()

router.get("/", getTags)
router.post("/", tagValidation, createTag)
router.get("/:id", getPostByTagId)


module.exports = router