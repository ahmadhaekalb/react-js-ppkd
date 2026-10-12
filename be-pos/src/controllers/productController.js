import pool from "../config/db.js";

// GET ALL
export const getAllProducts = async (req, res) =>
{
  try {
    const products = await pool.query("SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id",);
    return res.status(200).json({
      status: true,
      total: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }

};
// GET ONE DATA
export const getOneProducts = async (req, res) =>
{
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "not a number",
      });
    }
    const [products] = await pool.query(
      "SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id WHERE products.id=?",
      [id],
    );
    return res.status(200).json({
      status: true,
      true: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// CREATE
export const createProduct = async (req, res) =>
{
  try {
    const { category_id, name, price, stock, description } = req.body;
    await pool.query("INSERT INTO products (category_id, name, price, stock, description) VALUES (?,?,?,?,?)", [category_id, name, price, stock, description]);
    return res.status(201).json({
      status: true,
      message: "create is success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateProduct = async (req, res) =>
{
  try {
    const id = parseInt(req.params.id);
    const { category_id, name, price, stock, description, is_active } = req.body;
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "not a number",
      });
    }
    await pool.query("UPDATE products SET category_id=?, name=?, price=?, stock=?, description=?, is_active=? WHERE id=?", [category_id, name, price, stock, description, is_active ?? 1, id]);
    return res.status(200).json({
      status: true,
      message: "update is success",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteProduct = async (req, res) =>
{
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "not a number",
      });
    }
    await pool.query("DELETE FROM products WHERE id=?", [id]);
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