const mongoose=require('mongoose')

const noteScheme=mongoose.Schema({
    title:String,
    body:String,
    userID:String,
    user:String
})

const NoteModel=mongoose.model('note',noteScheme)

module.exports={NoteModel}