const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')


const userRouters = require('./routes/user')

const  app = express();

mongoose.connect('mongodb://localhost:27017/iblogg',{
    useNewUrlParser:true
})

app.use(expressLayouts);
app.set('view engine','ejs');


 app.get('/', async (req,res)=>{
     const  article  = await Article.find();

     res.render('index',{article:article})
 })


 app.use(express.json());
 app.use(express.urlencoded({extended:true}))


 app.use('/article',userRouters) 

app.use(express.static('public'))

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('working on Port 3000')
})