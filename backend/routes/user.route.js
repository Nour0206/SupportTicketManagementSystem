const express = require('express')
const User= require ('../models/User')
const router = express.Router()

//AddUser
router.post('/addUser',async(req,res)=>{
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({message:"user saved successfully",user})
    } catch (error) {
        res.status(500).send({message:error})
    }
})

//AllUser
router.get('/all',async(req,res)=>{
   try {
    const users = await User.find()
    res.status(200).send(users);
   } catch (error) {
    throw new Error(error.message)
   }
})


//Update
router.put('/:email',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.params.email});
        if(!user){
            res.status(404).send({message:"user not found"});
        }
        const newUser =await User.findOneAndUpdate(
            {email:req.params.email},
            {$set:{email:req?.body?.email ??"example@test.com"}},
            {new:true})
        res.send(newUser)
    } catch (error) {
    res.status(500).send({message:error});
    }
 })
//DeleteUser
 router.delete('/:email',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.params.email});
        if(!user){
            res.status(404).send({message:"user not found"});
        }
        await User.deleteOne(
            {email:req.params.email})
            
        res.send({message:"User deleted successfully"})
    } catch (error) {
    res.status(500).send({message:error});
    }
 })
//DeleteUserById
router.delete('/id/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({message: "user not found"});
        }
        await User.findByIdAndDelete(req.params.id);
        res.send({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).send({message: error});
    }
});
//get user by name 
 router.get('/:name',async(req,res)=>{
    try {
        console.log(req.params.name)
        const user = await User.findOne({name:req.params.name});
        if(!user){
            res.status(404).send({message:"user not found"});
        }
        res.status(200).send(user)
    } catch (error) {
    res.status(500).send({message:error});
    }
 })

// Get users by role
router.get('/role/:role', async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role });
        if (users.length === 0) {
            return res.status(404).send({ message: "No users found with this role" });
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router