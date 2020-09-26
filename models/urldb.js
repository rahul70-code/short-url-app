const URL = require('./URL');

const save = (longURL, shortURL, shortURLId) => {
    URL.create({ longURL, shortURL, shortURLId,createdAt: new Date().toISOString()
    })
};

const search = (shortURLId) => {
    const url =  URL.findOne({ shortURLId });
    return url;
}

module.exports = {
    save,
    search
}; 