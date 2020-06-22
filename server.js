const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//api end point
const api = require('./server/routes/api');

// port
const port = 4000;

const app = express();

app.use(express.static(path.join(__dirname, "/dist/videoApp")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/videoApp/index.html'));
});

app.listen(port, function () {
    console.log("Server is running on localhost: " + port);
});