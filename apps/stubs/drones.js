function startup(app) {
    app.get('/stubs/drone', (req, res) => {
        if (!req.query.id)
            res.send(`Could not find drone. No ID provided.`);
        else {
            let data = {
                "altitude": 64,
                "latitude": 0,
                "longitude": 0,
                "heading": 180
            };

            res.contentType('application/json');
            res.send(data);
        }
    });
}

module.exports = {
    startup
};