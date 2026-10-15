// eslint-disable-next-line no-unused-vars
import pool from "../config/db.js";
import { snap } from "../config/midtrans.js";
// eslint-disable-next-line no-unused-vars
export const createTransaction = async (req, res) =>
{
  try {
    // eslint-disable-next-line no-unused-vars
    const connection = await pool.getConnection();

    const { order_number, user_id, payment_method, subtotal, tax, total, items } = req.body;
    // eslint-disable-next-line no-unused-vars
    const [transaction] = await pool.query("INSERT INTO orders (order_number, user_id, payment_method, subtotal, tax, total) VALUES (?,?,?,?,?,?)",
      // eslint-disable-next-line no-undef
      [order_number, user_id, payment_method, subtotal, tax, total]);

    const orderId = transaction.insertId;
    if (items) {
      for (let item of items) {
        await pool.query("INSERT INTO order_details (order_id, product_id, qty, price) VALUES (?,?,?,?)",
          [orderId, item.product_id, item.qty, item.price]);
      }
    }
    let midtransResponse = null;
    if (payment_method === 1) {
      const parameter = {
        transaction_details: {
          order_id: order_number,
          gross_amount: total,
        },
        enable_payments: ['gopay'],
        item_details: items.map((item) => ({
          id: item.product_id,
          price: item.price,
          quantity: item.qty,
          name: `Product ID ${item.product_id}`,
        }))
      };
      midtransResponse = await snap.createTransaction(parameter);
    }
    await connection.commit();
    connection.release();
    return res.status(201).json({
      status: true,
      message: Number(payment_method) === 1 ? "Order Berhasil! Silahkan bayar dengan Gopay" : "Payment Cash Berhasil",
      order_id: orderId,
      order_number: order_number,
      payment_gateway: midtransResponse
        ? {
          token: midtransResponse.token,
          redirect_url: midtransResponse.redirect_url,
        }
        : null,
    });
    // return res.status(201).json({
    //   status: true,
    //   message: "Create is success!",
    // });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create transaction failed",
      error: error.message,
    });
  }
  // eslint-disable-next-line no-unused-vars


};