import React, {memo, useEffect, useState} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {SafeAreaView, ScrollView} from 'react-native';
import StylesNotif from './NotifStyle';
import {useAppDispatch} from '../../Hooks/hooks';
import {getNotification} from '../../config/actions/notification';

interface DataNotif {
  id: number;
  title: string;
  body: string;
  type: string;
}

function NotificationScreen(): JSX.Element {
  const styles = StylesNotif();
  const dispatch = useAppDispatch();
  const [dataNotification, setDataNotification] = useState<DataNotif[]>([]);

  const getDataNotification = async () => {
    try {
      const result = await dispatch(getNotification());
      const data = result.payload.data;
      setDataNotification(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataNotification();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {dataNotification.map(data => (
            <Card style={styles.cardContainer} key={data.id}>
              <Card.Title
                subtitleStyle={styles.textStyle}
                titleStyle={styles.textStyle}
                title={data.title}
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
                  {data.body}
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
