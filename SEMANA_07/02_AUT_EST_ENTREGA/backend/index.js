const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3031;

const experiences = require('./routes/experiences');
const personalities = require('./routes/personalities');
const education = require('./routes/education');
const realization = require('./routes/realizations');
const habilities = require('./routes/habilities');
const curriculum = require('./routes/curriculum');

app.use(express.json());
app.use('/experiences', experiences);
app.use('/personalities', personalities);
app.use('/education', education);
app.use('/realizations', realization);
app.use('/habilities', habilities);
app.use('/curriculum', curriculum);

app.use(express.static("../frontend/"));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});