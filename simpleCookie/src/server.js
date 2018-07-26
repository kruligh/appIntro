"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const serveStatic = require("serve-static");
const PORT = 3000;
const STATIC_DIR = `./public`;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.url);
    if (req.url === '/') {
        res.redirect('/index.html');
        return;
    }
    else if (req.url === '/index.html') {
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
app.listen(PORT, () => {
    console.log("Server started on port " + PORT + " server static from " + STATIC_DIR);
});
