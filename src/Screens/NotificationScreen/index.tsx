import React, {memo} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import styles from './NotifStyle';
import {SafeAreaView, ScrollView} from 'react-native';

function NotificationScreen(): JSX.Element {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(index => (
            <Card style={styles.cardContainer} key={index}>
              <Card.Title
                title="Alert"
                subtitle="3 menit yg lalu"
                left={props => (
                  <Avatar.Icon
                    {...props}
                    color="#FFB84C"
                    style={styles.iconNotif}
                    icon="bell-alert"
                  />
                )}
              />
              <Card.Content>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default memo(NotificationScreen);
