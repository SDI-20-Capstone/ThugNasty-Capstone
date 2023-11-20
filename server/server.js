const {createNewUser, updateMember} = require("./Helpers")

const express = require('express');
const app = express();
const port = 8081;
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development'])

// const pool = new Pool({
//       host: '127.0.0.1',
//       user: 'postgres',
//       password: 'docker',
//       port: '5432',
//       database: 'okr'

// })

app.get('/', (req, res) => {
    res.send('Application up and running.')
})

app.get('/userinfo', (req, res) => {
    knex('userinfo')
    .select('*')
    .then(data => {
        res.json(data);
    })
})

app.post('/userinfo', (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        organization,
        rank,
        role
    } = req.body
    createNewUser(first_name,last_name,email,password,organization,rank, role)
    .then((data) => res.status(200).send(data))
})

app.patch('/userinfo', (req, res) => {
  const {
    email,
    unit
  } = req.body
  updateMember(email, unit)
    .then((data) => res.status(201).json(data))
})

app.get('/SignIn', (req, res) => {
    knex('userinfo')
    .select('email', 'password', 'organization_id', 'role')
    .then(data => {
        res.json(data)
    })
})

app.post('/SignIn', (req, res) => {
    const {
        email,
        password,
    } = req.body
    knex('userinfo')
      .select('*')
      .where('email', '=', email)
      .andWhere('password', '=', password)
      .then(result => {
        if (result.length > 0) {
          res.status(201).send(result)
        } else {
          res.status(404).send({ message: 'Wrong username/password combination!' })
        }
      })
})

app.patch('/login', (req, res) => {
    const {
      email,
      id
    } = req.body
    knex('userinfo')
    .select('*')
    .where('id', '=', id)
    .update({
      email: email
    })
    .then(data => {
      res.status(201).json(data)
    })
  })

app.get('/organization', (req, res) => {
  knex('organization')
  .select('*')
  .then(data => {
    res.json(data)
  })
})

app.get('/objectives', (req, res) => {
  knex('objectives')
  .select('*')
  .then(data => {
    res.json(data)
  })
})

app.get('/memberrows', (req, res) => {
  knex('organization')
  .join('userinfo', 'organization.id', '=', 'userinfo.organization_id')
  .select('*')
  .then(data => {
      res.json(data);
  })
})

app.get('/unitrows', (req, res) => {
  knex('organization')
    .select('organization.id', 'organization.name as unit_name', 'parent.name as parent_name')
    .leftJoin('organization as parent', 'organization.parent_id', '=', 'parent.id')
    .then(data => {
      res.json(data);
    })
})

app.listen(port, () => {
    console.log(`this is running on ${port}`)
})