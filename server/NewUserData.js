const knex = require("knex")(require("./knexfile.js")["development"]);

const createNewUser = (first_name, last_name, email, password, organization, rank, role) => {
 return knex('userinfo').insert([{
  first_name: first_name,
  last_name: last_name,
  email: email,
  password: password,
  organization: organization,
  rank: rank,
  role: role
  }])
}

module.exports = {createNewUser};