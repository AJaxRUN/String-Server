const Peer = require("simple-peer");
const url = location.href;
console.log("url:",url)
const request = new Request("/", {method: 'POST', body: 'Hii I am client'});
fetch(request)
  .then(response => console.log(response.text()))
  .catch(err => console.log(err));
// Service worker on connection to service worker
self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
      console.log("Receiving...",event.request);
      // (await res).body = "<h1>It works</h1>";
      // console.log("response:",(await res).text())
      // window.history.pushState("", "", '/newpage');
      return new Response("<h1>It works</h1>", {"status" : 200, "headers":{"Content-Type": "text/html"}});
    }()
    );
});
