 //For registering service worker
const stringDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
console.log("loc:",stringDomain);
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceWorker.js',{scope: stringDomain}).then(function(registration) {
            console.log('Service worker registered with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
else {
    alert("Service worker registration error! :(")
}