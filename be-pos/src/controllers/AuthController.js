import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

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

  if (!email || !password) {
    //status 400 : bad response (browser)
    //status 500 : server error (server/database)
    //statusn 200 : berhasil/success
    // 
    res.status(400).json({
      status: false,
      message: "Email or Password is required"
    });
  }
  // const user = USERS.find((u) => u.email === email && u.password === password);

  const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email=?", [email]);

  if (user.length === 0) {
    //401 --> unauthorized / login gagal
    return res.status(401).json({
      status: false,
      message: "Invalid Credential",
    });
  }

  const dataUser = user[0];
  const isMatch = await bcrypt.compare(password, dataUser.password);


  if (!isMatch) {
    return res.status(401).json({
      status: false,
      message: "Invalid Credential",
    });
  }

  const token = jwt.sign(
    {
      id: dataUser.id,
      nama: dataUser.name,
      email: dataUser.email,
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
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
      },
      token,
    }
  });
};

//find()