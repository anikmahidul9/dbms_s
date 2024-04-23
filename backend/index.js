/* eslint-disable no-undef */
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = {
  host: "localhost", // Hostname of the MySQL container (from Docker Compose)
  user: "root",
  password: "",
  database: "shanto",
};

// Route to create database

// Route to insert values into the table

app.post("/register", async (req, res) => {
  try {
    // Ensure that req.body is defined and contains the expected properties
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Extract data from request body
    const { username, email, password } = req.body;

    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL INSERT query
    const [rows, fields] = await connection.execute(
      "INSERT INTO user (username,email, password) VALUES (?, ?,?)",
      [username, email, password]
    );

    // Close MySQL connection
    connection.end();

    // Send response back to client
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

app.post("/product", async (req, res) => {
  try {
    // Ensure that req.body is defined and contains the expected properties
    if (!req.body || !req.body.category || !req.body.price) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Extract data from request body
    const { name, category, price, image, description } = req.body;

    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL INSERT query
    const [rows, fields] = await connection.execute(
      "INSERT INTO product (name,category,price,image,description) VALUES (?,?,?,?,?)",
      [name, category, price, image, description]
    );

    // Close MySQL connection
    connection.end();

    // Send response back to client
    res.json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

app.post("/supplier", async (req, res) => {
  try {
    // Ensure that req.body is defined and contains the expected properties
    if (!req.body || !req.body.category || !req.body.email) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Extract data from request body
    const { fullname, email, phone, address, category } = req.body;

    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL INSERT query
    const [rows, fields] = await connection.execute(
      "INSERT INTO supplier (fullname, email, phone, address, category) VALUES (?,?,?,?,?)",
      [fullname, email, phone, address, category]
    );

    // Close MySQL connection
    connection.end();

    // Send response back to client
    res.json({ message: "Supplier created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

app.post("/user", async (req, res) => {
  try {
    // Ensure that req.body is defined and contains the expected properties
    if (!req.body || !req.body.fullname || !req.body.email) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Extract data from request body
    const { fullname, email, role, image, password } = req.body;

    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL INSERT query
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (fullname, email, role, image, password) VALUES (?,?,?,?,?)",
      [fullname, email, role, image, password]
    );

    // Close MySQL connection
    connection.end();

    // Send response back to client
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL SELECT query to fetch all users
    const [rows, fields] = await connection.execute("SELECT * FROM users");

    // Close MySQL connection
    connection.end();

    // Send user information back to client
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

app.get("/supplier-data", async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const connection = await mysql.createConnection(pool);
    let users;
    if (!searchTerm) {
      // If no search term provided, return all users
      users = await connection.query("SELECT * FROM supplier");
    } else {
      // If search term provided, search users based on the term
      users = await connection.query(
        `SELECT * FROM supplier WHERE 
          fullname LIKE ? OR 
          email LIKE ? OR 
          phone LIKE ? OR 
          address LIKE ? OR 
          address LIKE ?`,
        [
          `%${searchTerm}%`,
          `%${searchTerm}%`,
          `%${searchTerm}%`,
          `%${searchTerm}%`,
          `%${searchTerm}%`,
        ]
      );
    }

    // Convert buffer objects to strings
    users = users.map((user) => {
      return {
        ...user,
        fullname: user.fullname?.toString(),
        email: user.email?.toString(),
        phone: user.phone?.toString(),
        address: user.address?.toString(),
        category: user.role?.toString(),
      };
    });

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;
    const { fullname, email, role, image, password } = req.body;

    // Construct SQL UPDATE query based on provided fields
    let updateFields = [];
    let queryParams = [];

    if (fullname) {
      updateFields.push("fullname = ?");
      queryParams.push(fullname);
    }
    if (email) {
      updateFields.push("email = ?");
      queryParams.push(email);
    }
    if (role) {
      updateFields.push("role = ?");
      queryParams.push(role);
    }
    if (image) {
      updateFields.push("image = ?");
      queryParams.push(image);
    }
    if (password) {
      updateFields.push("password = ?");
      queryParams.push(password);
    }

    // Check if any fields are provided for update
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    // Add user ID to query parameters
    queryParams.push(userId);

    // Execute SQL UPDATE query
    const connection = await mysql.createConnection(pool);
    const [results] = await connection.execute(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      queryParams
    );

    // Close MySQL connection
    connection.end();

    // Check if any rows were affected by the update
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send success response
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred while updating user" });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL DELETE query
    const [result] = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [userId]
    );

    // Close MySQL connection
    connection.end();

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send success response
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
});

app.put("/supplier/:id", async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;
    const { fullname, email, phone, address, category } = req.body;

    // Construct SQL UPDATE query based on provided fields
    let updateFields = [];
    let queryParams = [];

    if (fullname) {
      updateFields.push("fullname = ?");
      queryParams.push(fullname);
    }
    if (email) {
      updateFields.push("email = ?");
      queryParams.push(email);
    }
    if (phone) {
      updateFields.push("phone = ?");
      queryParams.push(phone);
    }
    if (address) {
      updateFields.push("address = ?");
      queryParams.push(address);
    }
    if (category) {
      updateFields.push("category = ?");
      queryParams.push(category);
    }

    // Check if any fields are provided for update
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    // Add user ID to query parameters
    queryParams.push(userId);

    // Execute SQL UPDATE query
    const connection = await mysql.createConnection(pool);
    const [results] = await connection.execute(
      `UPDATE supplier SET ${updateFields.join(", ")} WHERE id = ?`,
      queryParams
    );

    // Close MySQL connection
    connection.end();

    // Check if any rows were affected by the update
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send success response
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occurred while updating user" });
  }
});

app.delete("/supplier/:id", async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Create MySQL connection pool
    const connection = await mysql.createConnection(pool);

    // Execute SQL DELETE query
    const [result] = await connection.execute(
      "DELETE FROM supplier WHERE id = ?",
      [userId]
    );

    // Close MySQL connection
    connection.end();

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send success response
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred while deleting user" });
  }
});

 app.get("/product-data", async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const connection = await mysql.createConnection(pool);
    let users;
    if (!searchTerm) {
      // If no search term provided, return all users
      users = await connection.query("SELECT * FROM product");
    } else {
      // If search term provided, search users based on the term
      users = await connection.query(
        `SELECT * FROM product WHERE 
          name LIKE ? OR 
          category LIKE ? OR 
          price LIKE ? OR 
          image LIKE ? OR 
          description LIKE ?`,
        [
          `%${searchTerm}%`,
          `%${searchTerm}%`,
          `%${searchTerm}%`,
          `%${searchTerm}%`,
          `%${searchTerm}%`,
        ]
      );
    }

    // Convert buffer objects to strings
    users = users.map((user) => {
      return {
        ...user,
        name: user.name?.toString(),
        category: user.category?.toString(),
        price: user.price?.toString(),
        image: user.image?.toString(),
        description: user.description?.toString(),
      };
    });

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error.message);
    res.status(500).json({ error: "Server error" });
  }
}); 


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
