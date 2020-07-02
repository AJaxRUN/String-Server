const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);

const port = 3000 || process.env.PORT;
const options = {
    // setHeaders: function (res, path, stat) {
    //     // res.set('Service-Worker-Allowed', true)
    // }
}
app.use(express.static(__dirname, options));

http.listen(port, () => console.log(`App active on port ${port}`));