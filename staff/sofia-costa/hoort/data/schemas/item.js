const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    colorId: { type: String, required: true },  //cidentification by color for calendar
    name: { type: String, required: true },
    type : { type: String, required: true }, //tuber, fruit, bean...
    subtype: { type: String, required: true },   
    growth: { type: String, required: true },   //if it grows under or over soil
    growthDuration: { type: String, required: true },   // average time ot takes to grow the veggie
    soil: { type: String, required: true }, //type of soil
    //tips: { type: String, required: true },
    //image: { type: String, required: true },
    temperature: { type: String, required: true },
    bestPeriod: { type: String, required: true },   // best period to plant
    bestPeriodNum: { type: [], required: true },   //to find the month on mongodb
    lightPreference: { type: String, required: true },
    userAverageTime: { type: [{ObjectId: Number}] }, //number of days. ObjectId for each user
    state: { type: [{ ObjectId, lands: [{ ObjectId, estTime: Date }] }], ref: 'Land' }, //1st ObjectId for user, second for their lands where this item appears
    planted: { type: { ObjectId: Date } } // ObjectId for user id
})