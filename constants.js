require("dotenv").config();

const auth = {
    type: "OAuth2",
    user: "guilherme.urenha@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};

const mailOptions = {
    from: "Guilherme <guilherme.urenha@gmail.com>",
    to: "guilherme.urenha@gmail.com",
    subject: "Gmail API NodeJS",
};

module.exports = {
    auth,
    mailOptions: mailOptions,
};