const express = require('express');
const app = express();
const port = 8081;
// const cors = require('cors');

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development'])
app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
    res.send('Application up and running.')
})
app.listen(port, () => {
    console.log(`this is running on ${port}`)
})