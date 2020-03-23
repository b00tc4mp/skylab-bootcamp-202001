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

const localNotification = (drugName) => {
 PushNotification.localNotification({
   autoCancel: true,
   actions: '["Accept", "Reject"]',
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   //bigText: "My big text that will be shown when notification is expanded",
   //subText: "This is a subText",
   color: "green",
   //vibrate: true,
   //vibration: 300,
   title: drugName,
   message: "puto",
   playSound: true,
   soundName: 'default',
   alertAction: 'view',
 });
};


export default {
 configure,
 localNotification
};
