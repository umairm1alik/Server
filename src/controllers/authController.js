const UserModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    const { name, email, password, password_confirmation } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
        res.send({ "status": "failed", "message": "Email already exists" })
    } else {
        // if (name && email && password && password_confirmation && tc) {
        if (name && email && password && password_confirmation) {
            if (password === password_confirmation) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const newUser = new UserModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                    })
                    await newUser.save()
                    const savedUser = await UserModel.findOne({ email: email })
                    const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.status(201).send({ "status": "success", "message": "Registration Successful", "token": token })
                } catch (error) {
                    console.log(error)
                    res.send({ "status": "failed", "message": "Unable to Register" })
                }
            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required and fields should be name, email and passsword" })
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await UserModel.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (user.email === email && isMatch) {
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.send({ "status": "success", "message": "Login Success", "token": token, "name": user.name })
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is not Valid" })
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a Registered User" })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required!" })
        }
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable to Login" })
    }
}

const changePassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
        if (password === password_confirmation) {
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
            res.send({ "status": "success", "message": "Password changed succesfully" })
        } else {
            res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        }
    } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
    }
}

const loggedInUser = async (req, res) => {
    res.send({ "user": req.user })
}





module.exports = { signup, login, changePassword, loggedInUser }