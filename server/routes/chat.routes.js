const express = require('express')
const { createChat, findUserChats, findChat, removeChat, globalChat, findGlobalChat } = require('../controllers/chat.controllers.js')
const verifyJWT = require('../middlewares/auth.middlewares.js')

const router = express.Router()

router.route('/').post(verifyJWT, createChat)
router.route('/:userId').get(verifyJWT, findUserChats)
router.route('/find/:firstId/:secondId').get(verifyJWT, findChat)
router.route('/remove/:firstId/:secondId').delete(verifyJWT, removeChat)
router.route('/globalChat/:userId').post(globalChat)
router.route('/find-global-chat/:chatId').get(findGlobalChat)

module.exports = router