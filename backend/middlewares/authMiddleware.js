const jwt = require("jsonwebtoken");

// roles = array of allowed roles, e.g., ["ADMIN"]
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ message: "No token provided" });

      // JWT format: "Bearer TOKEN"
      const token = authHeader.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Token missing" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check role
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded; // Attach user info to request
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
