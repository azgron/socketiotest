/**
 * Created by azgron on 10/02/2017.
 */
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

let port = 3000;
app.listen(port);

console.log("Server listening on http://localhost:" + port);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {

    let clients = new Array();

    socket.on('register-client', function (data) {
        console.log(data);
    });


    socket.emit('server-to-client1', { data: 'data from server to client1' });

    socket.on('client1-to-server', function (data) {
        console.log(data);
    });



});