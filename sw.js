const Peer = require("simple-peer");
const gg = require("./src/whoAmI");
const socket = new WebSocket("ws://localhost:8080");
console.log("ggabcd:",gg.geturl());
socket.onopen = event => {
  console.log("Connection established");
  socket.send("initiateHandshake");
};
socket.onerror = error => {
  console.log(`WebSocket error: ${error}`)
}
socket.onclose = event => {
  console.log(`WebSocket closed: ${event}`)
}

// const peer = new Peer({
//   initiator: true,
//   trickle: false,
//   stream,
// });

// peer.on("stream", (stream) => {
//   console.log("Received stream createPeer:", callerID);
//   createVideo(stream, userToSignal);
// });

// peer.on("signal", signal => {
//   if(signal.type && (signal.type.toString()).toLowerCase() == "offer") {
//       console.log("received offer:", signal)
//       socket.emit("sending signal", { userToSignal, callerID, signal })
//   }
// })

// Service worker on connection to service worker
self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
      // console.log("Receiving...",event.request);
      // (await res).body = "<h1>It works</h1>";
      // console.log("response:",(await res).text())
      // window.history.pushState("", "", '/newpage');
      return new Response("<h1>It works</h1>", {"status" : 200, "headers":{"Content-Type": "text/html"}});
    }()
    );
});
