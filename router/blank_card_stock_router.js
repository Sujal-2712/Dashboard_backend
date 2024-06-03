const express = require("express");
const { queryDatabase } = require("../db/conn");
const router = express.Router();

router.get("/showDetials", async (req, res) => {
  let sql = "select * from blank_card_stock";
  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { no_of_card, purchase_date, receive_by, total_stock, inward_type } =
    req.body;
  const sql = `
      UPDATE your_table_name
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

router.post("/addNewCard", async (req, res) => {
  const { no_of_card, purchase_date, receive_by, total_stock, inward_type } =
    req.body;

  const sql = `
      INSERT INTO blank_card_stock (no_of_card, purchase_date, receive_by, total_stock, inward_type)
      VALUES (?, ?, ?, ?, ?)
    `;

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
    res.json({ message: "Error", error: 1 });
  }
});

router.delete("/deleteCard/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE from blank_card_stock where purchase_id = ?";
  try {
    const result = await queryDatabase(sql, [id]);
    res.json({ message: "Success", error: 0 });
  } catch (error) {
    res.json({ message: "Error", error: 1 });
  }
});

module.exports = router;
