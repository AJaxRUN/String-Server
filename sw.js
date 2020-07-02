
self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
      console.log("Receiving...",event.request)
      // let res = fetch(event.request);
      // (await res).body = "<h1>It works</h1>";
      // console.log("response:",(await res).text())
      // window.history.pushState("", "", '/newpage');
      return new Response("<h1>It works</h1>", {"status" : 200, "headers":{"Content-Type": "text/html"}});
    }()
    );
});
  