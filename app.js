var express = require('express');
var app = express();
var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var server = http.createServer(app);
var favicon = require('serve-favicon')
var path = require('path')

server.listen(process.env.PORT || 8002);  // ポート競合の場合は値を変更

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        io.sockets.emit('server_to_client', {value : data.value});
    });
});

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use(favicon(path.join(__dirname, 'img', 'favicon.ico')))