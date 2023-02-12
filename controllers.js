const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
    try {
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function getUser(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function getDrafts(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function readMail(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);

        let data = await response.data;
        res.json(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function sendMail(req, res) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...CONSTANTS.auth,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            ...CONSTANTS.mailOptions,
            text: "The Gmail API with NodeJS works",
        };

        const result = await transport.sendMail(mailOptions);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function watchEmail(req, res) {
    try {
        const gmail = google.gmail({ version: 'v1', auth });
        const watchRequest = {
            // See full request options: https://developers.google.com/gmail/api/guides/push
            topicName: 'projects/myproject/topics/new_email',
            labelIds: ['INBOX'],
        };

        // Watch the message
        const res = await gmail.users.watch(watchRequest);
        console.log(res);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = {
    getUser,
    getDrafts,
    sendMail,
    readMail,
    watchEmail,
};