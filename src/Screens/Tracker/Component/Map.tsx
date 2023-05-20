import React, {useCallback, useEffect, useRef, useState} from 'react';
import Mapbox from '@rnmapbox/maps';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Alert,
} from 'react-native';
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
    setPointCoordinate([]);
  };

  const completeEditCoordinate = () => {
    if (pointCoordinate.length < 4) {
      return Alert.alert('Warning', 'Zona tidak boleh kurang dari 4 titik', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
    setIsAddCoordinate(false);
  };

  const clearPointMap = () => {
    setPointCoordinate([]);
  };

  const settingCoordinateZones = (feature: GeoJSON.Feature) => {
    if (!isAddCoordinate) {
      return;
    }
    if (feature.geometry.type === 'Point') {
      const arrayFirst = [...pointCoordinate];
      arrayFirst.push(feature.geometry.coordinates);
      setPointCoordinate(arrayFirst);
    }
  };

  return (
    <>
      <Mapbox.MapView
        attributionEnabled={false}
        compassEnabled
        style={styles.map}
        onPress={settingCoordinateZones}
        logoEnabled={false}>
        <Mapbox.Camera ref={cameraViewRef} zoomLevel={13} />
        {coordinate?.[0] !== 109.12188833333333 &&
          coordinate?.[1] !== -6.8836216666666665 && (
            <Mapbox.PointAnnotation id="user" coordinate={coordinate}>
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color="#D21312"
              />
              {/* <Text>1</Text> */}
              {/* <MaterialCommunityIcons name="account" size={30} color="#900" /> */}
              <Mapbox.Callout title="User" id="user" />
            </Mapbox.PointAnnotation>
          )}
        {isAddCoordinate ? (
          <Zones zones={pointCoordinate} />
        ) : (
          <MappingUser zones={pointCoordinate} coordinate={coordinate} />
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
            onPress={completeEditCoordinate}
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
