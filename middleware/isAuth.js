const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  // console.log(req.get("Authorization"));

  if (!token) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      "D12OohrHDw5rGMOsBWFpaQ1KOhIcpqinb6RhT37T9A8="
    );
  } catch (err) {
    // console.log(err);
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
