const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.Server(app);
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server);
const port = 3000 || process.env.PORT;
const minStrLength = 2;
const options = {
    setHeaders: function (res, path, stat) {
        if(path.endsWith(".js")) {
            res.set('Service-Worker-Allowed','/');
        }
    }
}

var liveApps = {};
app.use("/static", express.static(path.join(__dirname,"src"), options));

// app.get("/StringEngine/:appname",(req, res) => {
//     console.log("req.params:",req.params)
//     if(liveApps.includes(req.params.appname)) {
//         res.sendFile(path.join(__dirname,"src","index.html"));
//     }   
//     else {
//         res.send("The remote server is not active! Please ensure that the server is up and running.");
//     }
// });

// app.post("/", (req, res) => {
//     var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     console.log("origin:",fullUrl);
//     res.send("Congrats");
// });

io.on('connection', (socket) => { 

    // for handling client related communication 
    const clientHandler = (data) => {
        if(data.type === "new") {
            if(data.apphash && data.appname && data.appname.trim().length > minStrLength && data.apphash.trim().length > minStrLength && liveApps.hasOwnProperty(data.apphash)) {
                if(liveApps[data.apphash].appname == data.appname) {
                    remoteServerID = liveApps[data.apphash].serverSocketID;
                    liveApps[data.apphash].clients = [ ...liveApps[data.apphash].clients, socket.id];
                    io.to(remoteServerID).emit("client", { type: "new", clientSocketID: socket.id })
                    socket.emit("response", { type: "success" });
                }
                else {
                    socket.emit("response", { type: "err", msg: "Invalid App name! Please ensure that the URL is correct!" });
                }
            }
            else {
                socket.emit("response", { type: "err", msg: "Unable to contact the remote server!" });
            }
        }
        
        if(data.type === "stringClientAnswer" && data.answer !== undefined) {
            if(liveApps[data.apphash].appname == data.appname && liveApps[data.apphash].clients.includes(socket.id)) { 
                io.to(liveApps[data.apphash].serverSocketID).emit("client", { type: "answer", answer: data.answer });
            }
        }
    };

    //For handling remote server related communication
    const serverHandler = (data) => {
        //For new client
        if(data.type === "new") {
            if(data.appname && data.appname.trim().length > minStrLength && data.username && data.username.trim().length > minStrLength) {
                apphash = "abc"; //uuidv4();
                if(!liveApps.hasOwnProperty(apphash)) {
                    liveApps[apphash] = {
                        appname: data.appname,
                        username: data.username,
                        serverSocketID: socket.id,
                        clients: []
                    };
                    socket.emit("response", { type: "createServerSuccess", apphash: apphash, url: "http://localhost:3000?appname=" +  encodeURIComponent(data.appname) + "&apphash=" +  encodeURIComponent(apphash) });
                }
                else {
                    socket.emit("response", { type: "err", msg: "Oops! Check if you have a server running already" });
                }
            }
            else {
                socket.emit("response", { type: "err", msg: "Invalid username or appname!" });
            }
        }
        //Initiating handshake for the client
        if(data.type === "stringServerOffer") {
            if(data.clientSocketID && data.offer) {
                io.to(data.clientSocketID).emit("server", {type: "stringServerOffer", offer: data.offer});
            }
            else {
                console.log("Error: no client socket ID or signalData found in stringServerOffer");
            }
        }
    };

    socket.on("server", serverHandler);
    socket.on("client", clientHandler);
    // socket.on('offer', (offer) => {
    //     console.log("Got offer:")
    //     socket.broadcast.emit('backOffer', offer);
    // });
    // socket.on('answer', sendAnswer = (answer) => {
    //     console.log("Got answer:")
    //     socket.broadcast.emit('backAnswer', answer);
    // });
    // socket.on('disconnect', disconnect);
});

server.listen(port, () => console.log(`App active on port ${port}`));