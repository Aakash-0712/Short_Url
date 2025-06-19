const express = require("express");
const router = express.Router();

const { handleGenerateShortUrl } = require('../Controllers/url');


router.post('/', handleGenerateShortUrl);


module.exports = router;