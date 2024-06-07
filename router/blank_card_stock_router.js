const express = require("express");
const { queryDatabase } = require("../db/conn");
const e = require("express");
const router = express.Router();

router.get("/showDetials/:table", async (req, res) => {
  let table = req.params.table;
  let sql = "";
  if (table === "rajkot") {
    sql = `select * from blank_card_stock`;
  } else {
    sql = `select * from blank_card_stock_${table}`;
  }
  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  let table = req.query.table;
  const { no_of_card, purchase_date, receive_by, total_stock, inward_type } =
    req.body;
  const sql = `
      UPDATE blank_card_stock${table}
      SET 
        no_of_card = ?,
        purchase_date = ?,
        receive_by = ?,
        total_stock = ?,
        inward_type = ?
      WHERE purchase_id = ?
    `;
  try {
    await queryDatabase(sql, [
      no_of_card,
      purchase_date,
      receive_by,
      total_stock,
      inward_type,
      id,
    ]);
    res.json({ message: "Success", error: 0 });
  } catch (error) {
    res.json({ message: "Error", error: 1 });
  }
});

router.post("/addNewCard/:table", async (req, res) => {
  let table = req.params.table;
  const { no_of_card, purchase_date, receive_by, total_stock, inward_type } =
    req.body;

  let sql = "";
  if (table === "rajkot") {
    sql = `
      INSERT INTO blank_card_stock (no_of_card, purchase_date, receive_by, total_stock, inward_type)
      VALUES (?, ?, ?, ?, ?)
    `;
  } else {
    sql = `
    INSERT INTO blank_card_stock_surat (no_of_card, purchase_date, receive_by, total_stock, inward_type)
    VALUES (?, ?, ?, ?, ?)
  `;
  }

  try {
    await queryDatabase(sql, [
      no_of_card,
      purchase_date,
      receive_by,
      total_stock,
      inward_type,
    ]);
    res.json({ message: "Success", error: 0 });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error", error: 1 });
  }
});

router.delete("/deleteCard/:id", async (req, res) => {
  let table=req.query.table;
  const id = req.params.id;
  let sql = `DELETE from blank_card_stock${table} where purchase_id = ?`;
  try {
    const result = await queryDatabase(sql, [id]);
    res.json({ message: "Success", error: 0 });
  } catch (error) {
    res.json({ message: "Error", error: 1 });
  }
});

module.exports = router;
