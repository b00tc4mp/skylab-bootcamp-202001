const Cookies = require('./cookies')

module.exports = function ( props = {}) {
    const { title, body, acceptCookies } = props

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
    <h1>🏎️ KARMAZON APP 🏎️</h1>
    ${!acceptCookies ? Cookies() : ''}
    ${body}
</body>
<script src="utils/call.js"></script>
<script src="utils/array.prototype.random.js"></script>
<script src="utils/array.prototype.toggle.js"></script>
<script src="utils/string-polyfills.js"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</html>`
}