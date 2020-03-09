const express = require('express')
const router = express.Router()
const {fetch_comments,post_comment,delete_comment,edit_comment} = require('./../controllers/commentsController')
const auth = require('./../middleware/auth')
const admin = require('./../middleware/admin')
// const authenticate = require('./../authenticate')

router.get('/:id',fetch_comments)
router.post('/post_comment',auth,post_comment)
router.delete('/delete_comment/:id',auth,delete_comment)
router.put('/edit_comment/:id',auth,edit_comment)



module.exports = router