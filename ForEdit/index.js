const express = require('express')

let defaultPort = 8000

let app = express()
let server = app.listen(process.env.PORT || defaultPort, () => {
    console.log('start server listening', process.env.PORT || defaultPort)
    console.log('http://localhost:' + (process.env.PORT || defaultPort))
})
app.use(express.static(__dirname + './../src'))

// GETリクエストで画像の外部URLを受取り、base64を返す
app.get('/url2base64', function(req, res) {
    const url = decodeURIComponent(req.query.url);
    request.get(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
            res.send(data);
        } else {
            // 画像がなかったら透過gifを返しておく
            res.send("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==");
        }
    });
});
