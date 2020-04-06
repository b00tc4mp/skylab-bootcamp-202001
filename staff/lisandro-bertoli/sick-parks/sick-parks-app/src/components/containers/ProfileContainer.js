import React, { useEffect, useState } from 'react'


export default function PorfileContainer() {
    const [publishedParks, setPublishedParks] = useState([])

    useEffect(() => {
        (async () => {

            if (isUserLoggedIn()) {
                try {
                    const parks = await retrievePublishedParks()

                    setPublishedParks(parks)

                } catch (error) {
                    console.log(error)
                }
            }
        })()


    }, [user])

    const handleLogout = async () => {
        setUser(null)
        setError(null)
        await logoutUser()

    }

    const handleOnToLogin = () => setUser(null)

    return <Profile user={user} userParks={publishedParks} onToLogin={handleOnToLogin} onLogout={handleLogout} />
}

