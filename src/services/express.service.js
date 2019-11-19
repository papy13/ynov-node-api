const express = require('express');
const config = require('../configs/server.config');
const bodyParser = require('body-parser');
const apiRouter = require('../routes');

//démarrer express
const app = express();

// middleware
app.use(bodyParser.json());

//routes
app.use('/api/v1', apiRouter);

exports.start = () => {
    let port = config.port;

    app.listen(port, (err) => {
        if (err) {
            console.log(`Error:${err}`);
            // console.log('Error:',port);
            // console.log('Error:'.err);
            process.exit(-1);
        }
        console.log(`app is running on port ${port}`);
    });

}