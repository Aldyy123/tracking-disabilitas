import Mapbox from '@rnmapbox/maps';
import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../styles';

interface Props {
  zones: number[][];
}
function Zones({zones}: Props) {
  return (
    <>
      {zones.length > 0 &&
        zones.map((zone, index) => (
          <Mapbox.PointAnnotation
            selected
            key={index.toString()}
            id={`pin-point-${index}`}
            coordinate={zone}>
            <View style={styles.pointContainerUser}>
              <Text style={styles.pointTextUser}>{index + 1}</Text>
            </View>
          </Mapbox.PointAnnotation>
        ))}
    </>
  );
}

export default memo(Zones);
