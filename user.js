// const  connection = require("./connection");
// const { Router } = require("express");
// const generateOTP = require("./random-generator")
// const {getOTPByValueAndNotExpired} = require('./db')
// const sendOTPByEmail = require('./emailServices')
// const router=Router();


// router.get('',(req,res)=>{
//     return res.status(222).json({s:"sdf"});
// })

// router.post('/register', (req, res) => {
//   const {email,  username } = req.body;

//   // Check if email or username already exists
//   const checkQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
//   connection.query(checkQuery, [email, username], (err, results) => {
//     if (err) {
//       console.error('Error checking email and username:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }

//     // If email or username already exists, send error response
//     if (results.length > 0) {
//       const existingUser = results[0];
//       if (existingUser.email === email) {
//         return res.status(400).json({ error: 'Email is already associated with another account' });
//       } else {
//         return res.status(400).json({ error: 'Username is already taken' });
//       }
//     }

//     // If email and username are available, insert new user into database
//     const insertQuery = 'INSERT INTO users (email, username) VALUES (?, ?)';
//     connection.query(insertQuery, [email, username], (err) => {
//       if (err) {
//         console.error('Error inserting user:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
      
//       // User successfully registered
//       return res.status(200).json({ message: 'User registered successfully' });
//     });
//   });
// });



// async function storeOTP(email, otp, expirationTime) {
//     const query = 'INSERT INTO otps (email, otp, expiry_time) VALUES (?, ?, ?)';
//     const values = [email, otp, expirationTime];
//     try {
//       await connection.query(query, values);
//       console.log('OTP stored successfully in the database');
//     } catch (error) {
//       console.error('Error storing OTP in the database:', error);
//       throw error;
//     }
//   }



// router.post('/send-otp', async (req, res) => {
//     const { email } = req.body;
  
//     try {
//       // Generate OTP
//       const otp = generateOTP(6); // Generate a 6-digit OTP
      
//       // Calculate expiration time (15 minutes from now)
//       const expirationTime = new Date();
//       expirationTime.setMinutes(expirationTime.getMinutes() + 15);
  
//       // Add OTP to the database with expiration time
  
//       // Send OTP via email
//       await sendOTPByEmail(email, otp);
//       await storeOTP(email, otp, expirationTime);
  
//       // Respond with success message
//       res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       res.status(500).json({ error: 'Failed to send OTP' });
//     }
//   });





// // Endpoint to verify OTP
// router.post('/verify-otp', async (req, res) => {
//   const { otp,email } = req.body;

//   try {
//     // Check if OTP exists and is not expired
//     const otpRecord = await getOTPByValueAndNotExpired(otp,email);

//     if (!otpRecord) {
//       // If no valid OTP record found, respond with error message
//       res.status(400).json({ error: 'Invalid OTP or OTP expired' });
//     } else {
//         // OTP verification successful
//         // Set session.authenticated to true (assuming you have session management middleware)
//         req.session.authenticated = true;

//         // Respond with success message
//         res.status(200).json({ message: 'OTP verified successfully' });
      
//     }
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ error: 'Failed to verify OTP' });
//   }
// });




// module.exports = router;




