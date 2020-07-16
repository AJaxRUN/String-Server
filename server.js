const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
const port = 3000 || process.env.PORT;

const options = {
    setHeaders: function (res, path, stat) {
        if(path.endsWith(".js")) {
            res.set('Service-Worker-Allowed','/');
        }
    }
}


const liveApps = ["test"];
app.use("/static", express.static(path.join(__dirname,"src"), options));

app.get("/StringEngine/:appname",(req, res) => {
    // console.log("req.params:",req.params)
    if(liveApps.includes(req.params.appname)) {
        res.sendFile(path.join(__dirname,"src","index.html"));
    }   
    else {
        res.send("The remote server is not active! Please ensure that the server is up and running.");
    }
});

// app.post("/", (req, res) => {
//     var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     console.log("origin:",fullUrl);
//     res.send("Congrats");
// });

io.on('connection', (socket) => { 
    socket.on("newClient", () => {
        // if(clients < 2) {
        //     if(clients == 1) {
        //         socket.emit('createPeer');
        //     }
        // }
        // else {
        //     io.emit('sessionActive');
        // }
        console.log("connected!!!")
    });
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