import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://192.168.0.32:8000/users')
    .then(data => console.log(data))
  }, [])

  

  return (
    <div>
      <ul>
        {}
      </ul>
    </div>
  )
}
