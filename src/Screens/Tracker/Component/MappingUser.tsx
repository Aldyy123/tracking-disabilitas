import Mapbox from '@rnmapbox/maps';
import React, {memo, useCallback, useEffect} from 'react';
import styles from '../styles';
import * as turf from '@turf/turf';
import {useAppSelector, useAppDispatch} from '../../../Hooks/hooks';
import {clearAllState, setMessage} from '../../../config/slice/status';
import {messageAction} from '../../../config/actions/notification';
import useTokenFirebaseMessage from '../../../Hooks/useToken';

interface Props {
  zones: number[][];
  coordinate: number[];
}
function MappingUser({zones, coordinate}: Props) {
  const dispatch = useAppDispatch();
  const token = useTokenFirebaseMessage();

  if (zones?.length < 4) {
    dispatch(clearAllState());
    return null;
  }

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
    if (!token) return;
    const points = turf.point(coordinate);
    const zonesPolygon = [...zones, zones[0]];

    const searchWithin = turf.polygon([zonesPolygon]);
    const ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
    if (ptsWithin.features.length > 0) {
      console.log('You are in the zone');
    } else {
      onMessage();
      console.log('You are not in the zone');
    }
    dispatch(setMessage(ptsWithin));
  }, [coordinate, dispatch, zones, token]);
  return (
    <>
      <Mapbox.ShapeSource
        id="source"
        shape={
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [zones],
            },
          } as GeoJSON.Feature
        }>
        {/* <Mapbox.FillLayer id="fill" style={{fillColor: 'pink'}} /> */}
        <Mapbox.LineLayer id="line" style={styles.lineStyleZone} />
      </Mapbox.ShapeSource>
    </>
  );
}

export default memo(MappingUser);
