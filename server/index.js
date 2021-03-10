const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { v4: uuidV4} = require('uuid');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();

const server = http.createServer(app);
const VideoCallServer = http.createServer(app);

const vio = socketio(VideoCallServer);
const io = socketio(server);

app.set('view engine', 'ejs');


app.use(cors());
app.use(router);
//peerjs --port 4001

/*

*/

app.use(express.static('public'));


app.get('/video/', (req,res) => {
  res.redirect(`/video/${uuidV4()}`);
});


app.get('/video/:room', (req,res) => {
  res.render('room', { roomId: req.params.room })
});


io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });


  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


vio.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    // console.log(roomId,userId);

    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected',userId);
  })
})


server.listen(process.env.PORT || 5000, () => console.log(` Chat Server has started.`));
VideoCallServer.listen(process.env.PORT || 4000, () => console.log(`Video Call server has started`));