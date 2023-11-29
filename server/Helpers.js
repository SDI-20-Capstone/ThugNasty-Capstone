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

const createNewMeasurement = (key_result_id, date, count, success, notes) => {
  return knex("measurement_table").insert([{
    key_result_id: key_result_id,
    date: date,
    count: count,
    success: success,
    notes: notes
  }])
}

const patchKeyResult = (key_result_id, count, success) => {

  if(success === true){
    return knex('key_results')
    .select('*')
    .where('id', '=', key_result_id)
    .update({success_count: count})
  } else {
    return knex('key_results')
    .select('*')
    .where('id', '=', key_result_id)
    .update({fail_count: count})
  }
}

const persPatchKeyResult = (personal_key_result_id, count, success) => {
  if(success === true){
    return knex('personal_key_results')
    .select('*')
    .where('id', '=', personal_key_result_id)
    .update({success_count: count})
  } else {
    return knex('personal_key_results')
    .select('*')
    .where('id', '=', personal_key_result_id)
    .update({fail_count: count})
  }
}

const createNewPersMeasurement = (personal_key_result_id, date, count, success, notes) => {
  return knex("personal_measurement_table").insert([{
    personal_key_result_id: personal_key_result_id,
    date: date,
    count: count,
    success: success,
    notes: notes
  }])
}


module.exports = {createNewUser, updateMember, createNewMeasurement, patchKeyResult, persPatchKeyResult, createNewPersMeasurement}