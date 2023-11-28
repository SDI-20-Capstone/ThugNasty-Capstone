const { createNewUser, updateMember, createNewMeasurement, patchKeyResult } = require("./Helpers")
const express = require('express');
const app = express();
const port = 8081;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])


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
  createNewUser(first_name, last_name, email, password, organization, rank, role)
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
    .select('email', 'password', 'organization_id', 'role','id')
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

app.post('/organization', (req, res) => {
  const {
    unit,
    parent_org,
  } = req.body
  knex('organization')
    .insert([{
      name: unit,
      parent_id: parent_org,
    }])
    .then(result => {
      res.status(201).json(result)
    })
})

app.get('/objectives', (req, res) => {
  knex('objectives')
    .select(
      'objectives.id ',
      'objectives.title as objective_title',
      'objectives.mission_impact',
      'objectives.organization_id',
      'objectives.user_id',
      'key_results.id',
      'key_results.title as kr_title',
      'key_results.target_value',
      'key_results.success_count',
      'key_results.objective_id',
      'key_results.start_date',
      'key_results.end_date',
      'key_results.fail_count',
    )
    .from('objectives')
    .leftJoin('key_results', 'objectives.id', '=', 'key_results.objective_id')
    .then(data => {
      res.json(data)
    })
})

app.post('/objectives', (req, res) => {
  const {
    newObjectiveTitle,
    newMissionImpact,
    userid,
    organizationid,
  } = req.body;

  knex('objectives')
  .insert({
    user_id: userid,
    organization_id: organizationid,
    title: newObjectiveTitle,
    mission_impact: newMissionImpact,
  })
  .returning('*')
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error adding objective' });
    });
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
    .select('organization.id', 'organization.name as unit_name', 'parent.name as parent_name', knex.raw('COUNT(userinfo.id) as member_count'), knex.raw('COUNT(objectives.id) as objectives_count'))
    .leftJoin('organization as parent', 'organization.parent_id', '=', 'parent.id')
    .leftJoin('userinfo', 'organization.id', '=', 'userinfo.organization_id')
    .leftJoin('objectives', 'organization.id', '=', 'objectives.organization_id')
    .groupBy('organization.id', 'organization.name', 'parent.name')
    .then(data => {
      res.json(data);
    })
})

app.get('/key_results', (req, res) => {
  knex('key_results')
    .select('*')
    .then(data => {
      res.json(data)
    })
})

app.patch('/key_results', (req, res) => {
  const {
    key_result_id,
    count,
    success
  } = req.body;
  patchKeyResult(key_result_id, count, success)
  .then(data => {
    res.status(201).json(data)
  })
})

app.post('/key_results', (req,res) => {
  const {
    newKrTitle,
    title,
    newStartDate,
    newEndDate,
    newTargetValue,
    newSuccessCount,
    newFailCount
  } = req.body;

  const objId = knex('objectives').select('id').where('title', '=', title)

  knex('key_results')
  .insert({
    title: newKrTitle,
    objective_id: objId,
    start_date: newStartDate,
    end_date: newEndDate,
    target_value: newTargetValue,
    success_count: newSuccessCount,
    fail_count: newFailCount
  })
  .then((data) => res.status(201).json(data))
  .catch((error) => {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding key result'})
  })
})

app.get('/organization_page', (req, res) => {
  knex('organization')
    .select(
      'organization.id',
      'organization.name as unit_name',
      'parent.name as parent_name',
      'objectives.title',
      'objectives.mission_impact',
      'key_results.start_date',
      'key_results.end_date',
      'key_results.target_value',
      'key_results.success_count',
      'key_results.fail_count'
    )
    .leftJoin('organization as parent', 'organization.parent_id', '=', 'parent.id')
    .leftJoin('objectives', 'organization.id', '=', 'objectives.organization_id')
    .leftJoin('key_results', 'objectives.id', '=', 'key_results.objective_id')
    .groupBy('organization.id', 'organization.name', 'parent.name', 'objectives.title', 'objectives.mission_impact', 'key_results.start_date', 'key_results.end_date', 'key_results.target_value', 'key_results.success_count', 'key_results.fail_count')
    .then(data => {
      const groupedData = data.reduce((result, item) => {
        const key = item.id;
        if (!result[key]) {
          result[key] = {
            id: item.id,
            unit_name: item.unit_name,
            parent_name: item.parent_name,
            objectives: [],
          };
        }

        result[key].objectives.push({
          title: item.title,
          mission_impact: item.mission_impact,
          start_date: item.start_date,
          end_date: item.end_date,
          target_value: item.target_value,
          success_count: item.success_count,
          fail_count: item.fail_count,
        });

        return result;
      }, {});

      const groupedArray = Object.values(groupedData);
      res.json(groupedArray);
    })
})
app.get('/addMember', (req, res) => {
  knex('userinfo')
    .select('*')
    .then(data => {
      res.json(data);
    })
})

app.post('/addMember', (req, res) => {
  const { first_name, last_name, email, password, organization_id, rank } = req.body;

  createNewUser(first_name, last_name, email, password, organization_id, rank)
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error adding member' });
    });
});

app.delete('/removeMember', (req, res) => {
  const { id } = req.body;

  knex('userinfo')
    .where('id', '=', id)
    .del()
    .then(() => {
      res.status(200).json({ success: true, message: 'Member deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

app.delete('/removeUnit', (req, res) => {
  const { id } = req.body;

  knex('organization')
    .where('id', '=', id)
    .del()
    .then(() => {
      res.status(200).json({ success: true, message: 'Unit deleted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

app.get('/organization/:id/objectives', (req, res) => {
  const organizationId = req.params.id;
  knex('objectives')
    .select('*')
    .leftJoin('key_results', 'objectives.id', '=', 'key_results.objective_id')
    .where('objectives.organization_id', '=', organizationId)
    .then(data => {
      res.json(data);
    })
});

app.get('/home_orginfo', (req, res) => {
  knex('objectives')
  .select(
    'objectives.id ',
    'objectives.title as objective_title',
    'objectives.mission_impact',
    'objectives.organization_id',
    'organization.name as organization_name',
    'objectives.user_id',
    'key_results.id as kr_id',
    'key_results.title as kr_title',
    'key_results.target_value',
    'key_results.success_count',
    'key_results.objective_id',
    'key_results.start_date',
    'key_results.end_date',
    'key_results.fail_count',
)
  .leftJoin('key_results', 'objectives.id', '=', 'key_results.objective_id')
  .leftJoin('organization', 'objectives.organization_id', '=', 'organization.id')
  .groupBy('objectives.id', 'key_results.id', 'organization.name')
  .then(data => {
    const groupedData = data.reduce((result, item) => {
      const key = `${item.objective_title}-${item.mission_impact}-${item.organization_id}-${item.organization_name}-${item.user_id}-${item.objective_id}`;
      if (!result[key]) {
        result[key] = {
          id: item.id,
          objective_title: item.objective_title,
          mission_impact: item.mission_impact,
          organization_id: item.organization_id,
          organization_name: item.organization_name,
          user_id: item.user_id,
          objective_id: item.objective_id,
          objectives: [],
        };
      }

      result[key].objectives.push({
        kr_id: item.kr_id,
        kr_title: item.kr_title,
        target_value: item.target_value,
        success_count: item.success_count,
        start_date: item.start_date,
        end_date: item.end_date,
        fail_count: item.fail_count,
      });

        return result;
      }, {});

      const groupedArray = Object.values(groupedData);
      res.json(groupedArray);
    })
})

app.get('/measurements', (req, res) => {
  knex('measurement_table')
  .select('*')
  .then(data => {
    res.send(data)
  })
})

app.post('/measurements', (req, res) => {
  const {
    key_result_id,
    date,
    count,
    success,
    notes
  } = req.body;
  createNewMeasurement(key_result_id, date, count, success, notes)
  .then(result => {
    res.status(201).json(result)
  })
})

app.get('/personal_key_results', (req, res) => {
  knex('personal_key_results')
    .select('*')
    .then(data => {
      res.json(data)
    })
})

app.get('/personal_objectives', (req, res) => {
  knex('personal_objectives')
    .select(
      'personal_objectives.id',
      'personal_objectives.user_id',
      'personal_objectives.objective',
      'personal_objectives.impact',
      'personal_key_results.id as key_result_id',
      'personal_key_results.title as key_result_title',
      'personal_key_results.start_date',
      'personal_key_results.end_date',
      'personal_key_results.target_value ',
      'personal_key_results.success_count',
      'personal_key_results.fail_count'
    )
    .leftJoin('personal_key_results', 'personal_objectives.id', '=', 'personal_key_results.personal_objective_id')
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching personal objectives:', error);
      res.status(500).json({ success: false, message: 'Error fetching personal objectives' });
    });
});

app.get('/personal_objectives/:userId', (req, res) => {
  const userId = req.params.userId;

  knex('personal_objectives')
    .select('*')
    .where('user_id', '=', userId)
    .then(data => {
      console.log('Personal objectives fetched successfully:', data);
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching personal objectives:', error);
      res.status(500).json({ success: false, message: 'Error fetching personal objectives' });
    });
});

app.get('/personal_key_results/:userId', (req, res) => {
  const userId = req.params.userId;

  knex('personal_key_results')
    .select('*')
    .join('personal_objectives', 'personal_key_results.personal_objective_id', '=', 'personal_objectives.id')
    .where('personal_objectives.user_id', '=', userId)
    .then(data => {
      console.log('Personal key results fetched successfully:', data);
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching personal key results:', error);
      res.status(500).json({ success: false, message: 'Error fetching personal key results' });
    });
});

app.get('/objinfo', (req, res) => {
  knex('objectives')
  .select('*')
  .then(data => {
    res.send(data)
  })
})

app.get('/homepersonal_info', (req, res) => {
  knex('personal_objectives')
    .select(
      'personal_objectives.id',
      'personal_objectives.user_id',
      'personal_objectives.objective',
      'personal_objectives.impact',
      'personal_key_results.id as kr_id',
      'personal_key_results.title as kr_title',
      'personal_key_results.start_date',
      'personal_key_results.end_date',
      'personal_key_results.target_value',
      'personal_key_results.success_count',
      'personal_key_results.fail_count'
    )
    .leftJoin('personal_key_results', 'personal_objectives.id', '=', 'personal_key_results.personal_objective_id')
    .leftJoin('personal_measurement_table', 'personal_key_results.id', '=', 'personal_measurement_table.personal_key_result_id')
    .groupBy(
      'personal_objectives.id',
      'personal_key_results.id'
    )
    .then(data => {
      const groupedData = data.reduce((result, item) => {
        const key = `${item.objective}-${item.impact}-${item.user_id}-${item.id}`;
        if (!result[key]) {
          result[key] = {
            id: item.id,
            user_id: item.user_id,
            objective: item.objective,
            impact: item.impact,
            objectives: [],
          };
        }

        result[key].objectives.push({
          kr_id: item.kr_id,
          kr_title: item.kr_title,
          start_date: item.start_date,
          end_date: item.end_date,
          target_value: item.target_value,
          success_count: item.success_count,
          fail_count: item.fail_count,
        });

        return result;
      }, {});

      const groupedArray = Object.values(groupedData);
      res.json(groupedArray);
    })
});

app.get('/personal_measurements', (req, res) => {
  knex('personal_measurement_table')
  .select('*')
  .then(data => {
    res.send(data)
  })
})

app.post('/personal_measurements', (req, res) => {
  const {
    key_result_id,
    date,
    count,
    success,
    notes
  } = req.body;
  createNewMeasurement(key_result_id, date, count, success, notes)
  .then(result => {
    res.status(201).json(result)
  })
})

app.get('/personal_key_results', (req, res) => {
  knex('personal_key_results')
    .select('*')
    .then(data => {
      res.json(data)
    })
})

app.patch('/personal_key_results', (req, res) => {
  const {
    key_result_id,
    count,
    success
  } = req.body;
  patchKeyResult(key_result_id, count, success)
  .then(data => {
    res.status(201).json(data)
  })
})

app.post('/personal_key_results', (req,res) => {
  const {
    newKrTitle,
    title,
    newStartDate,
    newEndDate,
    newTargetValue,
    newSuccessCount,
    newFailCount
  } = req.body;

  const objId = knex('personal_objectives').select('id').where('objective', '=', title)

  knex('personal_key_results')
  .insert({
    title: newKrTitle,
    objective_id: objId,
    start_date: newStartDate,
    end_date: newEndDate,
    target_value: newTargetValue,
    success_count: newSuccessCount,
    fail_count: newFailCount
  })
  .then((data) => res.status(201).json(data))
  .catch((error) => {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding key result'})
  })
})

app.listen(port, () => {
  console.log(`this is running on ${port}`)
})