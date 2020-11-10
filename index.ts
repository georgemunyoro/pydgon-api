import { Socket } from 'dgram';
import express from 'express';
import { routes } from './routes';

const app = express()
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use('/api/v1/', routes);

io.on('connection', (socket: Socket) => {
    socket.on('chat-message', (msg: String) => {
        io.sockets.emit('chat-message', msg);
    });
});

const port: Number | string = process.env.PORT || 5000;
http.listen(port, () => {
    console.log('Server is started at http://localhost:' + port);
});
