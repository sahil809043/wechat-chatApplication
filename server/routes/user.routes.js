const express = require('express')
const { registerUser,
    loginUser,
    findUser,
    getAllUsers,
    updateUserInfo,
    changePassword,
    logoutUser,
    setRequest,
    getRequest,
    deletRequest } = require('../controllers/user.controllers.js')
const verifyJWT = require('../middlewares/auth.middlewares.js')

const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/find/:userId").get(findUser)

router.route("/users").get(getAllUsers)

router.route("/updateInfo/:userId").post(verifyJWT, updateUserInfo)

router.route("/changePassword").post(changePassword)

router.route("/logout").post(logoutUser)

router.route("/set-request").post(setRequest)

router.route("/get-request/:userId").get(getRequest)

router.route("/delet-request").post(deletRequest)

module.exports = router