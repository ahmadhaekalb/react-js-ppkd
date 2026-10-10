import pool from "../config/db.js";

//GET ALL DATA
export const getAllCategories = async (req, res) =>
{
  try {
    const [categories] = await pool.query("SELECT * FROM categories ORDER BY id DESC");
    return res.status(200).json({
      status: true,
      total: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }

};

//GET ONE DATA id
export const getOneCategory = async (req, res) =>
{

  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "not a number",
      });
    }
    const [category] = await pool.query("SELECT * FROM categories WHERE id=?", [id]);
    if (category.length === 0) {
      return res.status(400).json({
        status: false,
        error: "THERE IS NO DATA",
      });
    }
    return res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

//CREATE
export const createCategory = async (req, res) =>
{
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name must be required",
      })
    }
    const category = await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
    return res.status(201).json({
      status: true,
      data: category,
      message: "INSERTING DATA IS SUKSES ABANGKUHHHH!",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: false,
        message: "Data is already exists",
      });
    }
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }

};

//UPDATE
export const updateCategory = async (req, res) =>
{
  try {
    const { name } = req.body;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "not a number",
      });
    }
    const category = await pool.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
    if (category.length === 0) {
      return res.status(404).json({
        status: false,
        error: "DATA IS NOT PON",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Update success!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//DELETE

export const deleteCategory = async (req, res) =>
{
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "not a number",
      });
    }
    {/*const [user] =*/ } await pool.query("DELETE FROM categories WHERE id=?", [id]);
    return res.status(200).json({
      status: true,
      message: "DELETE IS SUCCESS!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};