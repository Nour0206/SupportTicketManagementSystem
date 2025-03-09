const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authentication = require('../middlewares/authMiddleware')
const router =express.Router()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS // Your email password
    }
});

// Register a new user and send a verification email
router.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user = new User({name,email,password})
        await user.save()
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            html: `<h2>Verify your email</h2>
            <p>Click on this <a href="http://localhost:7000/auth/verify/${user._id}">link</a> to verify your email</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({message: error.message});
            }
            res.status(201).send({message:"user saved successfully",user})
        });
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

// Verify a user's email
router.get('/verify/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const user = await User.findById(id)
        if(!user){
            res.status(404).send({message:'user not found'})
        }
        user.isVerified =true
        await user.save()
        res.send({message:'user verified successfully'})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})


// Login a user and generate a jwt token
router.post('/login',async(req,res)=>{
   try {
      const {email,password}=req.body
      const user = await User.findOne({email})
      if(!user){
        res.status(404).send({message:'user not found'})
      }
    const isHavePassword = user.comparePassword(password)
    if(!isHavePassword){
        res.status(400).send({message:'invalid credentiels'})

    }
    const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY)
    res.send({message:'user logged in successfully',token})
   } catch (error) {
    res.status(400).send({message:error.message})
   }
})


// Get the current user
router.get('/me',authentication,async(req,res) => {
    try {
      console.log("running...")
      const user = await User.findById(req.user.userId).select('-password')
      if(!user){
          res.status(404).send({message: 'User not found'})
      }
      res.send(user)
    } catch (error) {
      res.status(500).send({message:error.message})
    }
})

// Send a password reset email
router.post('/resetPassword',async(req,res)=>{
    try {
        const {email}=req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).send({message:'user not found'})
        }
        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password',
            text: `Hello ${user.name}, 
            Click on this link to reset your password
            http://localhost:3000/resetPassword/${token}`
        };
        await transporter.sendMail(mailOptions)
        res.send({message:'check your email'})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

// Reset a user's password
router.put('/resetPassword/:token',async(req,res)=>{
    try {
        const {token} = req.params
        const {password} = req.body
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const user= await User.findById(decoded.userId)
        if(!user){
            res.status(404).send({message:'user not found'})
        }
        user.password=password
        await user.save()
        res.send({message:'password reset successfully'})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})
module.exports = router;