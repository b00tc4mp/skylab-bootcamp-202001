module.exports = {
  NotFoundError: class NotFoundError extends Error {
    constructor(...args) {
      super(...args)

      this.name = NotFoundError.name
    }
  },

  NotAllowedError: class NotAllowedError extends Error {
    constructor(...args) {
      super(...args)

      this.name = NotAllowedError.name
    }
  },

  ContentError: class ContentError extends Error {
    constructor(...args) {
      super(...args)

      this.name = ContentError.name
    }
  }
}