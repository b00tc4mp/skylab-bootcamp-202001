import PushNotification from 'react-native-push-notification'
import PushNotificationAndroid from 'react-native-push-notification'
import { PushNotificationIOS, DeviceEventEmitter } from 'react-native'

const configure = () => {
 PushNotification.configure({

   onNotification: function(notification) {
     notification.finish(PushNotificationIOS.FetchResult.NoData)
     
     if (notification.action == "Take pill") {
        console.log('hello pill');
      }
      else if (notification.action == "Reject") {
          console.log('hello reject');
      }
  },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,
   

 })
 
}


const localNotification = (drugName) => {
 PushNotification.localNotification({
   autoCancel: false,
   actions: '["Take pill", "Reject"]',
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   bigText: "Hey! You have to take ",
   //subText: "This is a subText",
   color: "green",
   //vibrate: true,
   //vibration: 300,
   title: drugName,
   message: "Take pill!",
   playSound: true,
   soundName: 'default',
   alertAction: 'view',
 })
};


// (function() {
//   // Register all the valid actions for notifications here and add the action handler for each action
//   PushNotificationAndroid.registerNotificationActions(["Take pill", "Reject"])
//   DeviceEventEmitter.addListener('notificationActionReceived', function(action){
//     console.log ('Notification action received: ' + action)

//     const info = JSON.parse(action.dataJSON)

//     if (info.action == 'Take pill') {
//       console.log('take pill oh yeah')
//     } else if (info.action == 'Reject') {
//       console.log('not take pill :(')
//     }
//     // Add all the required actions handlers
//   })
// })()


export default {
 configure,
 localNotification
}
