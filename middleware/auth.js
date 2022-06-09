const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  console.log(token);
  // chances are we don't have a token at all, in this case return 401 response
  if (!token)
    return res.status(401).send("Please Login first to access this endpoint! for access token go to add any product or login and and you will find access token in console ");

  // Now verify if this is a valid token
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token."); // 400 bad request
  }
}

module.exports = auth;
