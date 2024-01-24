const { response } = require('express')
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')


exports.userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            })
        }
        const isExist = await userModel.findOne({ email: email })
        if (isExist) {
            console.log(isExist)
            return res.status(401).send({
                success: false,
                message: 'User is alredy Exist'
            })
        }
        const pass = await bcrypt.hash(password, 10)
        const user = await new userModel({ name, email, password: pass })
        await user.save()
        return res.status(200).send({
            success: true,
            message: 'Account is created',
            user
        })
    } catch (error) {
        console.log(Error)
        return res.status(500).send({
            message: 'Error in Registration callback',
            success: false,
            error
        })
    }
}




exports.userSignin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            })
        }
        const isUser = await userModel.findOne({ email })
        if (!isUser) {
            return res.status(200).send({
                message: 'user is not registerd ',
                success: false

            })
        }
        const isMatch = await bcrypt.compare(password, isUser.password)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'invalid username or password',

            })
        }
        console.log(isUser._id)
        console.log(JSON.stringify(isUser.email))
        const token = await jwt.sign(isUser.email, process.env.JWT_TOKEN)
        await userModel.updateOne({ "email": email }, { $set: { "token": token } })

        return res.status(200).cookie('token', token).send({
            success: true,
            message: 'user login successfull',
            "token": token,
            isUser
        })


    } catch (error) {
        return res.status(404).send({
            success: false,
            message: 'signin callback error',
            error
        })
    }
}



exports.users = async (req, res) => {
    try {
        const users = await userModel.find()
        return res.status(200).send({
            success: true,
            message: "all users",
            users
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "Error in user Callback"
        })
    }

}

exports.userSignout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({
        success: true,
        message: 'Signout'
    })
}

exports.verifyUser = async (req, res) => {

    try {
        const userId = req.userId
        const user = await userModel.findOne({ email: userId })
        if (!user) {
            return res.status(404).send({
                message: 'user Not Found !',
                success: false
            })
        }
        return res.status(200).send({
            message: 'user found !',
            success: true,
            user
        })


    } catch (error) {
        return res.status(404).send({
            message: 'VerifyUser ERROR',
            success: false,
            error
        })
    }

}