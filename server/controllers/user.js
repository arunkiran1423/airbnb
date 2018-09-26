const User = require("../models/user")
const MongooseHelpers = require("../helpers/mongoose")
const jwt = require("jsonwebtoken")
const config = require("../config/dev")

exports.auth = (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    if(!password || !email){
        return res.status(422).send({errors:[{title:'Data missing',detail:'Provide email and password'}]})
    }

    User.findOne({email},function(err,user){
        if(err){
            return res.status(422).send({errors:MongooseHelpers.normalizeErrors(err.errors)})
        }
        if(!user){
            return res.status(422).send({errors:[{title:'No user',detail:'user does not existss'}]})
        }
       if(user.isSamePassword(password)) {
        //return jwt token
        const token = jwt.sign({
            userId:user.id,
            username:user.username
        },config.SECRET,{expiresIn:'100h'})
        return res.json(token)
       }
       else{
        return res.status(422).send({errors:[{title:'wrong password',detail:'password does not match'}]})

       }

    })

}

exports.register = (req,res)=>{
    const username = req.body.username
    const email=req.body.email
    const password=req.body.password
    const passwordconfirm = req.body.passwordconfirm

    if(!password || !email){
        return res.status(422).send({errors:[{title:'Data missing',detail:'Provide email and password'}]})
    }
   if(password !== passwordconfirm){
    return res.status(422).send({errors:[{title:'passwords should match',detail:'password not same as confirm password'}]})
   }
   User.findOne({email},function(err,existingUser){
       if(err){
           return res.status(422).send({errors:MongooseHelpers.normalizeErrors(err.errors)})
       }
       if(existingUser){
        return res.status(422).send({errors:[{title:'email exits',detail:'email already exists'}]})
       }
       const user = new User({
           username,
           email,
           password
       })
       user.save(function(err){
           if(err){
            return res.status(422).send({errors:MongooseHelpers.normalizeErrors(err.errors)})
           }
           return res.json({'registered':true})
       })
   })

}

exports.authMiddleware = function(req,res,next){
    const token = req.headers.authorization
    if(token){
        const user = parseToken(token)
        User.findById(user.userId,function(err,user){
            if(err){
                return res.status(422).send({errors:MongooseHelpers.normalizeErrors(err.errors)})
            }
            if(user){
                res.locals.user = user
                next()
            }else{
                return res.status(401).send({errors:[{title:'not authorized',detail:'not authorized as no token'}]})
            }
        })
    }else{
        return res.status(401).send({errors:[{title:'not authorized',detail:'not authorized as no token'}]})
    }
}

function parseToken(token){
 jwt.verify(token.split(' ')[1],config.SECRET)
}