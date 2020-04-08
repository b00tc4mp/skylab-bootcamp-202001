import React, { useState, useEffect } from 'react'
import { updatePark, publishComment, reportPark, votePark, approvePark, retrieveUser, retrievePark } from 'sick-parks-logic'
import { __handleUserUpdate__, __handleErrors__ } from '../../handlers'
import { ParkDetails } from '../presentational'
import { View, Text, Alert } from 'react-native'

//See if replacing on full ParkDetail compo on return with 5 or 6 smaller compos helps with issue
//of the whole compo being refreshed

export default function ParkDetailsContainer({ navigation, route }) {
    const [park, setPark] = useState(route.params.park) // maybe like this ==> useState(()=> route.park)
    const [error, setError] = useState(route.params.error)
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            const _user = await retrieveUser()
            setUser(_user)

        })()
    }, [])

    /*<<
        User should come from context?? or maybe just get the token
        from async storage and retrieve id from there, but that 
        would expose that the token is in the async storage to
        react layer and should only be hadeled by logic,
        Maybe logic from retrieving user id from context?? //ask manu
    
    */

    const __handleParkUpdate__ = async (id) => {
        try {
            const _park = await retrievePark(id)
            setPark(_park)

            setError(null)
        } catch ({ message }) {
            Alert.alert(message)
            __handleErrors__(message, setError)
        }
    }

    const handleOnDelete = async () => {
        try {

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                }))


            await deletePark(park.id, user.id)
            await __handleUserUpdate__(setError)

            Alert.alert('Park deleted')
        } catch ({ message }) {
            Alert.alert(message)
        }
    }

    const handleUpdate = async (update) => {

        try {
            await updatePark(user.id, park.id, update)

            __handleParkUpdate__(park.id)
        } catch ({ message }) {
            Alert.alert(message)
        }

    }

    const handleVote = async (vote) => {
        try {
            await votePark(user.id, park.id, vote)

            __handleParkUpdate__(park.id)
        } catch ({ message }) {
            Alert.alert('This action cannot be performed twice by the same user')
        }
    }

    const handleCommentSubmit = async (body) => {
        if (user.id === 'guest') return Alert.alert('This action needs you to be registered')

        try {

            await publishComment(user.id, park.id, body)

            __handleParkUpdate__(park.id)
        } catch ({ message }) {
            Alert.alert(message)
        }
    }

    const handleContribution = async (action) => {
        if (user === 'guest') return Alert.alert('This action needs you to be registered')

        try {
            if (action === 'unreal' || action === 'duplicate') await reportPark(user.id, park.id, action)

            else if (action === 'approve') await approvePark(user.id, park.id)

            __handleParkUpdate__(park.id)

            Alert.alert('Thanks for contributing!')
        } catch ({ message }) {

            Alert.alert(message)
        }
    }

    if (!user || !park) return (
        <>
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        </>
    )

    return <ParkDetails
        park={park}
        user={user}
        onVote={handleVote}
        onDeletePark={handleOnDelete}
        onUpdate={handleUpdate}
        onCommentSubmit={handleCommentSubmit}
        onContribution={handleContribution}
        error={error} />

}
