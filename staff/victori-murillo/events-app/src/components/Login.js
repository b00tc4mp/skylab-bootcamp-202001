import React from 'react'

export default ({ handleLogin, setView }) => {
  return (
    <div>
      <form onSubmit={handleLogin} >
        <h2>Login</h2>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
      </form>
      <a href="/register" onClick={(e) => {
        e.preventDefault()
        setView('register')
      }
      }>Register</a>
    </div>
  )
}
