var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send("Home page");
});
app.get('/login', (req, res) => {
    res.send("Login page");
});
app.listen(3000, () => {
    console.log('Connected 3000 port!');
});