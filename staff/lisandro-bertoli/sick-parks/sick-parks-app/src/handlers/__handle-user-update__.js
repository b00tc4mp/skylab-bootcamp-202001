import { retrieveUser } from 'sick-parks-logic'

import __handleErrors__ from './__handle-errors__'

const __handleUserUpdate__ = async (setError) => {
    try {
        const updatedUser = await retrieveUser()

        setUser(updatedUser)
    } catch ({ message }) {
        __handleErrors__(message, setError)
    }
}

export default __handleUserUpdate__