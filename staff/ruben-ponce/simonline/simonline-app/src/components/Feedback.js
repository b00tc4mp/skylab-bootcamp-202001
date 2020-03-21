import React from 'react'

function Feedback({ error }) {
    return <p style={{color: '#747474' ,marginTop: '.5rem'}} >- {error} -</p>
}

export default Feedback