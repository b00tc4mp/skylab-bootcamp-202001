const Cookie = require('./cookie')

module.exports = function (props = {}) {
    let { title, body, acceptCookie } = props

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="/style.css">
</head>
<body class="app">
    <main>${body}</main>
    <footer>${acceptCookie ? "" : Cookie() }</footer>
</body>
</html>`
}