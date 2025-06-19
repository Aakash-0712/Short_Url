const express = require('express');
const urlRoute  = require('./Routers/url');
const path = require("path");
const URL = require('./Models/url');
const staticRouter = require('./Routers/staticRouter');
const { connectToMongoDB } = require('./connect');
const app = express();


connectToMongoDB('mongodb://localhost:27017/url-shortner').then(()=>console.log("MongoDB connected"));

const port = 8001;

app.set("view engine","ejs");
app.set('views',path.resolve('./Views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/url',urlRoute);

app.use('/',staticRouter);

app.get("/test",async (req,res)=>{
    const allURLS = await URL.find({});
    res.render('home',{
        urls:allURLS,
    });
});
app.get('/:shortID',async (req,res)=>{
    const shortId =  req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitedHistory : {
                    timestamps :Date.now(),
                } 
                     
            }
    });
    res.redirect(entry.redirectURL)
});
app.listen(port,()=>console.log("Server Started!"))