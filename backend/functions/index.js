const functions = require('firebase-functions');
var admin = require("firebase-admin");
const rp = require('request-promise');

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "lunchdax-89c55",
    "private_key_id": "6d5c08b415f20006cf558ae3f80414dbd6c8d409",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/Y/oJYJ6Vc1nS\nIrlhUDw/WYRcO+69EdmOnEnYhtcdKTrMBOpm/Icffv199+7GhxdFobBpoyho82+a\nY4cZSCGEDraOjp1BYY5m2yYzrc9B+4WcTQV+eAu1c2kWRhQXs7IbnZ2zUULeKN6f\nLd6S2Mj8HhnqSS55aPenrshd+dgTHPPIy9Qf2sDIvOqkkVopwodBMomcNv2EHv3b\nVsBlhKQOJh97LZLn6s4EVYcQ4GgEU+jE32rBaWe6XXlkzVzqOKf3pz/aMQGc4Tu3\nxwxp6IURR/OIiHHVfIjL0bTvNcn6LvJ4ZZgHEuuItP4yjuGzza9RpHfcPXeT9j2u\nZxSBpc75AgMBAAECggEACQh5yXiEc5mlUHbaw1417GgtXZcR47Lpzu0kdRzuyThk\nHIinhuMoqNK7DyIlDxIFhf/6zg7pKNmYgl5r3BnHRIQsl0Thj4TrDi1jZlwFOgra\nLwWERV2lcSkjJBh8Tp6+FhyV0Aan/nP1Bz6d0IDSgke/bGCLhNJwoeWXcmFePTnz\nC+P/qAbPSodBbspBEIVD4p218ORjxTy2/e+zT3b0JGXy1kR5XlAamcMXeZOyo9Mm\nl7W/VSKvwIgUZKOpk/lSizCPBbfoYrkJzdIYDD7YrZWIN1iz844pox74UB2FJbPp\nVTLEpNOsNnG9N/A7q59IYbvY1i0D9iYHO5M1UhTUaQKBgQD54+MKg21G6UWrq4Qj\nzSQGq4x1b6//9hCSXC3SzI9/91dHoMVZspX9eTTXr+ce5RqScOR9MBlP31Tsqvds\n/XPee33f32axRBxOhnZ6VDBd7ePvmzxwzsf8BU/M8uV18iqkqJrktqr0t6VwU3zW\n2vjzjLSCn1JIxN6+EyT6EX3xJQKBgQDEEe2/21EMWXDgXvHwrh0OCVf1o79r4aJs\nNxzL9FVw1iYR3bEgYhvBstaJjlBLBg3BaExH1JkAwqxwzYdZds/cr16km9NQCFDn\nfmAnn5j8MKER09ADmRqNon8jm/3KrmvBPkkz/TBwzLvFS00OpvvhTQzEeY4MmbXg\nHQylnyOQRQKBgAcBIUMRLgX30fEe7KRIQsNBGb3M9KT7E7nWhZ5MB5WxrCug0QdT\nnyqstBN7pcHS8Cy8p1ru9zaq7ul3XVobvJy2329gBrPfUd/NmxKQu45WdbYopsgO\ns8JXr8Xx5QaqVBGrfDP+/sm/QA7m+C/ZkXLaNdEXgCn0Ar5XMQklZl9VAoGAOB6B\nlDZr3kMDYdULHr5XJptaB77UnUY5vQuRPHc0tVU2FEsF1aT/GNPdQAXxyWd0LHVz\nz+Nz35nYzXimUt8E4792MVtAglm+/mNXlj/CA/zPPVEI6t65kOx/w2t0mryNrwPq\n4+yGHuMao3/IEHePBI+PJfU8yTJ9siXeZtFD1pkCgYEAykQmU0S3wMNn3nXFnylV\n0lluAvehWkCyFK7Vm0ew0ZZIjbkQM510YxYeo2dI0wiSV4EEH2dHEWYd1z3/RBCM\nnJoi36t5zA10Yp1qJkx3OROxu/KJwRkcNr2jhUJk78Gowj4l12WJl3MpMNuoTkoG\nh3nK1/HrMPOGb8DmzSLqvBw=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2gfna@lunchdax-89c55.iam.gserviceaccount.com",
    "client_id": "116396249967103875149",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2gfna%40lunchdax-89c55.iam.gserviceaccount.com"
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