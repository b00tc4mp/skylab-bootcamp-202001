const { createSpot } = require('../../logic')
const { ContentError } = require('share-my-spot-errors')

module.exports = (req, res) => {
    const { params: { publisherId }, body: { title, description, addressLocation, addressStNumber, addressOther, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, price, acceptsBarker, surveillance, isCovered } } = req
    
    try {
        createSpot(publisherId, title, description, addressLocation, addressStNumber, addressOther, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, price, acceptsBarker, surveillance, isCovered)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}