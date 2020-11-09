"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = express_1.default();
let http = require('http').Server(app);
let io = require('socket.io')(http);
app.use('/api/v1/', routes_1.routes);
io.on('connection', (socket) => {
    socket.on('chat-message', (msg) => {
        io.sockets.emit('chat-message', msg);
    });
});
const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log('Server is started at http://localhost:' + port);
});
//# sourceMappingURL=index.js.map