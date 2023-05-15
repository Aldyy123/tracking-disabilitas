import React, {useCallback, useEffect, useRef, useState} from 'react';
import Mapbox from '@rnmapbox/maps';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MappingUser from './MappingUser';
import Zones from './Zones';
import styles from '../styles';

Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(
  'sk.eyJ1IjoiYWxkeXkiLCJhIjoiY2xobGQya3U3MG0zYTNmb3B2Y2FiZ3p3eCJ9.coX4v4NiM7Md1_0cqiCHWA',
);

interface Props {
  coordinate: number[];
}
const Maps = ({coordinate}: Props) => {
  const cameraViewRef = useRef<Mapbox.Camera>(null);
  const [pointCoordinate, setPointCoordinate] = useState<number[][]>([]);
  const [isAddCoordinate, setIsAddCoordinate] = useState(false);
  const dimensions = useWindowDimensions();

  useEffect(() => {
    cameraViewRef.current?.setCamera({
      centerCoordinate: coordinate,
      zoomLevel: 13,
    });
  }, [coordinate]);

  const backIntialCoordinate = useCallback(() => {
    cameraViewRef.current?.setCamera({
      centerCoordinate: coordinate,
      zoomLevel: 13,
    });
  }, [coordinate]);

  const openEditCoordinate = () => {
    setIsAddCoordinate(true);
  };
  const closeEditCoordinate = () => {
    setIsAddCoordinate(false);
    // setPointCoordinate([]);
  };

  const clearPointMap = () => {
    setPointCoordinate([]);
  };

  const settingCoordinateZones = (feature: any) => {
    if (!isAddCoordinate) {
      return;
    }
    const arrayFirst = [...pointCoordinate];
    arrayFirst.push(feature.geometry.coordinates);
    setPointCoordinate(arrayFirst);
  };

  return (
    <>
      <Mapbox.MapView
        attributionEnabled={false}
        projection="globe"
        compassEnabled
        style={styles.map}
        onPress={e => settingCoordinateZones(e)}
        logoEnabled={false}>
        <Mapbox.Camera ref={cameraViewRef} zoomLevel={13} />
        <Mapbox.PointAnnotation id="user" coordinate={coordinate}>
          <MaterialCommunityIcons name="map-marker" size={30} color="#900" />
          {/* <Text>1</Text> */}
          {/* <MaterialCommunityIcons name="account" size={30} color="#900" /> */}
          <Mapbox.Callout title="User" id="user" />
        </Mapbox.PointAnnotation>
        {isAddCoordinate ? (
          <Zones zones={pointCoordinate} />
        ) : (
          <MappingUser zones={pointCoordinate} />
        )}
      </Mapbox.MapView>
      {isAddCoordinate ? (
        <>
          <View
            style={{
              left: dimensions.width / 2 - 130,
              ...styles.btnOverlay,
              ...styles.guideContainer,
            }}>
            <Text style={styles.textGuide}>
              Silahkan titik zona yang anda inginkan
            </Text>
          </View>
          <TouchableOpacity
            onPress={closeEditCoordinate}
            style={{...styles.btnOverlay, ...styles.btnOverlayLeft}}>
            <MaterialCommunityIcons
              name="window-close"
              size={30}
              color="blue"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearPointMap}
            style={{
              left: dimensions.width / 2 - 20,
              ...styles.btnOverlay,
              ...styles.btnOverlayClear,
            }}>
            <MaterialCommunityIcons
              name="notification-clear-all"
              size={30}
              color="blue"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={backIntialCoordinate}
            style={{...styles.btnOverlay, ...styles.btnOverlayRight}}>
            <MaterialCommunityIcons name="check" size={30} color="blue" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={openEditCoordinate}
            style={{...styles.btnOverlay, ...styles.btnOverlayLeft}}>
            <MaterialCommunityIcons name="plus" size={30} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={backIntialCoordinate}
            style={{...styles.btnOverlay, ...styles.btnOverlayRight}}>
            <MaterialCommunityIcons name="target" size={30} color="blue" />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default Maps;
