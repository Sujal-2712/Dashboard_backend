const { queryDatabase } = require("./../db/conn");

async function GetAllWheels(req, res) {
  let sql = "SELECT * FROM wheelmaster";
  try {
    const result = await queryDatabase(sql);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetWheelById(req, res) {
  let sql = "SELECT * FROM wheelmaster WHERE RFIdNo=?";
  try {
    const result = await queryDatabase(sql, req.params.id);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetWheelAllType(req, res) {
  let table = req.params.table;
  let sql = "";
  if (table === "rajkot") {
    sql = `SELECT * FROM wheelmaster`;
  } else {
    sql = `SELECT * FROM wheelmaster_${table}`;
  }

  try {
    const result = await queryDatabase(sql);
    console.log(result);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function AddNewWheel(req, res) {
  const data = req.body;
  let sql = `INSERT INTO wheelmaster (
        RFIdNo,
        WheelType,
        WheelTypeIndex,
        WheelCompany,
        WheelCompanyId,
        WheelWidth,
        Description,
        ApproxWeightLoss,
        isUpload,
        isActive,
        MachineBatchNo,
        SoftwareType,
        UPDATE_TIME,
        Rasio,
        IsUse
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let values = [
    data.RFIdNo,
    data.WheelType,
    data.WheelTypeIndex,
    data.WheelCompany,
    data.WheelCompanyId,
    data.WheelWidth,
    data.Description,
    data.ApproxWeightLoss,
    data.isUpload,
    data.isActive,
    data.MachineBatchNo,
    data.SoftwareType,
    data.UPDATE_TIME,
    data.Rasio,
    data.IsUse,
  ];

  try {
    const result = await queryDatabase(sql, values);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function GetWheelByCompanyName(req, res) {
  const name = req.query.name;
  let sql = "select * from wheelmaster where WheelCompany = ? ";
  try {
    const result = await queryDatabase(sql, [name]);
    return res.json(result);
  } catch (err) {
    return res.json({ error: err });
  }
}

async function UpdateWheelById(req, res) {
  const data = req.body;
  let sql = `UPDATE wheelmaster SET `;
  let values = [];
  for (const key in data) {
    sql += `${key} = ? ,`;
    values.push(data[key]);
  }
  sql = sql.slice(0, -1);
  sql += ` WHERE RFIdNo = ?`;
  values.push(req.params.id);

  try {
    const result = await queryDatabase(sql, values);
    return res.json(result);
  } catch (error) {
    return res.json({ error: error });
  }
}

async function DeleteWheelById(req, res) {
  let id = req.params.id;
  let sql = "DELETE FROM wheelmaster WHERE RFIdNo=?";
  try {
    const result = await queryDatabase(sql, id);
    return res.json(result);
  } catch (error) {
    res.json({ error: error });
  }
}

async function SearchWheelTypeByLettes(req, res) {
  let sql = "SELECT * FROM wheelmaster WHERE WheelType LIKE ?";
  try {
    const result = await queryDatabase(sql, [req.params.name + "%"]);
    return res.json(result);
  } catch (e) {
    return res.json({ error: e });
  }
}

async function GetAllWheelsPagination(req, res) {
  if (!req.query.page && !req.query.limit) {
    let sql = "SELECT * FROM wheelmaster";
    try {
      const result = await queryDatabase(sql);
      return res.json(result);
    } catch (error) {
      return res.json({ error: err });
    }
  } else {
    const pageNo = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (pageNo - 1) * limit;
    let sql = "SELECT * FROM wheelmaster LIMIT ? OFFSET ?";
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
  GetAllWheels,
  GetWheelById,
  AddNewWheel,
  UpdateWheelById,
  DeleteWheelById,
  SearchWheelTypeByLettes,
  GetAllWheelsPagination,
  GetWheelAllType,
  GetWheelByCompanyName,
};
