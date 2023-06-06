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
import {fetchMapData} from '../../../config/actions/map';
import {useAppDispatch} from '../../../Hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(
  'sk.eyJ1IjoiYWxkeXkiLCJhIjoiY2xobGQya3U3MG0zYTNmb3B2Y2FiZ3p3eCJ9.coX4v4NiM7Md1_0cqiCHWA',
);

interface Props {
  coordinate: number[];
  coordinateHandphone: number[];
}
const Maps = ({coordinate, coordinateHandphone}: Props) => {
  const cameraViewRef = useRef<Mapbox.Camera>(null);
  const [pointCoordinate, setPointCoordinate] = useState<number[][]>([]);
  const [isAddCoordinate, setIsAddCoordinate] = useState(false);
  const dimensions = useWindowDimensions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    cameraViewRef.current?.setCamera({
      centerCoordinate: coordinate,
      zoomLevel: 13,
    });
    AsyncStorage.getItem('zones').then(res => {
      if (res) {
        setPointCoordinate(JSON.parse(res));
      }
    });
  }, []);

  const backIntialCoordinate = useCallback(async () => {
    const locationRightNow = await dispatch(fetchMapData());
    // cameraViewRef.current?.setCamera({
    //   centerCoordinate: [
    //     locationRightNow.payload.data.lng,
    //     locationRightNow.payload.data.alt,
    //   ],
    //   zoomLevel: 13,
    // });
    cameraViewRef.current?.fitBounds(
      [locationRightNow.payload.data.lng, locationRightNow.payload.data.alt],
      coordinateHandphone,
    );
    cameraViewRef.current?.zoomTo(11);
  }, [dispatch, coordinateHandphone]);

  const openEditCoordinate = () => {
    setIsAddCoordinate(true);
  };
  const closeEditCoordinate = async () => {
    setIsAddCoordinate(false);
    setPointCoordinate([]);
    await AsyncStorage.clear();
  };

  const completeEditCoordinate = async () => {
    if (pointCoordinate.length < 4) {
      return Alert.alert('Warning', 'Zona tidak boleh kurang dari 4 titik', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
    await AsyncStorage.setItem('zones', JSON.stringify(pointCoordinate));
    setIsAddCoordinate(false);
  };

  const clearPointMap = async () => {
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
        <Mapbox.PointAnnotation id="Penggunaan" coordinate={coordinate}>
          <MaterialCommunityIcons name="map-marker" size={30} color="#D21312" />
          {/* <Text>1</Text> */}
          {/* <MaterialCommunityIcons name="account" size={30} color="#900" /> */}
          <Mapbox.Callout title="Posisi Tongkat" id="user" />
        </Mapbox.PointAnnotation>
        <Mapbox.PointAnnotation id="Handphone" coordinate={coordinateHandphone}>
          <MaterialCommunityIcons name="account" size={30} color="#D21312" />
          {/* <Text>1</Text> */}
          {/* <MaterialCommunityIcons name="account" size={30} color="#900" /> */}
          <Mapbox.Callout title="Lokasi Saya" id="pelacak" />
        </Mapbox.PointAnnotation>
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
