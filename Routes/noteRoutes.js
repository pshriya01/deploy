const express=require('express')
const {NoteModel}=require('../model/NoteModel')
const {auth}=require('../middlewares/authmiddleware')
const noteRouter=express.Router()


noteRouter.post('/addNote',auth,async(req,res)=>{
    console.log(req.body);
    try{
      const note=new NoteModel(req.body)
      await note.save()
      res.status(200).send({'msg':'New note has been added'})
    }
    catch(err){
        res.send({'error':err})
    }
})

noteRouter.get('/',auth,async(req,res)=>{
    console.log(req.body.userID)
    try{
        const notes=await NoteModel.find({userID:req.body.userID})
        res.status(200).send(notes)
    }
    catch(err){
        res.send({'error':err})
    }
})

noteRouter.patch('/update/:noteId',auth,async(req,res)=>{
    const {noteId}=req.params
    const note=await NoteModel.findOne({_id:noteId})
    // console.log(req.body)
    // console.log(note)
    try{
        if(req.body.userID!==note.userID){
            res.send({'msg':'you are not authorized'})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
            res.status(200).send({'msg':`note with id ${noteId} is updated succesfully`})
        }
    }
    catch(err){
        res.send({'error':err})
    }
})

noteRouter.delete('/delete/:noteId',auth,async(req,res)=>{
    const {noteId}=req.params
    const note=await NoteModel.findOne({_id:noteId})
    try{
        if(req.body.userID!==note.userID){
            res.send({'msg':'you are not authorized'})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteId})
            res.status(200).send({'msg':`note with id ${noteId} is deleted succesfully`})
        }
    }
    catch(err){
        res.send({'error':err})
    }
})

module.exports={noteRouter}