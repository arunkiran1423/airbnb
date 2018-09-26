const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        min:[4,"too small"],
        max:[32,"too large"],
        required:true
    },
    email:{
        type:String,
        unique:true,
        min:[4,"too small"],
        max:[32,"too large"],
        lowercase:true,
        required:"email is required"
       
        },
        password:{
            type:String,
            min:[4,"too small"],
            max:[32,"too large"],
            required:"password is required"

        },
        rentals:[{type:Schema.Types.ObjectId,ref:'Rental'}]
})

userSchema.methods.isSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword,this.password)
}

userSchema.pre('save',function(next){
    const user = this
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user.password,salt,function(err,hash){
            user.password = hash;
            next()
        })
    })

})



module.exports = mongoose.model('User',userSchema)