const nodemailer = require("nodemailer");
module.exports = async(authMail, to, html) => {

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
      to, // list of receivers
      subject: 'Confirmación de registro en CrediDay App', // Subject line
      html
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