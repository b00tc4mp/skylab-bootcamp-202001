const CookiesPanel = require('./cookies')

function App(props) {
    const { title, body, acceptCookies } = props
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="/style.css">
        
    </head>
    <body>
        <h1>${title}</h1>
        ${body}
        ${!acceptCookies ? CookiesPanel() : ''}
    </body>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous" />
    </html>   
    `
}
module.exports = App

