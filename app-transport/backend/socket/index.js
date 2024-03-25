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
const { notifications } = require("../app/models");

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
        message: message.text,
        isRead: false,
        date: new Date(),
      });
    }
  });


  socket.on("sendHeaderNotif", (notification) => {
    console.log("Notification being sent:", notification);
  
    const senderUser = onlineUsers.find((user) => user.userId === notification.senderId);
    
    if (senderUser) {
      onlineUsers.forEach((user) => {
        if (user.userId !== notification.senderId) {
          io.to(user.socketId).emit("getHeaderNotif", notification);
        }
      });
    }
  });

  socket.on("sendApplyTripNotif", (notificationData) => {
    const { userId } = notificationData;
    const user = onlineUsers.find((user) => user.userId == userId);
    if (user) {

      io.to(user.socketId).emit("getApplyTripNotif", notificationData);
    }
  });
  
  
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId != socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(9000);
