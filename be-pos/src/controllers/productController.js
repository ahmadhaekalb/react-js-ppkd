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
export const getOneProducts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
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

// DELETE