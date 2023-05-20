import React from 'react';
import {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppSelector} from '../../Hooks/hooks';
import useStyle from './style';

function StatusScreen() {
  const statusValue = useAppSelector(state => state.status);
  const styles = useStyle();
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            ...styles.circleInfo,
            ...styles.shadowContainer,
          }}>
          <Text style={styles.textInfo}>Tidak terhubung</Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <TouchableOpacity style={styles.buttonConnect}>
            <Text style={styles.textBtn}>Hubungkan</Text>
          </TouchableOpacity>
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
