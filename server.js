const controllers = require('./controllers/Controllers');
const Controllers = new controllers;
const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {
    const urlPath = url.parse(req.url, true).pathname;
    // console.log(urlPath);
    switch (urlPath) {
        case '/home':
            Controllers.home(req, res);
            break;
        case '/info-city':
            Controllers.infoCity(req, res);
            break;
        case'/delete-info':
            Controllers.deleteCity(req, res);
            break;
        case '/fix-info':
            Controllers.fixInfo(req, res);
            break;
        case '/create':
            Controllers.create(req, res);
            break;
    }
})

server.listen(3000, () => {
    console.log('server listening on 3000')
})