require("dotenv").config();
const jwt = require("jsonwebtoken");

// Example token (replace with a token from login)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcwOTA4NzEzLCJleHAiOjE3NzA5OTUxMTN9.TFkPL30cix76kS9-RjrGz9IHLrXqBFOJ5h1YyifpvqY";

function testAccess(token, requiredRoles) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      console.log("Access Denied. Role:", decoded.role);
      return;
    }

    console.log("Access Granted. Role:", decoded.role);
  } catch (err) {
    console.log("Invalid or expired token");
  }
}

// Test USER route
testAccess(token, ["USER"]);

// Test ADMIN route
testAccess(token, ["ADMIN"]);
