const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        const name = ytdl.getURLVideoID(url);
        const path = `./temp/video_${name}.mp4`

        fs.open(path, (err, data) => {
            if (err) {
                console.log(path, '- Does not exist. Downloading!')
                const stream = fs.createWriteStream(path);

                ytdl(url, { quality: 'lowest'}).pipe(stream);

                stream.on('error', (err) => reject(err));

                stream.on('finish', () => {
                    console.log('Finished downloading: ', name);
                    resolve(fs.createReadStream(path));
                });
            }                
            else {
                console.log(path, '- Exists. Fetching!');
                resolve(fs.createReadStream(path));
            }
        });        
    });
}