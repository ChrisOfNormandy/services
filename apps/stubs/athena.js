const accepted = [
    'application/json',
    'text/csv',
    'application/vnd.ms-excel' // CSV
];

function startup(app) {
    app.post('/stubs/athena/query', (req, res) => {
        let col = req.query.col || null;
        let json = {};

        if (!!req.body.data && accepted.includes(req.body.type)) {
            if (req.body.type !== 'application/json') {
                let cols = req.body.data.split('\n');
                for (let i in cols) {
                    if (col === null || col == i)
                        json[i.toString()] = cols[i].split(',');
                }
            }
            else
                json = col !== null ? req.body.data[col] || [] : req.body.data;
        }
        else if (req.body.length) {
            let file;
            
            for (let index in req.body) {
                file = req.body[index];
                
                if (!!file.name && !!file.type && !!file.data) {
                    if (!accepted.includes(file.type)) {
                        json = [];
                        break;
                    }
                    
                    if (file.type !== 'application/json') {
                        let cols = file.data.split('\n');
                        for (let i in cols) {
                            if (col === null || col == i)
                                json[i.toString()] = cols[i].split(',');
                        }
                    }
                    else
                        json[index] = col !== null ? file.data[col] || [] : file.data;
                }
                else {
                    if (typeof file === 'string') {
                        try {
                            let cols = file.split('\n');
                            for (let i in cols) {
                                if (col === null || col == i)
                                    json[i.toString()] = cols[i].split(',');
                            }
                        }
                        catch {
                            json = [];
                            break;
                        }
                    }
                    else
                        json[index] = col !== null ? file[col] || [] : file;
                }
            }
        }

        res.contentType('application/json');
        res.send(json);
    });
}

module.exports = {
    startup
};