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
// To handle global errors
function ErrHandler(source, head, msg) {
    const errDiv = document.getElementById("errDiv");
    const errHead = document.getElementById("errHead");
    const errMsg = document.getElementById("errMsg");
    errHead.innerText = head;
    errMsg.innerText = "Error from "+source+": "+msg;
    errDiv.style.display = "block";
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
//         doc.open();
//         doc.write('<h1>Test</h1><a href="lol.html">lllllol</a><script>'+serviceFunc+'</script>');
//         doc.close();
//     }
// }

