import Mapbox from '@rnmapbox/maps';
import React, {memo, useCallback, useEffect, useState} from 'react';
import styles from '../styles';
import * as turf from '@turf/turf';
import {useAppSelector, useAppDispatch} from '../../../Hooks/hooks';
import {clearAllState, setMessage} from '../../../config/slice/status';
import {messageAction} from '../../../config/actions/notification';
import useTokenFirebaseMessage from '../../../Hooks/useToken';
import {Text} from 'react-native-paper';
import {View} from 'react-native';

interface Props {
  zones: number[][];
  coordinate: number[];
}
function MappingUser({zones, coordinate}: Props) {
  const dispatch = useAppDispatch();
  const token = useTokenFirebaseMessage();
  const [distancePerPoint, setDistancePerPoint] = useState<number[]>([]);

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
    dispatch(setMessage(ptsWithin));
  }, [coordinate, dispatch, zones, token]);

  useEffect(() => {
    const distancesPoints = zones.map((item, index) => {
      let point2;
      const point1 = turf.point(item);
      if (zones[index + 1] === undefined) {
        point2 = turf.point(zones[0]);
      } else {
        point2 = turf.point(zones[index + 1]);
      }
      const distance = turf.distance(point1, point2, {
        units: 'meters',
      });
      return distance;
    });
    setDistancePerPoint(distancesPoints);
  }, []);

  return (
    <>
      <Mapbox.ShapeSource
        id="source"
        lineMetrics
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
      {zones.map((item, index) => (
        <>
          <Mapbox.PointAnnotation
            key={index.toString() + distancePerPoint?.[index]}
            id={`${index}-pointAnnotation`}
            coordinate={item}>
            <View style={styles.pointContainerUser}>
              <Text style={styles.pointTextUser}>{index + 1}</Text>
            </View>
            <Mapbox.Callout
              title={`${distancePerPoint?.[index]?.toFixed(0)} Meter`}
            />
          </Mapbox.PointAnnotation>
        </>
      ))}
    </>
  );
}

export default memo(MappingUser);
