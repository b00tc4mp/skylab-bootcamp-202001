const { NotAllowedError } = require('crediday-errors')

module.exports = async (response) => {
  const { status } = response

  if (status === 200 || status === 201) {
    return await response.json()
  }

  if (status >= 400 && status < 500) {
    const { error } = await response.json()

    if (status === 401) {
      throw new NotAllowedError(error)
    }

    throw new Error(error)
  }

  throw new Error('server error')
}