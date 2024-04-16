const crypto = require('crypto');

// Function to generate random OTP
function generateOTP(length) {
  const buffer = crypto.randomBytes(length);
  const otp = buffer.toString('hex').substring(0, length);
  return otp;
}

// Export the generateOTP function
module.exports = generateOTP;
