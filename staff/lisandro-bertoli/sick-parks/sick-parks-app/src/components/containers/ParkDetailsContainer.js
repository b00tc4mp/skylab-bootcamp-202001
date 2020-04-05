import React from 'react'
import { updatePark, publishComment, reportPark, votePark, approvePark } from 'sick-parks-logic'
// import { __handleUserUpdate__ } from '../../handlers'
import { ParkDetails } from '../presentational'


export default function ParkDetailsScreen({ navigation }) {
    const onDelete = () => handleOnDelete(navigation)

    const onParkUpdate = update => handleUpdate(update)

    const handleVote = vote => handleParkVote(vote)

    const handleCommentSubmit = body => submitComment(body)

    const handleContribution = action => handleParkContribution(action)

    return <ParkDetails
        park={detailedPark}
        user={user}
        onVote={handleVote}
        onDeletePark={onDelete}
        onUpdate={onParkUpdate}
        onCommentSubmit={handleCommentSubmit}
        onContribution={handleContribution}
        goBack={navigation.goBack}
        error={error} />

}
