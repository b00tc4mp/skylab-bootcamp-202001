import context from './context'

export default (function () {
    delete sessionStorage.token
}).bind(context)