const express = require("express");
const app = express();
const { connect } = require("./db");
const responseTime = require("response-time");
const client = require("./db");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT | "3001";

app.use(
  responseTime((req, res, time) => {
    const now = new Date();
    const date = now
      .toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/ /g, " ")
      .replace(/\//g, "/");
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    console.log(`${date} ${timeStr} `);
    console.log(`- ${req.method}-${req.url} - ${time.toFixed(4)}ms`);
  })
);

app.use(express.json());

app.get("/employees", async (req, res) => {
  const { id } = req.query;

  try {
    let apiResponse;
    if (id) {
      apiResponse = await client.query("SELECT * FROM employee WHERE id = $1", [
        id,
      ]);
    } else {
      apiResponse = await client.query("SELECT * FROM employee");
    }
    if (apiResponse.rows.length > 0) {
      res.send(apiResponse.rows);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("INTERNAL_SERVER_ERROR");
  }
});

app.delete("/employees", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(400).send("id required");
  }
  try {
    const apiResponse = await client.query(
      "DELETE from employee WHERE id = $1 ",
      [id]
    );
    if (apiResponse.rowCount > 0) {
      res.send("employee " + id + " succesfully deleted");
    } else {
      res.status(404).send("emploeyee not found");
    }
  } catch (err) {
    res.status(500).send("INTERNAL_SERVER_ERROR");
  }
});

app.purge("/employees", (req, res) => {
  console.log("purged");
  console.log(res);
  return res.send("purged");
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  await client.connect();
});
