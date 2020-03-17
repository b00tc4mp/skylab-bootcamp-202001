import { AsyncStorage } from 'react-native'

export default {
    set token(token) {
        return (async () => {
            await AsyncStorage.setItem('token', token)

        })()
    },

    get token() {
        return (async () => {
            return await AsyncStorage.getItem('token')

        })()
    },

    clear() {
        return (async () => {
            delete this.token

            await AsyncStorage.removeItem('token')
        })()

    }
}