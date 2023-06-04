import React from 'react';
import {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../Hooks/hooks';
import useStyle from './style';
import {updateController} from '../../config/actions/map';

function StatusScreen() {
  const statusValue = useAppSelector(state => state.status);
  const styles = useStyle();
  const dispatch = useAppDispatch();

  const pressButton = async () => {
    try {
      const oneMinutes = 60000;
      await dispatch(updateController({ult: 1}));
      setTimeout(async () => {
        await dispatch(updateController({ult: 0}));
      }, oneMinutes);
    } catch (error) {
      return error;
    }
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => pressButton()}
          style={{
            ...styles.circleInfo,
            ...styles.shadowContainer,
          }}>
          <Text style={styles.textInfo}>Tongkat Bantu</Text>
        </TouchableOpacity>
        {/* <View
          style={{
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={styles.buttonConnect}
            onPress={() => pressButton()}>
            <Text style={styles.textBtn}>Mencari Perangkat</Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
            }}>
            Ini adalah aplikasi tongkat yang dibuat untuk membantu saudara kita
            yang memiliki keterbatasan khusus (Tuna netra)
          </Text>
        </View>
      </View>
      <Divider style={styles.divideStyle} />
      {statusValue.title && (
        <View style={styles.container}>
          <View
            style={{
              ...styles.shadowContainer,
              ...styles.cardInfoUser,
            }}>
            <Text
              style={{
                ...styles.textWarning,
                color: statusValue.userOut ? '#FFB84C' : '#2CD3E1',
              }}>
              {statusValue.title}
            </Text>
            <Text style={styles.textUserInformation}>
              {statusValue.message}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

export default memo(StatusScreen);
