const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(process.env.PORT || 4000, () => {
    console.log('listening to requests on port 4000');
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection',(socket) => {
    console.log('made socket connection',socket.id);

    socket.on('chat', (data) => {
        io.emit('chat', data);

    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);

    });
})