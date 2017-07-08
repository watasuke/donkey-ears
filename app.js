var express = require('express');
var app = express();
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var server = http.createServer(app);

server.listen(8002);  // ポート競合の場合は値を変更

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        io.sockets.emit('server_to_client', {value : data.value});
    });
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));