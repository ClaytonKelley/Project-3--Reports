const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors') //needs installing

//Conver full zult time to zulu DTG
const dtgConvert = (stringtoconvert) => {
   // Parse the input string to create a Date object
   const date = new Date(stringtoconvert);

   // Extract the components
   const day = date.getUTCDate();
   const month = date.getUTCMonth(); // Note: January is 0, February is 1, etc.
   const year = date.getUTCFullYear();
   const hours = date.getUTCHours();
   const minutes = date.getUTCMinutes();

   // Convert month number to abbreviated month name
   const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
   const monthName = monthNames[month];

   // Format the components according to the desired output format
   return `${day.toString().padStart(2, '0')}${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${monthName}${year}Z`;
}


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
// app.get('/report_data', (req, res) => {
//   knex('report_data')
//     //.select(knex.raw("report_data.*, to_char(report_data.date AT TIME ZONE 'UTC', 'DDHH24MIMonYYYY') || 'Z' as date"))
//     .select('*')
//     .join('satellite_data', 'report_data.satellite_id', 'satellite_data.id')
//     .join('accounts_data', 'report_data.user_id', 'accounts_data.id')
//     .orderBy('report_data.date', 'desc')
//     .then(data => {
//         res.status(200).json(data)
//     })
//     .catch(err => {
//       res.status(404).send({
//         message: "No data Found"})
//     })
// })



app.get('/report_data', (req, res) => {
  knex('report_data')
     .select('*')
     .join('satellite_data', 'report_data.satellite_id', 'satellite_data.id')
     .join('accounts_data', 'report_data.user_id', 'accounts_data.id')
     .orderBy('report_data.date', 'desc')
     .then(data => {
       // Transform the data into the desired format
       const transformedData = data.map(item => ({
         id: item.id,
         report_name: item.report_name,
         date: dtgConvert(item.date),
         unit: item.unit,
         team_name: item.team_name,
         mission_number: item.mission_number,
         tpo: item.tpo,
         ebno: item.ebno,
         ber: item.ber,
         latitude: item.latitude,
         longitude: item.longitude,
         pim: item.pim,
         weather: item.weather,
         event: item.event,
         terminal: item.terminal,
         opscap: item.opscap,
         syscap: item.syscap,
         hazcon: item.hazcon,
         comments: item.comments,
         user: {
           oauth_sub: item.oauth_sub,
           username: item.username,
           rank: item.rank,
           phone: item.phone,
           email: item.email,
           CHOPs: item.CHOPs,
          },
         satellite: {
          satellite_name: item.satellite_name,
          iron: item.iron,
          orbital_pos: item.orbital_pos,
          norad_id: item.norad_id,
        },
         unit_id: item.unit_id,
         user_group_id: item.user_group_id,
       }));

       res.status(200).json(transformedData);
     })
     .catch(err => {
       res.status(404).send({
         message: "No data Found"
       });
     });
 });




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
    oauth_sub : req.body.sub,
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