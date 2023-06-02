import React, {memo, useEffect, useState} from 'react';
import Maps from './Component/Map';
import {useAppDispatch} from '../../Hooks/hooks';
import {fetchMapData} from '../../config/actions/map';

function TrackerScreen() {
  const dispatch = useAppDispatch();
  const [initalCoordinate, setInitalCoordinate] = useState<number[]>([
    109.12188833333333, -6.8836216666666665,
  ]);

  const getMapDataDevice = async () => {
    try {
      const result = await dispatch(fetchMapData());
      setInitalCoordinate([result.payload.data.lng, result.payload.data.alt]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      getMapDataDevice();
    }, 5000);
  }, []);

  return (
    <>
      <Maps coordinate={initalCoordinate} />
    </>
  );
}

export default memo(TrackerScreen);
