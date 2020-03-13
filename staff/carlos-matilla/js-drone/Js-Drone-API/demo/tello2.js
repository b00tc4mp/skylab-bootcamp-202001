var HID = require('node-hid');
var devices = HID.devices();
//  console.log(devices)
let device = undefined
 devices.forEach((devic)=>{if(devic.vendorId===1406) device = devic})
 var joycon = new HID.HID(device.path);
 joycon.on("data", function(data) {
     console.log(data.toString())
 });
// var device = new HID.HID('IOService:/IOResources/IOBluetoothHCIController/AppleBroadcomBluetoothHostController/IOBluetoothDevice/IOBluetoothL2CAPChannel/IOBluetoothHIDDriver')
// console.log(device)

// var devices = HID.devices();
// var deviceInfo = devices.find( function(d) {
//     var isTeensy = d.vendorId===1406 && d.productId===8199;
//     return isTeensy && d.usagePage===1406 && d.usage===8199;
// });
// if( deviceInfo ) {
//   var device = new HID.HID( deviceInfo.path );
//   console.log(device)
//   // ... use device
// }
