const fetch = require("node-fetch")

module.exports = {
  get: async (url, headers = {}) => {
    const { token } = headers

    return await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      }
    })
  },

  post: async (url, headers = {}) => {
    const { body, token } = headers

    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      },
      body: body ? JSON.stringify(body) : undefined
    })
  },

  patch: async (url, headers = {}) => {
    const { body, token } = headers

    return await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      },
      body: body ? JSON.stringify(body) : undefined
    })
  },

  delete: async (url, headers = {}) => {
    const { body, token } = headers

    return await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      },
      body: body ? JSON.stringify(body) : undefined
    })
  },
}