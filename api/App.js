const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors"); //needs installing

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
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthName = monthNames[month];

  // Format the components according to the desired output format
  return `${day.toString().padStart(2, "0")}${hours
    .toString()
    .padStart(2, "0")}${minutes
    .toString()
    .padStart(2, "0")}${monthName}${year}Z`;
};

//SERVER METRICS
morgan.token("id", (req) => {
  return req.id;
});

app.use(morgan(":method :url status::status :response-time ms"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App up and running");
});

//get all report templates
app.get("/report_template", (req, res) => {
  knex("report_template")
    .select("*")
    .then((templates) => {
      res.status(200).json(templates);
    })
    .catch((err) => {
      res.status(404).send({
        message: "No hobbies found",
      });
    });
});

app.get("/report_data", (req, res) => {
  knex("report_data")
    .select("*")
    .join("satellite_data", "report_data.satellite_id", "satellite_data.id")
    .join("accounts_data", "report_data.user_id", "accounts_data.id")
    .orderBy("report_data.date", "desc")
    .then((data) => {
      // Transform the data into the desired format
      const transformedData = data.map((item) => ({
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
          chops: item.chops,
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
    .catch((err) => {
      res.status(404).send({
        message: "No data Found",
      });
    });
});

//get all satellite data
app.get("/satellite", (req, res) => {
  knex("report_data")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: "No data Found",
      });
    });
});

//get all accounts
app.get("/accounts_data", (req, res) => {
  knex("accounts_data")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: "No data Found",
      });
    });
});

//get all units
app.get("/units_data", (req, res) => {
  knex("units_data")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: "No data Found",
      });
    });
});

//get all user groups
app.get("/user_groups", (req, res) => {
  knex("user_groups")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: "No data Found",
      });
    });
});

//search by report
app.get("/report_data/:reportName/", (req, res) => {
  knex("report_data")
    .select("*")
    .join("satellite_data", "report_data.satellite_id", "satellite_data.id")
    .join("accounts_data", "report_data.user_id", "accounts_data.id")
    .whereRaw(
      `report_name ilike '%${req.params.reportName}%' or mission_number ilike '%${req.params.reportName}%'`
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: `No reports name with a Report name of :${req.params.reportName} were found.`,
      });
    });
});

app.get("/accounts_data/:account", (req, res) => {
  knex("accounts_data")
    .select("*")
    .where("oauth_sub", req.params.account)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({
          message: "No data Found",
        });
      } else {
        res.status(201).json(data);
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: "No data Found",
      });
    });
});

//Catch all route
app.get("/*", (req, res) => {
  res.status(404).send({
    message: "There was nothing found here. Maybe check your URL?",
  });
});

app.post("/accounts_data", (req, res) => {
  const checkBodyDetails = (details) => {
    if (details === undefined) {
      return "0";
    } else {
      return details;
    }
  };
  let useraccount = {
    oauth_sub: req.body.oauth_sub,
    username: req.body.userName,
    //rank : checkBodyDetails(req.body.rank),
    //phone : checkBodyDetails(req.body.phone),
    email: req.body.email,
    //chops :  checkBodyDetails(req.body.chops),
    //unit_id : checkBodyDetails(req.body.unit),
    user_group_id: req.body.user_group_id,
  };
  knex("accounts_data")
    .insert(useraccount)
    .then(() => {
      res.status(201).send({
        message: "account successfully created",
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "account sync failed",
      });
    });
});

app.patch("/update_account/:account", (req, res) => {

  let useraccount = {
    username: req.body.username,
    rank : req.body.rank,
    phone : req.body.phone,
    chops: req.body.chops,
    unit_id : req.body.unit_id

  }
  knex("accounts_data")
     .where("oauth_sub", req.params.account)
     .update(useraccount)
     .then((updatedRows) => {
         res.status(200).json({ message: "User data updated successfully" });
       })
     .catch((err) => {
       res.status(500).send({ message: "Error updating user data", error: err });
     });
 });


 app.post("/report_data", (req, res) => {
    let ReportData = {
      report_name: req.body.report_name,
      unit: req.body.unit,
      team_name: req.body.team_name,
      mission_number: req.body.mission_number,
      tpo: req.body.tpo,
      ebno: req.body.ebno,
      ber: req.body.ber,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      pim: req.body.pim,
      weather: req.body.weather,
      event: req.body.event,
      terminal: req.body.terminal,
      opscap: req.body.opscap,
      syscap: req.body.syscap,
      hazcon: req.body.hazcon,
      comments: req.body.comments,
      satellite_id: req.body.satellite_id,
    }
  knex("report_data")
    .insert(ReportData)
    .then(() => {
      res.status(201).send({
        message: "Report Successfully submitted",
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "Report Failed",
      });
    });
});

//listener
app.listen(PORT, () => {
  console.log(`Knex and Express apps are currently running on port ${PORT}`);
});

//select * from (select * from report_data where unitName ilike %8% or missionNum ilike %*% or  or) where report_name = %req.params.filter%

//app.get('/account_details/:accountid')     find account if not send 404 / if yes send 200 and details
