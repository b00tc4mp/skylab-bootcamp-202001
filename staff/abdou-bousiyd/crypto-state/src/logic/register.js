function register(name, surname, username, password) {

    if(!name) throw Error('name should be defined')
    if(!surname) throw Error('surname should be defined')
    if(!username) throw Error('username should be defined')
    if(!password) throw Error('password should be defined')

    
    // una fuctona que llama ase misnma

    return ( async () => {
        const response = await fetch('https://skylabcoders.herokuapp.com/api/v2/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, username, password })
        })
        const { status } = response

        if (status === 201) {
            return 'ok'
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                return {
                    error: error.message
                }
                // throw new error('credenciales incorrectas')
            }

            // throw new Error(error)
        }
        return {
            error: 'server error'
        }
        // throw new Error('server error')
    })()
}
export default register;

