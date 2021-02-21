module.exports = ({company, username, companyId}) => {
  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
      <style type="text/css">
  
      /* CLIENT-SPECIFIC STYLES */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        
        /* RESET STYLES */
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* GMAIL BLUE LINKS */
        u + #body a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
        }
        
        /* SAMSUNG MAIL BLUE LINKS */
        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
        }
  
        /* Universal styles for links and stuff */
        a { color: #229efd; font-weight: bold; }
        a:hover { color: #fd6350; text-decoration: none; }
        a.button:hover { background-color: #fd6350 !important; }
  
        /* Responsive styles */
        @media screen and (max-width: 600px) {
          .mobile { width: 100% !important; }
          h1 { font-size: 24px !important; }
        }

        /*Body*/

        .container {
          text-align: center;
          font-family: Montserrat, sans-serif;
          font-size: 18px;
          text-align: center;
        }

        p {
          margin: 0;
          padding: 0;
          color: black;
        }

        .link {
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 20px;
          color: #FFFFFF;
          background-color: #303F9F;
          font-size: 16px;
        }

        .contact {
          margin-top: 20px;
          margin-bottom: 5px;
        }

      </style>
    </head>
  
    <body id="body" style="margin: 0 !important; padding: 0 !important;">

    <div class="container">
      <a href="http://localhost:3000/login/${companyId}" target="_blank" style="cursor: pointer;">
        <h1 style="color: #303F9F; font-size: 36px;">CrediDay</h1>
      </a>

      <p>Compañia: ${company}</p>
      <p style="margin-bottom: 10px;">Usuario: ${username}</p>
      <a href="http://localhost:3000/login/${companyId}" target="_blank" style="cursor: pointer;">
        <button style="cursor: pointer;" class="link">click para confirmar tu correo</button>
      </a>

      <p style="font-size: "14px" class="contact">Celular: (+506) 8315-0519</p>

      <a href="http://localhost:3000/login/${companyId}" target="_blank" style="cursor: pointer;">
        <p style="font-size: "14px">Sitio web: www.crediday.com</p>
      </a>
    </div>

    <footer>

    </footer>

    </body>
  </html>`

}