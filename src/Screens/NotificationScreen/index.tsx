import React, {memo} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {SafeAreaView, ScrollView} from 'react-native';
import StylesNotif from './NotifStyle';

function NotificationScreen(): JSX.Element {
  const styles = StylesNotif();
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(index => (
            <Card style={styles.cardContainer} key={index}>
              <Card.Title
                subtitleStyle={styles.textStyle}
                titleStyle={styles.textStyle}
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
                <Text style={styles.textStyle} variant="bodyMedium">
                  Card content
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default memo(NotificationScreen);
