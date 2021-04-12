const search = require('./apps/youtube/search');
const download = require('./apps/youtube/download');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

express.static.mime.define({ 'video/mp4': ['mp4'] });

function startup() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/search', (req, res) => {
        search({ query: req.query.videoTitle })
            .then(results => res.send({ videos: results.videos }))
            .catch(err => {
                console.error(err);
                res.send(err);
            });
    });

    app.get('/download', (req, res) => {
        download(req.query.url)
            .then(file => {
                let path = require('path').join(__dirname, file.path);
                res.download(path);
            })
            .catch(err => {
                console.error(err);
                res.send(err);
            });
    });

    app.get('/file', (req, res) => res.sendFile(`E:/JavaScript Projects/services/test_files/test.${req.query.type}`));

    require('./apps/stubs/athena').startup(app);
    require('./apps/stubs/database').startup(app);
    require('./apps/stubs/converter').startup(app);

    app.listen(8080, () => {
        console.log(`Web server running.\nNavigate to localhost:8080`);
    });
}

startup();