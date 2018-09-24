const express = require("express")
const router = express.Router()
const Rental = require("../models/rental")

router.get("",(req,res)=>{
    Rental.find({})
    .then(rental=>res.json(rentals))
    .catch(err=>res.json(err))
})

router.get("/:id",(req,res)=>{
    let rentalId = req.params.id
    Rental.findById({rentalId})
    .then(rental=>res.json(rental))
    .catch(err=>res.status(234).send({errors:[{title:'Rental Error',detail:"something up there"}]}))
})
module.exports = router