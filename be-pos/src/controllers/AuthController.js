const USERS = [
  {
    id:1,
    nama: "Haekal",
    email:"admin@gmail.com",
    password: "12345678",
  },
];

export const login = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
      //status 400 : bad response (browser)
        //status 500 : server error (server/database)
        //statusn 200 : berhasil/success
        // 
        res.status(400).json({
        status: false,
        message: "Email or Password is required"
      });
    }
    const user = USERS.find((u) => u.email === email && u.password === password);
    
    if(!user){
      //401 --> unauthorized / login gagal
      return res.status(401).json({
        status:false,
        message: "Invalid Credential",
      });
      
    }

    return  res.status(200).json({
      status: true,
      message: "Login success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: `jwt-token-123 ${user.id} - ${Date.now()}`
      }
  })
};

//find()