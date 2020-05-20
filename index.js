const PORT = 3000;
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.unsubscribe(morgan('dev'));

const { client } = require('./db');
client.connect();


server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});


const apiRouter = require('./api');
server.use('/api', apiRouter);