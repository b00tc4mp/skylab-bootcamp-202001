const nodemailer = require("nodemailer");
const path = require('path')
const pdf = require('./pdf-creator')

module.exports = async ({ authMail, to, subject, html }) => {

  await pdf().then(res => console.log(res))

  async function main() {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: authMail.mail,
        pass: authMail.password
      }
    });

    const mailOptions = {
      from: authMail.mail, // sender address
      to:'jealpiva@gmail.com', // list of receivers
      bcc: to,
      subject, // Subject line
      html,
      attachments: [
        {   // utf-8 string as an attachment
          filename: 'file2.pdf',
          path: path.join(__dirname, 'output1.pdf'),
          contentType: 'application/pdf'
        }
      ]
    };

    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  return await main()
    .then(() => {
      return 'mail sended successfully'
    })
    .catch(e => e);
}