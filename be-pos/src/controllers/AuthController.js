import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import pool from "../config/db.js";
import prisma from "../config/prisma.js";

// eslint-disable-next-line no-unused-vars
const USERS = [
  {
    id: 1,
    nama: "Admin",
    email: "admin@gmail.com",
    password: "12345678",
  },
];

export const login = async (req, res) =>
{
  const { email, password } = req.body;

  // const user = USERS.find((u) => u.email === email && u.password === password);
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid Credential",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid Credential",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nama: user.name,
        email: user.email,
      },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      // eslint-disable-next-line no-undef
      { expiresIn: process.env.JWT_EXPIRES_IN || "id" },
    );

    return res.status(200).json({
      status: true,
      message: "Login success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const me = async (req, res) =>
{
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      }
    });
    // const [rows] = await pool.query("SELECT id, name, email FROM users WHERE id =?", [userId]);
    return res.status(200).json({
      status: true,
      data: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
};
// const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email=?", [email]);

// if (user.length === 0) {
//   //401 --> unauthorized / login gagal
//   return res.status(401).json({
//     status: false,
//     message: "Invalid Credential",
//   });
// }

// const dataUser = user[0];
// const isMatch = await bcrypt.compare(password, dataUser.password);


// if (!isMatch) {
//   return res.status(401).json({
//     status: false,
//     message: "Invalid Credential",
//   });
// }

// const token = jwt.sign(
//   {
//     id: dataUser.id,
//     nama: dataUser.name,
//     email: dataUser.email,
//   },
//   // eslint-disable-next-line no-undef
//   process.env.JWT_SECRET,
//   // eslint-disable-next-line no-undef
//   { expiresIn: process.env.JWT_EXPIRES_IN || "id" },
// );

// return res.status(200).json({
//   status: true,
//   message: "Login success",
//   data: {
//     user: {
//       id: dataUser.id,
//       name: dataUser.name,
//       email: dataUser.email,
//     },
//     token,
//   }
// });
