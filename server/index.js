const express = require("express")
const mongoose = require("mongoose")
const config = require("./config/dev")
const rental = require("./models/rental")
const FakeDb = require("./fake-db")
const bodyParser = require("body-parser")

const rentalRoutes = require("./routes/rentals")
const userRoutes = require("./routes/users")
mongoose.connect(config.DB_URI)

.then(async db=>{
    const fakeDb = new FakeDb()
    await fakeDb.cleanDb()
    await fakeDb.pushdataToDb()})
.catch(err=>console.log(err))

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use("/api/v1/rentals",rentalRoutes)
app.use("/api/v1/users",userRoutes)

const port = process.env.PORT || 5000

app.listen(port,function(){
    console.log('server is running')
})
