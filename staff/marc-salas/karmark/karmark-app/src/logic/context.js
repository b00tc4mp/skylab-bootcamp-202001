export default {
    set token(token){
        sessionStorage.token = token
    },
    get token(){
        return sessionStorage.token
    },
    clear() {
        delete this.token

        sessionStorage.clear()
    }
}