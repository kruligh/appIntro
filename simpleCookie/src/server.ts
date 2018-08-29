import * as express from "express";
import {Express, NextFunction, Request, Response} from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as serveStatic from 'serve-static';
import {randomBytes} from "crypto";

const PORT = 3000;
const STATIC_DIR = `./public`;
const app: Express = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    if (req.url === '/') {
        res.redirect('/index.html');
        return;
    } else if (req.url === '/index.html') {

        if (!req.cookies.lastVisit) {
            res.cookie('lastSeen', 'never');
        } else {
            const lastVisit = parseInt(req.cookies.lastVisit);
            res.cookie('lastSeen', Date.now() - lastVisit);
        }

        res.cookie('lastVisit', Date.now());
    }
    next();
});

app.use(serveStatic(STATIC_DIR, {'index': ['index.html']}));

const router = express.Router();

router.post('/login', function (req, res) {
    res.cookie('session', new Buffer(randomBytes(40)).toString('hex'));
    res.json({message: 'hooray! welcome to our api!'});
});

router.get('/tajnastrona', function (req, res) {
    if(req.cookies.session) {
        res.json({message: 'cześć, id twojej sesji to ' + req.cookies.session});
    } else {
        res.json({message: 'cześć, aby zobaczyć tą stroną, zaloguj się'});
    }
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log("Server started on port " + PORT + " server static from " + STATIC_DIR);
});
