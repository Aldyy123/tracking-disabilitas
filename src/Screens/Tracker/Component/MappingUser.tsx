import Mapbox from '@rnmapbox/maps';
import React, {memo} from 'react';
import styles from '../styles';

interface Props {
  zones: number[][];
}
function MappingUser({zones}: Props) {
  console.log(zones);
  if (zones?.length < 4) {
    return null;
  }
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
