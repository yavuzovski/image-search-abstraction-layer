const express = require('express');
const searcher = require('./searcher.js');
const dbController = require('./dbController.js');
let router = express.Router();

// main page router
router.get('/', (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('index', { url: fullUrl });
});

// searcher router
router.get('/search/:query', (req, res) => {
    let query = decodeURIComponent(req.params.query);
    let offset = parseInt(req.query.offset);
    searcher(query, offset).then(results => {
        res.json(results);
    }).catch(err => {
        console.error(err);
        let reason = err.error.error.errors[0].reason;
        res.json({ "error": reason });
    })
});

// latest router
router.get('/latest/', (req, res) => {
    dbController.getLatestQueries().then(results => {
        res.json(results);
    }).catch(err => {
        res.json({ "error": err });
    })
});

module.exports = router;
