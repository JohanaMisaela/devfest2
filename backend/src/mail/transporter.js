const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jhimguiyok@gmail.com",
    pass: "johmkvarwblcidtu",
  },
});

// checking connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is running...");
  }
});

module.exports = transporter;
