require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3001;
const wheel_company_master_router = require("./router/wheel_company_master_router");
const wheelmaster_router = require("./router/wheelmaster_router");
const wheel_type_router = require("./router/wheel_type_router");
const blank_card_stock_router = require("./router/blank_card_stock_router");
const auth = require("./middleware/auth");
const { queryDatabase } = require("./db/conn");
const cookieParser = require("cookie-parser");

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routing
app.use("/companymaster", auth, wheel_company_master_router);
app.use("/wheelmaster", auth, wheelmaster_router);
app.use("/wheeltype", auth, wheel_type_router);
app.use("/blank_card_stock", auth, blank_card_stock_router);

// app.use("/blank_card_stock_surat",auth,)

//main page
app.get("/", async (req, res) => {
  return res.json("Hello World");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const query = "select * from USER where username=? and password=?";
  const values = [username, password];

  try {
    const result = await queryDatabase(query, values);
    if (result.length == 0) {
      return res.json({ msg: "Login Failed", success: false });
    }
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
    return res.json({
      msg: "Login Successfull",
      data: result,
      success: true,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Login Failed", error: err, success: false });
  }
});

app.get("/progress/:table", async (req, res) => {
  const table = req.params.table;
  const number = req.query.number;
  const interval = req.query.interval;
  let query;

  if (number === undefined || interval === undefined) {
    if (table == "wheelmaster_surat") {
      query = "select count(*) as progress FROM wheelmaster_surat";
    } else if (table == "wheelmaster") {
      query = "select count(*) as progress FROM wheelmaster";
    } else if (table == "blank_card_stock") {
      query = `SELECT SUM(no_of_card) as progress FROM blank_card_stock;`;
    } else if (table == "blank_card_stock_surat") {
      query = `SELECT SUM(no_of_card) as progress FROM blank_card_stock_surat;`;
    } else {
      query = `SELECT COUNT(*) as progress FROM ${table}`;
    }
  } else {
    query = `SELECT COUNT(*) as progress FROM ${table} WHERE created_at >= NOW() - INTERVAL ${number} ${interval};`;
  }
  try {
    const result = await queryDatabase(query);
    return res.json(result);
  } catch (err) {
    return res.json({ msg: "Error", error: err });
  }
});

app.get("/barchart", auth, async (req, res) => {
  let sql =
    "SELECT wheel_company_name,count(wheel_type_name) as count_of_wheels from wheel_type as a inner join wheel_company_master as b on a.wheel_type_company_index=b.wheel_company_id group by wheel_company_name ORDER BY count_of_wheels DESC LIMIT 10;";
  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (err) {
    res.json({ msg: "Error", error: err });
  }
});

app.get("/barchart/wheelType", auth, async (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = `
      SELECT 
          b.wheel_company_name,
          a.wheel_type_name
      FROM 
          wheel_type AS a
      RIGHT JOIN 
          wheel_company_master AS b
      ON 
          a.wheel_type_company_index = b.wheel_company_id
      WHERE 
          a.wheel_type_name IS NOT NULL
  `;

  // Add date filtering if startDate and endDate are provided
  if (startDate && endDate) {
    sql += ` AND a.created_at BETWEEN ? AND ?`;
  }

  try {
    // Execute query with or without date parameters
    const result =
      startDate && endDate
        ? await queryDatabase(sql, [startDate, endDate])
        : await queryDatabase(sql);
    res.json(result);
  } catch (err) {
    res.json({ msg: "Error", error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
