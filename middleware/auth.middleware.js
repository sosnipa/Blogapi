const Jwt = require("jsonwebtoken");

// Define the middleware functions separately for clarity:

function authMiddleware(req, res, next) {
  // get the Authorization header
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // console.log("Authorization", authorization);

  const bearerToken = authorization.split(" ");
  if (bearerToken.length !== 2) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // console.log("Token", bearerToken[1]);
  Jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // console.log("Decoded", decoded);
    req.user = decoded;
    next();
  });
}

function authOrNot(req, res, next) {
  // get the Authorization header
  const authorization = req.headers.authorization;

  if (!authorization) {
    // No authorization header, but let the route continue operations
    next();
  } else {
    const bearerToken = authorization.split(" ");
    if (bearerToken.length !== 2) {
      // Invalid token format, but let the route continue operations
      next();
    } else {
      Jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          // Invalid token, but let the route continue operations
          next();
        } else {
          // Token is valid, set decoded user and let the route continue operations
          req.user = decoded;
          next();
        }
      });
    }
  }
}

// Export the middleware functions using module.exports:
module.exports = authMiddleware;
