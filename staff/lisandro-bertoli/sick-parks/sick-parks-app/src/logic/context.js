import { AsyncStorage } from 'react-native'

export default {
    setToken: async function (token) {
        await AsyncStorage.setItem('token', token)
    },

    getToken: async function () {
        return await AsyncStorage.getItem('token')
    },

    clear: async function () {
        await AsyncStorage.removeItem('token')
    }
}