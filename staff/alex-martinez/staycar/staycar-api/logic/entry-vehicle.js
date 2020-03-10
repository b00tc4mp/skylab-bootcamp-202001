const { validate } = require("staycar-utils");
const { models: { Ticket, Parking } } = require("staycar-data");
const { NotAllowedError } = require("../../staycar-errors");

module.exports = (carPlate, idParking) => {
  validate.string(carPlate, "carPlate")
  validate.string(idParking, "idParking")

  return (async () => {
    const car = await Ticket.findOne({ carPlate });
    if (car) throw new NotAllowedError(`this plate ${carPlate} is inside`);

    const parking = await Parking.find({idParking}).lean();

    let { totalLots, occupiedLots } = parking;

    let freeLots = totalLots - occupiedLots;

    if (freeLots === 0) throw new NotAllowedError("parking full. Entry not allowed");

    await Ticket.create({ carPlate, entryHour: new Date() });

    occupiedLots++;

    const {lots} = parking

    (function checkLot() {
        
        const random = Math.floor(Math.random())*freeLots
        if(lots[random].status) {
            checkLot()
        }
        return lots[random].status = true
    })()
    
    parking.save()

    return {};
  })();
};
