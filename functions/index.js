//firebase functions: config: set sendgrid.api ="SENDGRIDAPI"
"use strict";
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

exports.sendEmail = functions.https.onRequest((req, res) => {

  const toAdd = req.query.to;
  const fromAdd = req.query.from;
  const subjectLine = req.query.subject;
  const messageText = req.query.message;


  const msg = {
    to: toAdd,
    from: fromAdd,
    subject: subjectLine,
    text: messageText
  };

  const APIKEY = functions.config().sendgrid.api;
  sgMail.setApiKey(APIKEY);
  sgMail.send(msg).then(() => {
    console.log("send grid email sent..");
    res.end();
    return;
  });
});

//Client sender..
// var obj = {
//     to: "tolangerard@gmail.com",
//     from: "tolan@gerard.com",
//     message: "This is a bs message test",
//     subject: "Subject of email-test"
// }

// var str = `to=${obj.to}&from=${obj.from}&message=${obj.message}&subject=${obj.subject}`;

// var s = encodeURI(str);
// var functionurl = ""
// var cu = functionurl + "?";
// var url = cu + s;

// fetch(url, {
//     method: 'POST', // or 'PUT'
//     body: s, // data can be `string` or {object}!
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then(res => res.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));
