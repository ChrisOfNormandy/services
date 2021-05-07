const cvt = require('xml-js');

const xml = [
    'application/xml',
    'text/xml'
];

function startup(app) {
    app.post('/stubs/converter/xml-json', (req, res) => {
        let data;
        if (!!req.body.data && !!req.body.type && !!req.body.data) {
            if (xml.includes(req.body.type))
                data = JSON.parse(cvt.xml2json(req.body.data, { compact: true, spaces: 4, trim: true }));
            else
                data = null;
        }
        else {
            if (typeof req.body === 'object')
                data = null;
            else {
                try {
                    let obj = cvt.xml2json(req.body, { compact: true, spaces: 4, trim: true });
                    data = JSON.parse(obj);
                }
                catch {
                    data = null;
                }
            }
        }

        res.contentType('application/json');
        res.send(data);
    });

    app.post('/stubs/converter/json-xml', (req, res) => {
        let data;
        if (!!req.body.data && !!req.body.type && !!req.body.data) {
            if (req.body.type === 'application/json')
                data = cvt.json2xml(req.body.data, { compact: true, spaces: 4 });
            else
                data = null;
        }
        else {
            if (typeof req.body !== 'object')
                data = null;
            else {
                try {
                    data = cvt.json2xml(req.body, { compact: true, spaces: 4 });
                }
                catch {
                    data = null;
                }
            }
        }

        res.contentType('text/xml');
        res.send(data);
    });

    app.post('/stubs/converter/metadata', (req, res) => {
        res.contentType('application/json');
        res.send(req.body);
    })
}

module.exports = {
    startup
};