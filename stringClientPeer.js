const Peer = require("simple-peer");

const createPeer = (offer) => {
    const peer = new Peer({ 
        initiator: false,
        trickle: false
    });
    peer.on('error', err => errHandler('createPeer function', 'peer creation failed', err));
    peer.on('signal', signalData => {
        socket.emit("client", { type: "stringClientAnswer", signalData: signalData} );
    });
    peer.signal(offer);
}

function testfunc() {console.log("Hellooo")}