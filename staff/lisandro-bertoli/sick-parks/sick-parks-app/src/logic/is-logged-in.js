import context from './context'

export default (function () {
    return !!this.getToken()
}).bind(context)