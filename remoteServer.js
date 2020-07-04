const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.Server(app);
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })
const port = 3000 || process.env.PORT;
const options = {
    setHeaders: function (res, path, stat) {
        if(path.endsWith(".js")) {
            res.set('Service-Worker-Allowed','/');
        }
    }
}

wss.on('connection', ws => {
    console.log("Socket coonnected")
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('ho!')
})

const liveApps = ["test"];
app.use("/static", express.static(path.join(__dirname,"src"), options));

app.get("/StringEngine/:appname",(req, res) => {
    console.log("req.params:",req.params)
    if(liveApps.includes(req.params.appname)) {
        res.sendFile(path.join(__dirname,"public","index.html"));
    }   
    else {
        res.send("The remote server is not active! Please ensure that the server is up and running.");
    }
});

app.post("/", (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("origin:",fullUrl);
    res.send("Congrats");
});


server.listen(port, () => console.log(`App active on port ${port}`));