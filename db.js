// database.js

const connection = require('./connection'); // Assuming you have a database connection

async function getOTPByValueAndNotExpired(otp,email) {
  const query = 'SELECT * FROM otps WHERE otp = ? AND email=? AND expiry_time > NOW() LIMIT 1';
  const values = [otp,email];

  try {
    const [rows] = await connection.query(query, values);
    return rows.length > 0 ? rows[0] : null; // Return the OTP record or null if not found or expired
  } catch (error) {
    console.error('Error retrieving OTP from the database:', error);
    throw error;
  }
}

async function getAllCategoriesFromDatabase() {
    const query = 'SELECT * FROM categories';
    try {
        const categories =  connection.query(query);
        console.log(categories)
        return categories;
    } catch (error) {
        console.error('Error fetching categories from the database:', error);
        throw error;
    }
}

async function getCategoryById(categoryId) {
    try {
        // Define the SQL query
        const query = 'SELECT * FROM categories WHERE id = ?';

        // Execute the query with the categoryId as a parameter
        const [rows, fields] = await connection.query(query, [categoryId]);

        // Assuming rows[0] contains the category object if found
        // Adjust this part based on your database schema
        const category = rows[0];

        return category;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
}




module.exports = { getOTPByValueAndNotExpired,getAllCategoriesFromDatabase ,getCategoryById};

