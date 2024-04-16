// const connection = require("./connection");

// // Function to create the demo database if it does not exist
// function createDemoDatabase() {
//   connection.query(
//     `
//     CREATE DATABASE IF NOT EXISTS XploreApp
//   `,
//     (err) => {
//       if (err) {
//         console.error("Error creating XploreApp database:", err);
//       } else {
//         console.log("Demo database created successfully");
//         // Once the database is created, create the tables
//         createTables();
//       }
//     }
//   );
// }

// // Function to create the users table
// function createUsersTable() {
//   connection.query(
//     `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) UNIQUE,
//       username VARCHAR(100) UNIQUE
//     )
//   `,
//     (err) => {
//       if (err) {
//         console.error("Error creating Users table:", err);
//       } else {
//         console.log("Users table created successfully");
//       }
//     }
//   );
// }

// // Function to create the categories table
// function createCategoriesTable() {
//   connection.query(
//     `
//     CREATE TABLE IF NOT EXISTS categories (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       place_name VARCHAR(255),
//       image_link VARCHAR(255),
//       owner_id INT,
//       FOREIGN KEY (owner_id) REFERENCES users(id)
//     )
//   `,
//     (err) => {
//       if (err) {
//         console.error("Error creating Categories table:", err);
//       } else {
//         console.log("Categories table created successfully");
//       }
//     }
//   );
// }

// // Function to create the otps table
// function createOtpsTable() {
//   connection.query(
//     `
//     CREATE TABLE IF NOT EXISTS otps (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       otp VARCHAR(10) NOT NULL,
//       expiry_time DATETIME NOT NULL,
//       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       email VARCHAR(255)
//     )
//   `,
//     (err) => {
//       if (err) {
//         console.error("Error creating Otps table:", err);
//       } else {
//         console.log("Otps table created successfully");
//       }
//     }
//   );
// }

// // Function to create all tables
// function createTables() {
//   createUsersTable();
//   createCategoriesTable();
//   createOtpsTable();
// }

// // Call the function to create the demo database and tables
// module.exports.init = createDemoDatabase();
