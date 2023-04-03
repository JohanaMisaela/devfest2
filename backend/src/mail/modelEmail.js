const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");

const modelEmail = async ({ account, name, email, following }) => {
  const filePath = path.join(__dirname, "../views/AccountCreated.ejs");

  if (account) {
    const data = await ejs.renderFile(filePath, {
      name: name,
      text: "Congratulation!!!\n\nyour account has been activated successfully!",
    });
    var mainOptions = {
      from: '"Devfest 2022" jhimguiyok@gmail.com',
      to: process.env.MAIL_SENDER,
      subject: "Account Activated",
      html: data,
    };
  } else {
    // following
    const data = await ejs.renderFile(filePath, {
      name: name,
      text: "Actually, you are following " + following,
    });
    var mainOptions = {
      from: '"Devfest 2022" jhimguiyok@gmail.com',
      to: process.env.MAIL_SENDER,
      subject: "Following " + following,
      html: data,
    };
  }

  await transporter.sendMail(mainOptions, (err, data) => {
    !err ? console.log("email sent to " + email) : console.log(err);
  });
};

module.exports = modelEmail;
