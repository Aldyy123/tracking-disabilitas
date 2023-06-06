import React, {memo, useCallback, useEffect, useState} from 'react';
import Maps from './Component/Map';
import {useAppDispatch, useAppSelector} from '../../Hooks/hooks';
import {fetchMapData} from '../../config/actions/map';
import Geolocation from '@react-native-community/geolocation';
import {Alert} from 'react-native';
import useTokenFirebaseMessage from '../../Hooks/useToken';
import {messageAction} from '../../config/actions/notification';
function TrackerScreen() {
  const dispatch = useAppDispatch();
  const [initalCoordinate, setInitalCoordinate] = useState<number[]>([
    109.12188833333333, -6.8836216666666665,
  ]);
  const [handphoneCoordinate, setHandphoneCoordinate] = useState<number[]>([
    0, 0,
  ]);

  const statusSelector = useAppSelector(state => state.status);
  const token = useTokenFirebaseMessage();

  const onMessage = useCallback(async () => {
    try {
      const data = {
        notification: {
          title: 'Peringatan!',
          body: 'Perangkat diluar zona yang ditentukan',
        },
        data: {},
        to: token,
      };
      await dispatch(messageAction({data}));
    } catch (error) {
      console.log(error);
    }
  }, [token, dispatch]);
  useEffect(() => {
    if (statusSelector.userOut === true) {
      onMessage();
    }
  }, [statusSelector]);

  const getMapDataDevice = async () => {
    try {
      const result = await dispatch(fetchMapData());
      setInitalCoordinate([result.payload.data.lng, result.payload.data.alt]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        setHandphoneCoordinate([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      error => {
        Alert.alert('Error', JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    getMapDataDevice();
    setInterval(() => {
      getMapDataDevice();
    }, 5000);
  }, []);

  return (
    <>
      <Maps
        coordinate={initalCoordinate}
        coordinateHandphone={handphoneCoordinate}
      />
    </>
  );
}

export default memo(TrackerScreen);
