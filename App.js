import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

export default function App() {
  React.useEffect(() => {
    allowsNotificationsAsync();
    const subscription = Notifications.addNotificationReceivedListener(
      ({ request: { content } }) => {
        Alert.alert(content.title, content.body);
      }
    );
    return () => subscription.remove();
  }, []);

  const handleButtonPress = (time) => {
    const localnotification = {
      title: 'Example Title!',
      body: 'This is the body text of the local notification',
      sound: true,
    };

    Notifications.scheduleNotificationAsync({
      content: localnotification,
      trigger: {
        seconds: time,
        repeats: false,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Test</Text>
      <Text style={styles.details}>
        The notification system using Expo works on Silent mode and when running
        in the background as well.
      </Text>
      <StatusBar style='auto' />
      <Button title='Fire Alarm (2s)' onPress={() => handleButtonPress(2)} />
      <Button title='Fire Alarm (5s)' onPress={() => handleButtonPress(5)} />
      <Button title='Fire Alarm (10s)' onPress={() => handleButtonPress(10)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  details: {
    padding: 20,
  },
});
