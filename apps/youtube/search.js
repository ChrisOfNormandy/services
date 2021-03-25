const yts = require('yt-search');

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        yts(options, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}