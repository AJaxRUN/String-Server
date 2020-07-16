self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

// Intercept all the network requests
self.addEventListener('fetch', function(event) {
    event.respondWith(async function() {
      const reqObj = event.request;
      const reqUrl =  new URL(reqObj.url.toString());
      console.log("Receiving...",reqObj);
      if(reqUrl.pathname.includes("/initiateCommunication")) {
        return fetch('/static/initiateCommunication.html');
      }
      // (await res).body = "<h1>It works</h1>";
      // console.log("response:",(await res).text())
      // window.history.pushSt  te("", "", '/newpage');
      else {
        const reshtml = `
          <a href="/asd">asdads</a>
          <script>
          console.log("inside response")
          if (navigator.serviceWorker.controller) {
              console.log("This page is currently controlled by:");
              navigator.serviceWorker.controller.postMessage({
                  type: 'hola',
                  });
              navigator.serviceWorker.addEventListener('message', event => {
                console.log("sw's message:",event.data);
                window.parent.mainFrameOnload();
              });
          } else {
              console.log("This page is not currently controlled by a service worker.");
          }
          </script>`;
        return new Response("<p>Y??</p>", {"status" : 200, "headers":{"Content-Type": "text/html"}});
      }
    }()
    );
});

self.addEventListener('message', event => {
  // event is an ExtendableMessageEvent object
  console.log(`client's message: ${JSON.stringify(event.data)}`);
  // if(event.data.type == "initiate")
  // event.source.postMessage("Hi client");
});