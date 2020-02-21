const CookiesPanel = require('./cookies')

function App(props) {
    const { title, body, acceptCookies } = props
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        ${body}
        ${!acceptCookies ? CookiesPanel() : ''}
    </body>
    </html>   
    `
}
module.exports = App