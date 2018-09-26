const express = require("express")
const mongoose = require("mongoose")
const config = require("./config/dev")
const rental = require("./models/rental")
const FakeDb = require("./fake-db")

const rentalRoutes = require("./routes/rentals")
mongoose.connect(config.DB_URI)

.then(async db=>{
    const fakeDb = new FakeDb()
    await fakeDb.cleanDb()
    await fakeDb.pushrentalsToDb()})
.catch(err=>console.log(err))

const app = express()

app.use("/api/v1/rentals",rentalRoutes)

const port = process.env.PORT || 5000

app.listen(port,function(){
    console.log('server is running')
})
