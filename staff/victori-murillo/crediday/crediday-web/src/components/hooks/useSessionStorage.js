import { useState, useEffect } from 'react'

export default (key, initialState) => {

  const get = () => {
    // const storage = localStorage.getItem(key)
    const storage = sessionStorage.getItem(key)
    if (storage) return JSON.parse(storage)['value']
    return initialState
  }

  const [value, setValue] = useState(get())

  useEffect(() => {
    // localStorage.setItem(key, JSON.stringify({ value }))
    sessionStorage.setItem(key, JSON.stringify({ value }))
  }, [value])

  return [value, setValue]
}