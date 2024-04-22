const { authServices } = require("../services/auth.services");

const register = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const newUser = await authServices.registerUser(
      firstName,
      lastName,
      userName,
      email,
      password
    );
    res.send({ message: "User has been created successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500);
    res.send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, userName, password } = req.body;

  const userInfo = !email ? userName : email;

  try {
    const { accessToken, user } = await authServices.loginUser(
      userInfo,
      password
    );
    res.send({ message: "Login is successful", data: { accessToken, user } });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500);
    res.send({ message: error.message });
  }
};

const authController = { register, login };

module.exports = { authController };
