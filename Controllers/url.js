const URL = require('../Models/url');
const shortid  = require('shortid');
const shortID = shortid();

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if(!body.url) return res.status(400).json({error:'Url is required'});
  await URL.create({
        shortId :shortID,
        redirectURL : body.url,
        visitedHistory : [],
  });
  res.render('home',{id : shortID, });
}

module.exports = { 
    handleGenerateShortUrl,
 };