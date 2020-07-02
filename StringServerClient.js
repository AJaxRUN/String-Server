  // To remove uunnecessary body css
  const setBodyCSS = () => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
}
// To diplay the iframe after setting appropriate styles  
const enableIframe = () => {
    const iframe = document.getElementById("mainFrame");
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.style.border = "none";
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.display = "block";
}
// To disable status info after loading the webpage
const disableStatusInfo = () => {
    document.getElementById("statusInfo").style.display = "none";
}

window.onload = () => {
    disableStatusInfo();
    setBodyCSS();
    enableIframe();
}


//Main frame onload
// function mainFrameOnload(mainFrame) { 
//     if(!ceh) {
//         ceh = true;
//         console.log("After onload");
//         const doc = document.getElementById("mainFrame").contentWindow.document;
//         const serviceFunc = `if ('serviceWorker' in navigator) {
//                 window.addEventListener('load', function() {
//                     console.log("inside:", self.origin);
//                     navigator.serviceWorker.register('sw.js',{scope: './'}).then(function(registration) {
//                         console.log('Service worker registered with scope: ', registration.scope);
//                     }, function(err) {
//                         console.log('ServiceWorker registration failed: ', err);
//                     });
//                 });}`;
//         doc.open();
//         doc.write('<h1>Test</h1><a href="lol.html">lllllol</a><script>'+serviceFunc+'</script>');
//         doc.close();
//     }
// }

