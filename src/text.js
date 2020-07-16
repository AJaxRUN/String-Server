console.log("inside this here")
navigator.serviceWorker.addEventListener('message', event => {
    console.log(event.data.msg, event.data.url);
});
if (navigator.serviceWorker.controller) {
    console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
    navigator.serviceWorker.controller.postMessage({
        type: 'hola',
        });
    
} else {
    console.log('This page is not currently controlled by a service worker.');
}

