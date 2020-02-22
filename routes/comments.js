const express = require('express')
const router = express.Router()
const {fetch_comments,post_comment,delete_comment,edit_comment} = require('./../controllers/commentsController')
const authenticate = require('./../authenticate')

router.get('/:id',fetch_comments)
router.post('/post_comment',authenticate,post_comment)
router.delete('/delete_comment/:id',delete_comment)
router.put('/edit_comment/:id',edit_comment)



module.exports = router