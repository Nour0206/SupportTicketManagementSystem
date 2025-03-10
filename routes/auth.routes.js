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
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        const mailOptions = {
            from: '"Support Team"<no-reply@Support.com>',
            to: email,
            subject: 'Verify your email',
            html: `<h2>Verify your email</h2>
            <p>Click on this <a href="http://localhost:3000/auth/verify/${user._id}">link</a> to verify your email</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send({ message: error.message });
            }
            res.status(201).send({ message: "user saved successfully" });
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Verify a user's email
router.get('/verify/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Check if the email is already verified
        if (user.emailverified) {
            return res.status(400).send({ message: 'Email already verified' });
        }

        user.emailverified = true;
        await user.save();

        // Return a success message along with user details
        res.status(200).send({
            message: 'User email verified successfully',
        });
    } catch (error) {
        // Handle any errors
        res.status(500).send({ message: error.message });
    }
});

// Login a user and generate a jwt token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Check if email is verified
        if (!user.emailverified) {
            return res.status(400).send({ message: 'Please verify your email' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Generate JWT token with expiration
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send response
        res.status(200).send({
            message: 'User logged in successfully',
            token,
            userId: user._id,
            role: user.role
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


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
            from: '"Support Team"<no-reply@Support.com>',
            to: email,
            subject: 'Reset Password',
            text: `<h2>Hello ${user.name},</h2> 
            <p>Click on this <a href=http://localhost:3000/reset-password/${token}>link</a> to reset your password</p> `
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