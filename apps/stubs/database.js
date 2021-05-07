const map = new Map();

function startup(app) {
    app.post('/stubs/database/insert', (req, res) => {
        if (!req.query.table || !req.query.column)
            res.send(`Check input syntax; table=${!!req.query.table}; column=${!!req.query.column}`);
        else {
            let value;
            try {
                let q = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
                if (!!q.name && !!q.type && !!q.data)
                    value = q.data;
                else
                    value = q;
            }
            catch {
                value = req.body;
            }
                
            if (!map.has(req.query.table))
                map.set(req.query.table, {});
            map.get(req.query.table)[req.query.column] = value;

            res.send('Success');
        }
    });

    app.get('/stubs/database/select', (req, res) => {
        if (!req.query.table)
            res.send(`Check input syntax; table=false`);
        else {             
            if (!map.has(req.query.table))
                res.send(`Table not found: ${req.query.table}`);
            else {
                let value = (!!req.query.column)
                    ? map.get(req.query.table)[req.query.column]
                    : map.get(req.query.table);
                
                res.contentType('application/json');
                res.send(value);
            }
        }
    });
}

module.exports = {
    startup
};