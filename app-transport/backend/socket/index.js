// const { Server } = require("socket.io");

// const io = new Server({ cors:"*" });

// let onlineUsers =[];

// io.on("connection", (socket) => {
//   console.log("new connection: ", socket.id);

//   socket.on("addNewUser", (userId)=>{
//     !onlineUsers.some(user=> user.userId === userId) &&
//     onlineUsers.push({
//         userId: userId,
//         socketId: socket.id
//     });
  

//   console.log("onlineUsers: ",onlineUsers);
  
//   io.emit("getOnlineUsers", onlineUsers);
// });

// socket.on("sendMessage",(message)=>{
//     const user = onlineUsers.find(user=> user.userId == message.recepientId);
  
//     if(user){

//         io.to(user.socketId).emit("getMessage",message);
//         io.to(user.socketId).emit("getNotification",{
//           senderId: message.senderId,
//           isRead: false,
//           date: new Date()
//         });
//     }
// })

// socket.on("disconnect",()=>{
//     onlineUsers = onlineUsers.filter(user => user.socketId != socket.id);
//     io.emit("getOnlineUsers", onlineUsers);
// })
// });

// io.listen(9000);





const { Server } = require("socket.io");

const io = new Server({ cors: "*" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection: ", socket.id);

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId: userId,
        socketId: socket.id,
      });

    console.log("onlineUsers: ", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });


  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId == message.recepientId);

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });

      
      io.to(user.socketId).emit("getMessageForDropdown", message);
    
    }
    
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId != socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(9000);
