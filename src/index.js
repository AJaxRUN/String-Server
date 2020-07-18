// Name of the hosted application
const appname = window.location.pathname.split(/\//).pop();
var socket;
console.log("App name:", appname)
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
    iframe.src = "/static/registerSW.html";
}
// To disable status info after loading the webpage
const disableStatusInfo = () => {
    document.getElementById("statusInfo").style.display = "none";
}
// To handle global errors
function ErrHandler(source, msg, err) {
    // const errDiv = document.getElementById("errDiv");
    // const errHead = document.getElementById("errHead");
    // const errMsg = document.getElementById("errMsg");
    // errHead.innerText = head;
    // errMsg.innerText = "Error from "+source+": "+msg;
    // errDiv.style.display = "block";
    console.log(source, msg, err);
}

window.onload = () => {
    disableStatusInfo();
    setBodyCSS();
    enableIframe();
}

function initiateCommunication(registerStringServiceWorker) {
    console.log("Initiating communication!!");
    var socket = io.connect('/');
    socket.emit("client",{ type: "new", appname: appname }); 
    socket.on("response", (data) => {
        if(data.type == "err") { 
            ErrHandler("String Server", "Our services was not able to connect to the remote server", data.msg);
        }
        else if(data.type === "success") {
            console.log(data);
        }
    });
}
//Main frame onload
// function mainFrameOnload() { 
//         ceh = true;
//         console.log("After onload");
//         const doc = document.getElementById("mainFrame").contentWindow.document;
//         doc.open();
//         doc.write('<h1>Test</h1><a href="lol.html">lllllol</a><script>console.log("success");</script>');
//         doc.close();

// }

