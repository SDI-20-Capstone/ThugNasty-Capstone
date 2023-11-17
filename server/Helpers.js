const knex = require("knex")(require("./knexfile.js")["development"]);

const createNewUser = (first_name,last_name,email,password,organization,rank, role) => {
  const orgId = knex('organization').select('organization.id').where("name", "=", organization)

  return knex("userinfo").insert([{
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    organization_id: orgId,
    rank: rank,
    role: role
  }])
}

const updateMember = (email, unit) => {
  const orgId = knex('organization').select('organization_id').where("name", "=", unit)

  return knex("userinfo")
          .select('*')
          .where("email", "=", email)
          .update({organization_id: orgId})
}

module.exports = {createNewUser, updateMember}