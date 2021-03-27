const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

const getAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization failed, no token." });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid." });
  }
};

module.exports = getAuth;
