const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors') //needs installing

//Default API TEMPLATE

//SERVER METRICS
morgan.token('id', (req) => { //creating id token
  return req.id
})


// //Prevents CORS ERRORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(morgan(':method :url status::status :response-time ms'))
app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  res.send('App up and running')
})

//get all report templates
app.get('/report_template', (req, res) => {
  knex('report_template')
    .select('*')
    .then(templates => {
        res.status(200).json(templates)
    })
    .catch(err => {
      res.status(404).send({
        message: "No hobbies found"})

    })
})

//gets all report data
app.get('/report_data', cors(), (req, res) => {
  knex('report_data')
    .select(knex.raw("report_data.*, to_char(report_data.date AT TIME ZONE 'UTC', 'DDHH24MIMonYYYY') || 'Z' as date"))
    .join('satellite_data', 'report_data.satellite_id', 'satellite_data.id')
    .join('accounts_data', 'report_data.user_id', 'accounts_data.id')
    .orderBy('report_data.date', 'desc')
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).send({
        message: "No data Found"})
    })
})

//get all satellite data
app.get('/satellite', (req, res) => {
  knex('report_data')
    .select('*')
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).send({
        message: "No data Found"})
    })
})

//get all accounts
app.get('/accounts_data', (req, res) => {
  knex('accounts_data')
    .select('*')
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).send({
        message: "No data Found"})
    })
})

//get all units
app.get('/units_data', (req, res) => {
  knex('units_data')
    .select('*')
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).send({
        message: "No data Found"})
    })
})

//get all user groups
app.get('/user_groups', (req, res) => {
  knex('user_groups')
    .select('*')
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).send({
        message: "No data Found"})
    })
})

//search by report
app.get('/report_data/:reportName/', (req, res) => {
    knex('report_data')
    .select('*')
    .join('satellite_data', 'report_data.satellite_id', 'satellite_data.id')
    .join('accounts_data', 'report_data.user_id', 'accounts_data.id')
    .whereRaw(`report_name ilike '%${req.params.reportName}%' or mission_number ilike '%${req.params.reportName}%'`)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).send({
        message: `No reports name with a Report name of :${req.params.reportName} were found.`
      })
    })
})

//Catch all route
app.get('/*', (req,res) => {
  res.status(404).send({
    message: 'There was nothing found here. Maybe check your URL?'
  })
});



app.post('/accounts_data', (req, res) => {
  const checkBodyDetails = (details) => {
    if (details === undefined) {
      return "0"
    } else {
    return details
    }
  }
  let useraccount = {
    o_auth_id : req.body.oAuth,
    username : req.body.userName,
    rank : checkBodyDetails(req.body.rank),
    phone : checkBodyDetails(req.body.phone),
    email : req.body.email,
    CHOPs :  checkBodyDetails(req.body.chops),
    unit_id : checkBodyDetails(req.body.unit),
    user_group_id : req.body.usergroup
  }
  knex('accounts_data')
    .insert(useraccount)
    .then(() => {
      res.status(201).send({
        message : 'account successfully created'
      })
    })
})


// app.patch('/accounts_data/:account'), (req, res) => {
//   knex('account_data')
//   .where(o_auth_id)
//   .update(req.body)
// }



//listener
app.listen(PORT, () => {
  console.log(`Knex and Express apps are currently running on port ${PORT}`)
})



//select * from (select * from report_data where unitName ilike %8% or missionNum ilike %*% or  or) where report_name = %req.params.filter%