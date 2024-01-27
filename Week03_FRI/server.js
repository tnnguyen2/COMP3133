const express = require('express');
const socketIO = require('socket.io');

const SERVER_PORT = process.env.PORT || 3000;

// App setup
const app = express()
app.use(express.static('views'))

// Start server
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server started at http://localhost:${SERVER_PORT}/`);
})

// Socket setup
const serverIO = socketIO(server);

serverIO.on('connection', (socket) => {
    console.log('Socket connection made', socket.id);
    // socket.send('Hello from server'); // Send to all clients "message" event
    socket.emit('message', 'Hello from server'); // Send to only this client "message" event
    socket.on('message', (data) => {
        console.log(`Server : ${data}`);
    })

    socket.on('chat', (data) => {
        //serverIO.emit('new_chat_message', data);
        // console.log(JSON.stringify(serverIO.sockets));
        // serverIO.sockets.emit('new_chat_message', data);
        socket.broadcast.emit('new_chat_message', data);
        //socket.emit('new_chat_message', data);
        console.log(data);
    })

    socket.on('join_group',(groupName)=>{
        socket.join(groupName);
        console.log(`Joined group ${groupName}`);
    })
    socket.on('leave_group',(groupName)=>{
        socket.leave(groupName);
        console.log(`Left group ${groupName}`);
    })
    socket.on('group_chat',(data)=>{
        serverIO.to(data.group_name).emit('new_group_message', data);
        console.log(data);
    })
})