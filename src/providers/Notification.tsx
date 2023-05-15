import notifee, {AndroidImportance} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const onDisplayNotification = async (
  notification: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelId = await notifee.createChannel({
    id: 'notification',
    name: 'Notification',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: notification.notification?.title,
    body: notification.notification?.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
    },
  });
};

export {onDisplayNotification};
