self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});


const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}

// Intercept all the network requests
self.addEventListener('fetch', function(event) {
  var reqObj;
  event.respondWith(async function() {
    reqObj = event.request;
    event.waitUntil(
      (async (reqObj) => {
        var clientRequest = deepCopyFunction(reqObj);
        clientRequest.headers = Array.from(reqObj.headers.entries());
        const clientId =
          event.resultingClientId !== ""
            ? event.resultingClientId
            : event.clientId;
        const client = await self.clients.get(clientId);
        client.postMessage(JSON.stringify(deepCopyFunction(clientRequest)));
      })(reqObj));
    const reqUrl =  new URL(reqObj.url.toString());
    return new Response(`<html><body><p>It is working!!!!!!!</p><script type="text/javascript">
    navigator.serviceWorker.addEventListener('message', event => {
      window.parent.iframeRequestHandler(String(event.data));
    });</script></body></html>`, {"status" : 200, "headers":{"Content-Type": "text/html"}});
    // if(reqUrl.pathname.includes("/initiateCommunication")) {
    //   return fetch('/static/initiateCommunication.html');
    // }
    // (await res).body = "<h1>It works</h1>";
    // console.log("response:",(await res).text())
    // window.history.pushSt  te("", "", '/newpage');
    // else {
    //   const reshtml = `
    //     <a href="/asd">asdads</a>
    //     <script>
    //     console.log("inside response")
    //     if (navigator.serviceWorker.controller) {
    //         console.log("This page is currently controlled by:");
    //         navigator.serviceWorker.controller.postMessage({
    //             type: 'hola',
    //             });
            // navigator.serviceWorker.addEventListener('message', event => {
            //   console.log("sw's message:",event.data);
            //   window.parent.mainFrameOnload();
            // });
    //     } else {
    //         console.log("This page is not currently controlled by a service worker.");
    //     }
    //     </script>`;
    // }
  }()
  ); 
});

self.addEventListener('message', event => {
  // event is an ExtendableMessageEvent object
  console.log(`client's message: ${JSON.stringify(event.source)}`);
  // if(event.data.type == "initiate")
  // event.source.postMessage("Hi client");
});