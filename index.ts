import cors from 'cors';
import {Socket} from 'dgram';
import * as dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';

import {Contact} from './v1/models/contact';
import {Message} from './v1/models/message';
import {User} from './v1/models/user';
import {router} from './v1/routes';

dotenv.config();

const app = express();
app.use(cors());

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.json());
app.use(logger('dev'));
app.use('/api/v1/', router);

io.on('connection', (socket: Socket) => {
    socket.on('user-online', (user: any) => {
        io.sockets.emit('user-online', user);
    });

    socket.on('user-offline', (user: any) => {
        io.sockets.emit('user-offline', user);
    });

    socket.on('status-check', (userId: string) => {
        io.sockets.emit(userId + '-status-check');
    });

    socket.on('message-read', async (msg: any) => {
        try {
            let message = await Message.findOne({
                where: {
                    id: msg.id,
                },
            });

            if (message) {
                console.log('MEG', message.getDataValue('id'));
                message.setDataValue('read', true);
                await message.save();
                io.sockets.emit(msg.id + '-read', message);
            }
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('chat-message', async (msg: any) => {
        console.log(msg);
        const message = await Message.create(msg);
        const userHasContact = await Contact.findOne({
            where: {
                user: msg.recepient,
                contact: msg.sender,
            },
        });

        if (!userHasContact) {
            const sender = await User.findOne({
                where: {
                    uuid: msg.sender,
                },
            });

            Contact.create({
                user: msg.recepient,
                contact: msg.sender,
                name: sender?.getDataValue('username'),
            });
        }

        io.sockets.emit(`${msg.recepient}-new-message`, message);
    });
});

const port: Number|string = process.env.PORT || 5000;
http.listen(port, () => {
    console.log('Server is started at http://localhost:' + port);
});

export default app;
