var nodemailer = require("nodemailer");
async function sendOTPByEmail(email, otp) {
  console.log(email, otp, process.env.email, process.env.password);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  var mailOptions = {
    from: process.env.email,
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP for verification is: ${otp} expires after 15 minutes `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendOTPByEmail;
