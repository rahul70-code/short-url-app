const URL = require('./URL');

const save = (longURL, shortURL, shortURLId) => {
    URL.create({ longURL, shortURL, shortURLId,createdAt: new Date().toISOString()
    })
};

const search = (shortURLId) => {
    const url =  URL.findOne({ shortURLId });
    return url;
};

const findUrls = () => {
    URL.find({},(err, result) => {
        console.log(result)
        return result 
    })
    
}

module.exports = {
    save,
    search,
    findUrls
}; 