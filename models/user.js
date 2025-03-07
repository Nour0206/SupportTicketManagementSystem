const mongoose = require('mongoose')
const bcryptjs= require('bcryptjs')

const userSchema = mongoose.Schema({
    name:String,
    email:{required:true,unique:true,type:String},
    age:Number,
    password:String,
    role: { type: String, enum: ["user", "agent", "admin"], default: "user" } // Role management
})


userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password,10)
    }
    next();

})

userSchema.methods.comparePassword = async function(userPassword){
    return bcryptjs.compare(userPassword,this.password)

}

module.exports = mongoose.model('User',userSchema)