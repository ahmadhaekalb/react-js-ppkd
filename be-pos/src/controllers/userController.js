import pool from "../config/db.js";
const USERS = [
  {
    id: 1,
    name: "Haekal",
    email: "haekal@gmail.com",
    password: "12345678",
  },
  {
    id: 2,
    name: "Laras",
    email: "laras@gmail.com",
    password: "12345678",
  },
  {
    id: 3,
    name: "Ratna",
    email: "ratna@gmail.com",
    password: "12345678",
  },
];

// CRUD (Create, Read, Update, Delete)

// READ

export const getAllUser = async (req, res) =>
{
  try {
    const [rows] = await pool.query("SELECT id, name, email, is_active FROM users");
    return res.status(200).json({
      status: true,
      message: "Fetch User Success",
      total: rows.length,
      data: rows,
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
    const id = parseInt(req.params.id);
    const user = await pool.query("SELECT id, name, email, is_active FROM users WHERE id= ?", [id]);
    // const user = USERS.find((u) => u.id === id);
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
export const createUser = async(req, res) => {
  const { name, email, password } = req.body; // <-- cara destruct

  try {
    // const newUser = {
    //   id: USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1,
    //   name,
    //   email,
    //   password,
    // };
    // USERS.push(newUser);

    const [user] = await pool.query("INSERT INTO users(name, email, password) VALUES (?,?,?)", [name, email, password]);

    return res.status(201).json({
      status: true,
      message: "Create user success",
      data: {id: user.insertId, name, email},
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
export const updateUser = async(req, res) =>
{
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const [user] = await pool.query("UPDATE users SET name=?, email=?, password=? WHERE id=?", [name, email, password, id]);
  // const userIndex = USERS.findIndex((u) => u.id === id);
  // USERS[userIndex] = {
  //   ...USERS[userIndex],
  //   ...(name && { name }),
  //   ...(email && { email }),
  //   ...(password && { password }),
  // };
  return res.status(200).json({
    status: true,
    message: 'Update user success!',
    data: user,
  });
};

//DELETE
export const deleteUser = (req, res) =>
{
  const id = parseInt(req.params.id);
  const userIndex = USERS.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: false,
      message: "Delete user failed",
    });
  } else {
    return res.status(200).json({
      status: true,
      message: "Delete user success",
    });
  }
};