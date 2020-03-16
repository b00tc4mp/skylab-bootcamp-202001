export default {
    set token(token) {
        sessionStorage.token = token
    },

    set parking(parking) {
        sessionStorage.parking = parking
    },

    get parking() {
        return sessionStorage.parking
    },

    get token() {
        return sessionStorage.token
    },

    clear() {
        delete this.token

        sessionStorage.clear()
    },

    clearParking() {
        delete this.parking
        sessionStorage.clear()
    }
}