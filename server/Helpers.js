const knex = require("knex")(require("./knexfile.js")["development"]);

const createNewUser = (first_name,last_name,email,password,organization,rank) => {
  const orgId = knex('organization').select('organization.id').where("name", "=", organization)

  return knex("userinfo").insert([{
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    organization_id: orgId,
    rank: rank
  }])
}

module.exports = {createNewUser}