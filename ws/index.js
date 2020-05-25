module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', (data) => {
      console.log(data);
    });
  });
};
