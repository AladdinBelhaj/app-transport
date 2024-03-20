const { Server } = require("socket.io");

const io = new Server({ cors:"*" });

let onlineUsers =[];

io.on("connection", (socket) => {
  console.log("new connection: ", socket.id);

  socket.on("addNewUser", (userId)=>{
    !onlineUsers.some(user=> user.userId === userId) &&
    onlineUsers.push({
        userId: userId,
        socketId: socket.id
    });
  });

  console.log("onlineUsers: ",onlineUsers);
});

io.listen(9000);