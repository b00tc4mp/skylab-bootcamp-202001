const { createPark, approvePark } = require('../../logic')
const { asyncHandler } = require('../../mid-wares')

module.exports = {
    create: asyncHandler(async (req, res, next) => {
        const { sub } = req.payload
        await createPark(sub, req.body)
        res
            .status(201)
            .json({ message: 'park created' })

    }),
    approve: asyncHandler(async (req, res, next) => {
        const { sub } = req.payload
        await approvePark(sub, req.params)
        res.status(200).end()
    })
}