const { queryDatabase } = require("../db/conn");

async function AddNewCompanyDetails(req, res) {
  const data = req.body;
  console.log(data);
  let sql =
    "INSERT INTO wheel_company_master (wheel_company_id,wheel_company_name, wheel_company_address, wheel_company_phno, wheel_company_site, wheel_company_email, wheel_company_person, short_name) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
  values = [
    data.wheel_company_id,
    data.wheel_company_name,
    data.wheel_company_address,
    data.wheel_company_phno,
    data.wheel_company_site,
    data.wheel_company_email,
    data.wheel_company_person,
    data.short_name,
  ];
  try {
    const result = await queryDatabase(sql, values);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetCompanyDetails(req, res) {
  const { startDate, endDate } = req.query;
  console.log(startDate,endDate);
    let sql = `
        SELECT 
            *
        FROM 
            wheel_company_master
        WHERE 
            1 = 1
    `;

    if (startDate && endDate) {
        sql += ` AND created_at BETWEEN ? AND ?`;
    }

    try {
        const result = startDate && endDate 
            ? await queryDatabase(sql, [startDate, endDate])
            : await queryDatabase(sql);
        res.json(result);
    } catch (err) {
        res.json({ msg: "Error", error: err });
    }
}

async function GetAllWheelCompany(req, res) {
  let sql = "SELECT wheel_company_name FROM wheel_company_master";
  try {
    const result = await queryDatabase(sql);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetCodeByComapanyName(req,res)
{
  let sql = "SELECT short_name,wheel_company_id FROM wheel_company_master WHERE wheel_company_name LIKE ?";

  try {
    const result = await queryDatabase(sql,[req.params.name+ "%"]);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetCompanyPagination(req, res) {
  if (!req.query.page && !req.query.limit) {
    let sql = "SELECT * FROM wheel_company_master";
    try {
      const result = await queryDatabase(sql);
      return res.json(result);
    } catch (error) {
      return res.json({ error: err });
    }
  } else {
    const pageNo = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit);
    const offset = (pageNo - 1) * limit;
    let sql = "SELECT * FROM wheel_company_master LIMIT ? OFFSET ?";
    try {
      const result = await queryDatabase(sql, [limit, offset]);
      return res.json(result);
    } catch (err) {
      console.error("Error:", err);
      return res.json({ error: err });
    }
  }
}

async function GetCompanyDetailsById(req, res) {
  let sql = "SELECT * FROM wheel_company_master WHERE wheel_company_id LIKE ?";
  try {
    const result = await queryDatabase(sql, [req.params.id]);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function UpdateAllCompanyDetails(req, res) {
  const data = req.body;
  let sql =
    "UPDATE wheel_company_master SET wheel_company_name = ?, wheel_company_address = ?, wheel_company_phno = ?, wheel_company_site = ?, wheel_company_email = ?, wheel_company_person = ?, short_name = ? WHERE wheel_company_id = ?";
  values = [
    data.wheel_company_name,
    data.wheel_company_address,
    data.wheel_company_phno,
    data.wheel_company_site,
    data.wheel_company_email,
    data.wheel_company_person,
    data.short_name,
    req.params.id,
  ];
  try {
    const result = await queryDatabase(sql, values);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function UpdatePartialCompanyDetails(req, res) {
  const data = req.body;
  let sql = "UPDATE wheel_company_master SET ";
  // console.log(sql);
  let values = [];
  for (const key in data) {
    sql += `${key} = ?,`;
    values.push(data[key]);
  }
  // console.log(sql);
  sql = sql.slice(0, -1);
  // console.log(values);
  sql += " WHERE wheel_company_id = ?";
  values.push(req.params.id);
  // console.log(sql);
  try {
    const result = await queryDatabase(sql, values);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function DeleteCompanyDetails(req, res) {
  let sql = "DELETE FROM wheel_company_master WHERE wheel_company_id = ?";
  try {
    const result = await queryDatabase(sql, req.params.id);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function SearchCompanyByLetters(req, res) {
  // console.log(req.params.name);
  let sql =
    "SELECT * FROM wheel_company_master WHERE wheel_company_name LIKE ?";
  try {
    const result = await queryDatabase(sql, [req.params.name + "%"]);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}



module.exports = {
  AddNewCompanyDetails,
  GetCompanyDetailsById,
  UpdateAllCompanyDetails,
  UpdatePartialCompanyDetails,
  DeleteCompanyDetails,
  SearchCompanyByLetters,
  GetCompanyPagination,
  GetAllWheelCompany,
  GetCodeByComapanyName,
  GetCompanyDetails,
};
