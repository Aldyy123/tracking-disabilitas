import Geolocation from '@react-native-community/geolocation';
import {memo, useEffect, useState} from 'react';
import Maps from './Component/Map';

function TrackerScreen() {
  const [initalCoordinate, setInitalCoordinate] = useState<number[]>([0, 0]);

  useEffect(() => {
    const idGeolocation = Geolocation.watchPosition(
      position => {
        setInitalCoordinate([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      err => console.log(err),
      {
        maximumAge: 5000,
        interval: 10000,
        enableHighAccuracy: true,
      },
    );
    return () => {
      Geolocation.clearWatch(idGeolocation);
    };
  }, []);

  return (
    <>
      <Maps coordinate={initalCoordinate} />
    </>
  );
}

export default memo(TrackerScreen);