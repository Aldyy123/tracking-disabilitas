import Geolocation from '@react-native-community/geolocation';
import {memo, useEffect, useState} from 'react';
import Maps from './Component/Map';

function TrackerScreen() {
  const [initalCoordinate, setInitalCoordinate] = useState<number[]>([
    109.12188833333333, -6.8836216666666665,
  ]);

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
        maximumAge: 1000,
        interval: 3000,
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
