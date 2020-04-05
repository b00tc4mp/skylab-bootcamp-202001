import React from 'react'
import { __handleUserUpdate__ } from '../../handlers'
import { Home } from '../../components'

export default function HomeScreen() {


    return <Home user={user} updateUser={__handleUserUpdate__} />
}