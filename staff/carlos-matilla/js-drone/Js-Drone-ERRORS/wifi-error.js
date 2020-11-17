module.exports = class WifiError extends Error {
    constructor(...args) {
        super(...args)

        this.name = WifiError.name
    }
}