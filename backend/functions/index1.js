const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const rp = require('request-promise');

const cors = require('cors')({origin: true});


//google account credentials used to send email
const mailTransport = nodemailer.createTransport(
    `smtps://lunchdaxuf@gmail.com:Gabbegillarkorv123@smtp.gmail.com`);

exports.sendEmailCF = functions.https.onCall((data, context) => {

        console.log("data: "+JSON.stringify(data))
        if(!data) {
            return "data==null"
        }
        //recaptcha validation
        rp({
            uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
            method: 'POST',
            formData: {
                secret: '6LeBRIQUAAAAAOdEq5nGgderV0WGCU7YwtzzbAOv',
                response: data["g-recaptcha-response"]
            },
            json: true
        }).then(result => {
            if (result.success) {
                sendEmail('lunchdaxuf@gmail.com', data).then(() => {
                    return "success"
                });
            }
            else {

                return "success"
            }
        }).catch(reason => {

            return "success"
            //return {status: 'Error', code: 500, message: "Recaptcha req failed."}
        })

        return "success"
        //return {status: 'Error', code: 500, message: "rp failed."}
});


// Send email function
function sendEmail(email, body) {
    const mailOptions = {
        from: `<${body.mail}>`,
        to: email
    };
    // hmtl message constructions
    mailOptions.subject = 'contact form message';
    mailOptions.html = `
                      <p><b>Email: </b>${body.mail}</p>
                      <p><b>Subject: </b>${body.rest}</p>
                      <p><b>Message: </b>${body.message}</p>`;
    return mailTransport.sendMail(mailOptions);
}