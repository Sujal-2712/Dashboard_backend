const {queryDatabase} = require("./../db/conn");
async function GetAllWheelTypes(req, res) {
  let sql = "SELECT * FROM wheel_type";
  try {
    const result = await queryDatabase(sql);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetWheelTypeById(req, res) {
  let sql = "SELECT * FROM wheel_type WHERE wheel_type_company_index = ?";
  try {
    const result = await queryDatabase(sql, [req.params.id]);
    return res.json(result);
  } catch (e) {
    return res.json({ error: e });
  }
}

async function AddNewWheelType(req, res) {
  const data = req.body;
  console.log(data);
  
  let sql = `INSERT INTO wheel_type (
      wheel_type_name,
      wheel_type_company_index,
      wt_wheel_motor_spd,
      wheel_size,
      remarks
  ) VALUES (?, ?, ?, ?, ?)`;

  let values = [
      data.companyCode,
      data.wheelCompanyId,
      data.rpm,
      data.wheelSize,
      data.remark
  ];

  try {
      const result = await queryDatabase(sql, values);
      return res.json(result);
  } catch (error) {
      console.error("Error inserting new wheel type:", error);
      return res.status(500).json({ error: "Failed to insert new wheel type" });
  }
}

async function GetAllWheelSize(req,res)
{
  let sql = "SELECT wheel_size FROM wheel_type";
  try {
    const result = await queryDatabase(sql);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function UpdateWheelTypeById(req, res) {
  const data = req.body;
  let sql = `UPDATE wheel_type SET`;
  for (const key in data) {
    sql += `${key} = ?,`;
    values.push(data[key]);
  }
  sql = sql.slice(0, -1);
  sql += `WHERE wheel_type_id = ?`;
  values.push(req.params.id);
  try {
    const result = await queryDatabase(sql, values);
    return res.json(result);
  } catch (e) {
    return res.json({ error: e });
  }
}

async function DeleteWheelTypeById(req, res) {
  let sql = "DELETE FROM wheel_type WHERE wheel_type_id = ?";
  try {
    const result = await queryDatabase(sql, [req.params.id]);
    return res.json(result);
  } catch (error) {
    return res.json({ error: error });
  }
}

async function SearchWheelTypeByLetters(req, res) {
  let sql = `SELECT * FROM wheel_type WHERE wheel_type_name LIKE "${req.params.name}%";`;
  try {
    const result = await queryDatabase(sql);
    return res.json(result);
  } catch (error) {
    return res.json({ error: error });
  }
}

async function GetAllWheelTypesPagination(req, res) {
  if (!req.query.page && !req.query.limit) {
    let sql = "SELECT * FROM wheel_type";
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
    let sql = "SELECT * FROM wheel_type LIMIT ? OFFSET ?";
    try {
      const result = await queryDatabase(sql, [limit, offset]);
      return res.json(result);
    } catch (err) {
      console.error("Error:", err);
      return res.json({ error: err });
    }
  }
}


module.exports = {
  GetAllWheelTypes,
  GetWheelTypeById,
  AddNewWheelType,
  UpdateWheelTypeById,
  DeleteWheelTypeById,
  SearchWheelTypeByLetters,
  GetAllWheelTypesPagination,
  GetAllWheelSize
};

