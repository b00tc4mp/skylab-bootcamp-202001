const {
    retrieveParkLocation,
    createPark,
    updatePark,
    approvePark,
    reportPark,
    deletePark,
    searchParks,
    retrievePark
} = require('../../logic')

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
    }),
    report: asyncHandler(async (req, res, next) => {
        const review = await reportPark(req.params, req.body, req.payload)
        if (review) deletePark(req.params.pid)
        res.status(201).end()
    }),
    retrieve: asyncHandler(async (req, res, next) => {
        const park = await retrievePark(req.params)
        res.status(200).json({ park })
    }),
    search: asyncHandler(async (req, res, nex) => {
        const results = await searchParks(req.query)
        res.status(200).json({ results })
    }),
    update: asyncHandler(async (req, res, next) => {
        const { id, pid: parkId } = req.params
        await updatePark(id, parkId, req.body)
        res.status(200).json({ message: 'park updated' })
    }),
    delete: asyncHandler(async (req, res, nex) => {
        const { sub } = req.payload
        const { pid: parkId } = req.params
        await deletePark(parkId, sub)
        res.status(200).end()
    }),
    retrieveLocation: asyncHandler(async (req, res, next) => {
        const { id } = req.params
        const result = await retrieveParkLocation(id)
        res.status(200).json({ result })
    })
}