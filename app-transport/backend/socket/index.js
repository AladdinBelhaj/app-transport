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
  

  console.log("onlineUsers: ",onlineUsers);
  
  io.emit("getOnlineUsers", onlineUsers);
});

socket.on("sendMessage",(message)=>{
    const user = onlineUsers.find(user=> user.userId == message.recepientId);
    console.log("AYO THIS IT:", message.recepientId)
    if(user){
        console.log(`${user.socketId} exists!`)
        io.to(user.socketId).emit("getMessage",message);
        console.log("DA MESSAGE", message);
    }
})

socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter(user => user.socketId != socket.id);
    io.emit("getOnlineUsers", onlineUsers);
})
});

io.listen(9000);