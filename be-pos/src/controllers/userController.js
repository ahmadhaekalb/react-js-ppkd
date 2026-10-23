import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
// const USERS = [
//   {
//     id: 1,
//     name: "Haekal",
//     email: "haekal@gmail.com",
//     password: "12345678",
//   },
//   {
//     id: 2,
//     name: "Laras",
//     email: "laras@gmail.com",
//     password: "12345678",
//   },
//   {
//     id: 3,
//     name: "Ratna",
//     email: "ratna@gmail.com",
//     password: "12345678",
//   },
// ];

// CRUD (Create, Read, Update, Delete)

// READ

export const getAllUser = async (req, res) =>
{
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { id: "desc" },
    });
    // const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
    return res.status(200).json({
      status: true,
      message: "Fetch User Success",
      total: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Fail Fetch User",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) =>
{

  try {
    // const user = await pool.query("SELECT id, name, email, is_active FROM users WHERE id= ?", [id]);
    // const user = USERS.find((u) => u.id === id);
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Fail Fetch User",
      error: error.message,
    });
  }
};

// CREATE
export const createUser = async (req, res) =>
{
  const { name, email, password } = req.body; // <-- cara destruct

  try {
    // const newUser = {
    //   id: USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1,
    //   name,
    //   email,
    //   password,
    // };
    // USERS.push(newUser);

    // const [user] = await pool.query("INSERT INTO users(name, email, password) VALUES (?,?,?)", [name, email, password]);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });
    return res.status(201).json({
      status: true,
      message: "Create user success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create user failed",
      error: error.message,
    });
  }
};


//UPDATE
export const updateUser = async (req, res) =>
{
  try {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    // let update = "";

    const dataUpdate = {};
    if (email) dataUpdate.email = email;
    if (name) dataUpdate.name = name;
    if (password) {
      dataUpdate.password = await bcrypt.hash(password, 10);
    }
    const user = await prisma.user.update({
      where: { id: id },
      data: dataUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    // if (!password) {
    //   // eslint-disable-next-line no-unused-vars
    //   update = await pool.query("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", [name, email, password, is_active, id]);
    // } else {
    //   // eslint-disable-next-line no-unused-vars
    //   update = pool.query("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", [name, email, password, is_active, id]);
    // }
    // const [data] = pool.query(`SELECT * FROM user WHERE id = ?`, [id]);
    return res.status(200).json({
      status: true,
      message: 'Update user success!',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create user failed",
      error: error.message,
    });
  }

  // const userIndex = USERS.findIndex((u) => u.id === id);
  // USERS[userIndex] = {
  //   ...USERS[userIndex],
  //   ...(name && { name }),
  //   ...(email && { email }),
  //   ...(password && { password }),
  // };

};

//DELETE
export const deleteUser = async (req, res) =>
{
  try {
    const id = parseInt(req.params.id);
    await
      // {/*const [user] =*/ } await pool.query("DELETE FROM users WHERE id=?", [id]);
      await prisma.user.delete({
        where: { id: id },
      });

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


  // const userIndex = USERS.findIndex((u) => u.id === id);

  // if (userIndex === -1) {
  //   return res.status(404).json({
  //     status: false,
  //     message: "Delete user failed",
  //   });
  // } else {
  //   return res.status(200).json({
  //     status: true,
  //     message: "Delete user success",
  //   });
  // }
};