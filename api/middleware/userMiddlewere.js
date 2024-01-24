const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const blogModel = require('../model/blogModel')


exports.userMiddlwere = async (req, res, next) => {
    if(!req.cookies.token){
        return res.status(200).send({
            message:'Token is Not Found Plese Login',
            success:false
        })
    }
    try {
        const userId = await jwt.verify(req.cookies.token, process.env.JWT_TOKEN)
        if (!userId) {
            res.clearCookie('token');
            return res.status(200).send({
                message: 'token is Expired',
                success: false
            })
        }

            req.userId = userId
            next()
        
        

    } catch (error) {
        res.clearCookie('token');
        return res.status(404).send({
            success:false,
            message:'token is not found'
        })
    }

}