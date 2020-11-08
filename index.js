const { resolveSoa } = require('dns');

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('ok').status(200);
})

io.on('connection', (socket) => {
    socket.on('chat-message', (msg) => {
        io.sockets.emit('chat-message', msg);
    })

})

http.listen(5000, () => {
    console.log('Server is started at http://localhost:3000')
})

