const Peer = require("simple-peer");
const io = require('socket.io-client');
// const fetch = require('node-fetch');
const { response } = require("express");
var socket = io.connect("http://localhost:3000/");
var readyToTalk = false;
var peer;

// To inform handshake server about the new active server.
socket.emit("server", {type: "new", appname: "test", username: "arjuns"});

const stringInterceptor = (msg) => {
    var reqObj = JSON.parse(JSON.parse(unescape(msg)).request);
    var headers = new Headers();
    reqObj.headers.forEach(pair => {
        headers.append(pair[0], pair[1]);
    });
    reqObj.headers = headers;
    reqObj.url = "http://localhost:3000/jk";
    const request = new Request(reqObj);
    // (async () => {
    //     const response = await fetch();
    
    //     console.log(body);
    // })();
    // fetch(request).then(response => response);
}

// To handle response from Handshake Server
const responseHandler =  (data) => {
    if(data.type === "err") { 
       console.log("Internal Server Error", data.msg);
    }
    else if(data.type === "createServerSuccess" && data.url && data.url.trim().length != 0) {
        console.log("This is your client url:", data.url);
    }
};

// When a new client comes in
const clientHandler = (data) => {
    if(data.type === "new" && data.clientSocketID && data.clientSocketID.length) { 
        peer = new Peer({ 
            initiator: true,
            trickle: false
        });
        //Send handshake signal to client via Handhshake server
        peer.on('signal', offer => {
            socket.emit("server", { type: "stringServerOffer", clientSocketID: data.clientSocketID, offer: offer} );
        });
        //On recieving msg -> call messageHandler
        peer.on('data', incomingMessage => stringInterceptor(incomingMessage));
        peer.on('error', err => console.log('error:', err))
    }
    if(data.type === "answer" && data.answer !== undefined) { 
        peer.signal(data.answer);
        peer.on('connect', () => { readyToTalk = true });
    }
}

socket.on("response", responseHandler);
socket.on("client", clientHandler);
