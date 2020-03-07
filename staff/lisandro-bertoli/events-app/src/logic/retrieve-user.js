import context from './context'

export default (function () {
    debugger
    return (async () => {
        const response = await fetch(`http://localhost:8080/users`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.token}` }
        })

        const data = await response.json()
        const { error: _error } = data

        if (_error) throw new Error(_error)

        const { name, surname, email } = data

        return { name, surname, email }

    })()
}).bind(context)

