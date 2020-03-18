import context from './context'

export default (async function () {
    const result = await this.getToken()

    return !!result
}).bind(context)