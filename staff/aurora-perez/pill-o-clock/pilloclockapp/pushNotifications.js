import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
 
};

const localNotification = () => {
 PushNotification.localNotification({
   autoCancel: false,
   actions: '["Accept", "Reject"]',
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   bigText: "Hey! You have to take ",
   //subText: "This is a subText",
   color: "green",
   //vibrate: true,
   //vibration: 300,
   title: 'drugName',
   message: "Take pill!",
   playSound: true,
   soundName: 'default',
   alertAction: 'view',
 });
};


export default {
 configure,
 localNotification
};
