const express=require('express')
const app=express()
const connection=require('./db')
const {userRouter}=require('./Routes/userRoutes')
const {noteRouter}=require('./Routes/noteRoutes')
const cors=require('cors')
const PORT=8000

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)
app.use('/notes',noteRouter)


app.listen(PORT,async()=>{
    try{
      await connection
      console.log('Connected to DB')
      console.log(`Server is running at port ${PORT}`)
    }
    catch(err){
       res.status(400).send(err)
    }

})