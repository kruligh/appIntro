"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const serveStatic = require("serve-static");
const crypto_1 = require("crypto");
const PORT = 3000;
const STATIC_DIR = `./public`;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.url, req.url.startsWith('/cookie/index.html'));
    if (req.url === '/') {
        res.redirect('/index.html');
        return;
    }
    else if (req.url.startsWith('/cookie/index.html')) {
        if (!req.cookies.lastVisit) {
            res.cookie('lastSeen', 'never');
        }
        else {
            const lastVisit = parseInt(req.cookies.lastVisit);
            res.cookie('lastSeen', Date.now() - lastVisit);
        }
        res.cookie('lastVisit', Date.now());
    }
    next();
});
app.use(serveStatic(STATIC_DIR, { 'index': ['index.html'] }));
const router = express.Router();
router.post('/login', function (req, res) {
    res.cookie('session', new Buffer(crypto_1.randomBytes(40)).toString('hex'));
    res.json({ message: 'hooray! welcome to our api!' });
});
router.get('/tajnastrona', function (req, res) {
    if (req.cookies.session) {
        res.json({ message: 'cześć, id twojej sesji to ' + req.cookies.session });
    }
    else {
        res.json({ message: 'cześć, aby zobaczyć tą stroną, zaloguj się' });
    }
});
app.use('/api', router);
app.listen(PORT, () => {
    console.log("Server started on port " + PORT + " server static from " + STATIC_DIR);
});
