const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const models = require(path.resolve('server/models'));
const users = require('./server/routes/users');
const admin = require('./server/routes/admin');
const wallet = require('./server/routes/wallet');
const service = require('./server/routes/service');
const razorpay = require('./server/routes/razorpay');
const pay = require('./server/routes/pay');
const webhook = require('./server/routes/webhook');
const utility = require('./server/routes/utility');
const shop = require('./server/routes/shop');
const callback = require('./server/routes/callback');
const dotenv = require('dotenv');

dotenv.config();

app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
    );
    next();
});
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
const cors = require('cors')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/', express.Router());
app.use('/v1/admin', admin);
app.use('/v1/users', users);
app.use('/v1/wallet', wallet);
app.use('/v1/service', service);
app.use('/v1/razorpay', razorpay);
app.use('/v1/webhook', webhook);
app.use('/v1/pay', pay);
app.use('/v1/utility', utility);
app.use('/v1/shop', shop);
app.use('/v1/callback', callback);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'local' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err)
    res.json({
        message: err.message,
        error: err
    });
});

//To sync the models to memory db
models.sequelize.sync().then(function () {
    app.listen(process.env.port || 3214, function () {
        // Here set timezone 
        process.env.TZ = 'UTC';
        console.log(process.env.TZ);
        console.log(new Date());
        console.log(`port ${process.env.port ? process.env.port : '3214'} connected`)
    })
});


module.exports = app;
