const knex = require("knex")(require("./knexfile.js")["development"]);

const createNewUser = (first_name,last_name,email,password,organization_id,rank,) => {
  const orgId = knex('organization').select('organization.id').where("id", "=", organization_id)

  return knex("userinfo").insert([{
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    organization_id: orgId,
    rank: rank,
    role: "user"
  }])
}

const updateMember = (email, unit) => {
  const updateOrgId = knex('organization').select('organization.id').where("name", "=", unit)

  return knex("userinfo")
          .select('*')
          .where("email", "=", email)
          .update({organization_id: updateOrgId})
}

module.exports = {createNewUser, updateMember}