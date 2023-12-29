const functions = require('firebase-functions');
var admin = require("firebase-admin");
const rp = require('request-promise');

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "lunchdax-89c55",
    "private_key_id": "",
    "client_id": "",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  }),
  databaseURL: "https://lunchdax-89c55.firebaseio.com"
});

const express = require('express');
var cors = require('cors');
var diff = require('deep-diff')


const nodemailer = require('nodemailer');

//google account credentials used to send email
const mailTransport = nodemailer.createTransport(
    `smtps://lunchdaxuf@gmail.com:Gabbegillarkorv123@smtp.gmail.com`);


function sendMail(message, subject) {
    const mailOptions = {
        from: `Lunchdax.se <lunchdaxuf@gmail.com>`,
        to: 'lunchdaxuf@gmail.com'
    };
    // hmtl message constructions
    mailOptions.subject = subject;
    mailOptions.html = message;
    return mailTransport.sendMail(mailOptions);
}



var blacklistedEmails = ['swsidhu@hotmail.com']

exports.restaurantWrite = functions.firestore
    .document('cities/{city}/restaurants/{userId}')
    .onWrite((change, context) => {
      
        const newDoc = change.after.exists ? change.after.data() : null;
        const oldDoc = change.before.data()
        var diffs = diff(newDoc, oldDoc);
        var id = context.params.userId

        admin.auth().getUser(id)
        .then(function(userRecord) {
            var email = userRecord.email;

            var message = '<p>'+email+' (eller admin) har ändrat följande på <b>' + newDoc.name+':</p></b><br>'

            diffs.forEach(diff => {
                message += '<b>' + diff.path + ':</b> ' + diff.rhs + ' <b>-></b> ' + diff.lhs + "<br><br>"
            });
            message += '<br><b><a href="https://lunchdaxuf.se/user?u='+ id +'">Du kan ändra detta här.</a></b>'

            if(blacklistedEmails.indexOf(email)==-1) sendMail(message, 'Nya ändringar')
            else return;
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
        });

    });


exports.newMessage = functions.https.onRequest((req, res) => {
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: '6LeBRIQUAAAAAOdEq5nGgderV0WGCU7YwtzzbAOv',
            response: req.query['g-recaptcha-response']
        },
        json: true
    }).then(result => {
        if (result.success) {
            var message = "";
            if(req.query.rest) message += '<b>Restaurang:</b> ' + req.query.rest
            if(req.query.address) message += '<br><br><b>Address:</b> ' + req.query.address
            if(req.query.name) message += '<br><br><b>Namn:</b> ' + req.query.name
            if(req.query.mail) message += '<br><br><b>Email:</b> ' + req.query.mail
            if(req.query.tel) message += '<br><br><b>Telefon:</b> ' + req.query.tel
            if(req.query.message) message += '<br><br><b>Övriga frågor:</b> ' + req.query.message

            admin.firestore().collection('messages').add({message:message})
            .then(()=>{
                res.status(200).send('sent');
                sendMail(message, 'Nytt meddelande')
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send('fail: ' + reason);
            })
        }
    }).catch(reason => {
        res.status(400).send('fail: ' + reason);
    })
});
