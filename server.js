const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlDB  = require('./models/urldb');
const urlServices = require('./services/urlService');
const __config = require('./config/config')

require('dotenv').config();
const corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200
  }
  
  app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

mongoose.connect(process.env.mongo_url,
    { useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to DB");
    }).catch(err => {
        console.log(err)
        console.log("Error in connecting to DB")
    });
mongoose.set('useCreateIndex', true)

app.post('/url',async(req,res) => {
    const { url } = req.body;
    const host = req.headers.host;
    const port = req.headers.port; 
    try {
    if(!!urlServices.validateUrl(url)){
       return res.send({message: "invalid URL"})
    } else {
        const urlKey = urlServices.generateUrlKey();
        const shortUrl = `https://${host}/${urlKey}`

        await urlDB.save(url, shortUrl, urlKey)
        return res.status(200).send({ shortUrl });
    }
} catch(e) {
    console.log(e)
    res.send({message: e})
}
})

app.get("/:shortUrlId", async (req, res) => {
    const { shortUrlId } = req.params;
    try {
        console.log(shortUrlId)
        const url = await urlDB.search(shortUrlId);
        return !url ? res.status(404).send("Not found") : res.redirect(301, url.longURL)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong. Please try again.")
    }
}); 



app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`)
})