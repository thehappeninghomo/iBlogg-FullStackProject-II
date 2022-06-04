const express = require('express');
const Router = express.Router();
const Article = require('../models/article')


Router.get('/new',(req,res)=>{
     res.render('article/new')
})

Router.get('/edit/:id', async(req,res)=>{
   const  article_date = await  Article.findById({_id:req.params.id})
   res.render('article/edit',{article:article_date})

})

Router.post('/edit/:id', async(req,res)=>{
   Article.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
       if(err){
           console.log('cannot update')
       }else{
           res.redirect('/')
       }
   })

})



Router.get('/:slug',async(req,res)=>{
    const article = await Article.findOne({slug:req.params.slug})
    if(article==null){res.redirect('/')}
    res.render('article/show',{article:article})
})


Router.post('/',(req,res)=>{
    const article = new Article({
         title:req.body.title,
         des:req.body.des,
         info:req.body.info
    })
    article.save().then(()=>{
        res.redirect(`/`)
    })
})


Router.get('/delete/:id',(req,res)=>{
   Article.findByIdAndDelete({_id:req.params.id},(err)=>{
       if(err){
           res.send('sory')
       }else{
           res.redirect('/')
       }
   })
})




module.exports = Router;