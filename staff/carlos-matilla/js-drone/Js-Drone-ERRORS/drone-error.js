module.exports = class DroneError extends Error {
    constructor(...args) {
        super(...args)

        this.name = DroneError.name
    }
}