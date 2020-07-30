// Name of the hosted application
const urlParams = new URLSearchParams(window.location.search);
const appname = urlParams.get('appname');
const apphash = urlParams.get('apphash');
const socket = io.connect('/');
var readyToTalk = false;
var stringInterceptor;
socket.emit("client",{ type: "new", appname: appname, apphash: apphash }); 

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
function errHandler(source, msg, err) {
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
    registerStringServiceWorker();
}

const stringResponseHanlder = (msg) => {
    // if(!readyToTalk) {
    //     if(msg === "handshakeSuccess") {
    //         readyToTalk = true;
    //     }
    // }
    console.log("msg: ",msg);
}

function iframeRequestHandler(reqStr) {
    console.log("received new request:", reqStr);
    stringInterceptor.send(reqStr);
} 

const responseHandler = (data) => {
    if(data.type === "err") { 
        errHandler("String Server", "Our services was not able to connect to the remote server", data.msg);
    }
    // else if(data.type === "success") {
    //     console.log(data);
    // }
};

const serverHandler = (data) => {
    if(data.type === "stringServerOffer" && data.offer !== undefined) { 
        stringInterceptor = new SimplePeer({
            initiator: false,
            trickle: false,
            objectMode: true
        });
        stringInterceptor.on('error', err => errHandler('String Interceptor', '--Peer object error--',err));
        stringInterceptor.on('data', stringResponseHanlder);
        stringInterceptor.on('signal', answer => {
            socket.emit("client", { type: "stringClientAnswer", answer: answer, apphash: apphash, appname: appname });
        });
        stringInterceptor.on('connect', () => { readyToTalk = true; homePageReq(); });
        stringInterceptor.signal(data.offer);
    }
};

socket.on("response", responseHandler);
socket.on("server", serverHandler);

// Request for application home page
function homePageReq() { 
        const doc = document.getElementById("mainFrame").contentWindow.document;
        doc.open();
        doc.write(`<h1>Test</h1><a id="proxyAnchor" href="lol">lllllol</a><script>navigator.serviceWorker.addEventListener('message', event => {
            console.log("got msg:",event.data.msg);
            window.parent.iframeRequestHandler(event.data.msg);
        });console.log("success");document.getElementById("proxyAnchor").click();</script>`);
        doc.close();
}

