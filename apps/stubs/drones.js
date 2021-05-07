function startup(app) {
    app.get('/stubs/drone', (req, res) => {
        if (!req.query.id)
            res.send(`Could not find drone. No ID provided.`);
        else {
            let data = {
                "altitude": Math.floor(Math.random() * 10000),
                "latitude": Math.floor(Math.random() * 180) - 90,
                "longitude": Math.floor(Math.random() * 360) - 180,
                "heading": Math.floor(Math.random() * 360)
            };

            res.contentType('application/json');
            res.send(data);
        }
    });
}

module.exports = {
    startup
};