  
if (typeof Location.prototype.queryString === 'undefined'){
    Object.defineProperty(Location.prototype, 'queryString', {
        set(queryString) { { q: ..., price: ..., x: ... }
            let { href: url } = this

            const index = url.indexOf('?')

            let qs = ''

            const keys = Object.keys(queryString)

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]

                qs += `${key}=${queryString[key]}`

                if (i < keys.length - 1) qs += '&'
            }
        }
    }
)}