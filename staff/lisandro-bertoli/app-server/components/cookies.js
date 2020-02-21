function CookiesPanel() {
    return `<section>
    This site uses cookies<form action="/accept-cookies" method="POST"><button>Accept</button></form>
    </section>
    `
}

module.exports = CookiesPanel