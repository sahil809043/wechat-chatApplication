const express = require('express')
const { createMessage, getMessages } = require('../controllers/message.controllers.js')
const verifyJWT = require('../middlewares/auth.middlewares.js')

const router = express.Router()

router.route('/').post(verifyJWT, createMessage)
router.route('/:chatId').get(verifyJWT, getMessages)

module.exports = router