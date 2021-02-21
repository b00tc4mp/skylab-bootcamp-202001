import React, { useState, useEffect } from 'react'

export default function Timer({size}) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {

    const timer = setTimeout(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
    
  }, [time])

  

  const style = {
    fontSize: size,
    color: 'red'
  }

  return (
    <div>
      <span style={style}>
      {time.toLocaleTimeString(undefined, {hour: "numeric", minute: "numeric", second: 'numeric'})}  
      </span>
    </div>
  )
}
