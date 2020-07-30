const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.Server(app);
const port = 4000 || process.env.PORT;
app.use("/", express.static(path.join(__dirname)));

app.get("/jk",(req, res) => {
    console.log("jk requested");
    res.send("ehyyy");
});


server.listen(port, () => console.log(`App active on port ${port}`));