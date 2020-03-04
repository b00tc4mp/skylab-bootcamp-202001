import React from 'react'

export default ({ handleRegister, setView }) => {

  return (
    <form onSubmit={handleRegister} >
      <h2>Register</h2>
      <input type="text" name="name" placeholder="name" />
      <input type="text" name="surname" placeholder="surname" />
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button>Register</button>

      <div>
        <a href="/login" onClick={(e) => {
          e.preventDefault()
          setView('login')
        }
        }>Login</a>
      </div>
    </form>
  )
}
