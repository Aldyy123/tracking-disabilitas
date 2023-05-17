import Mapbox from '@rnmapbox/maps';
import React, {memo, useEffect} from 'react';
import styles from '../styles';
import * as turf from '@turf/turf';

interface Props {
  zones: number[][];
  coordinate: number[];
}
function MappingUser({zones, coordinate}: Props) {
  if (zones?.length < 4) {
    return null;
  }
  const melihat = () => {
    const points = turf.point(coordinate);
    const zonesPolygon = [...zones, zones[0]];

    const searchWithin = turf.polygon([zonesPolygon]);
    const ptsWithin = turf.pointsWithinPolygon(points, searchWithin);
    console.log(ptsWithin);
  };
  useEffect(() => {
    melihat();
  }, []);
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
