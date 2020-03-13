const nodemailer = require("nodemailer");
module.exports = async(authMail, companyName, username, password) => {

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
      subject: 'Compañia registrada en Crediday.com', // Subject line
      html: `<div>
      <p>Nombre de la compañia: ${companyName}</p>
      <p>Nombre del usuario: ${username}</p>
      <p>Tu contraseña: ${password}</p>
      <p><em>cambiar contraseña al ingresar al sistema</em></p>
      
      </div>`
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