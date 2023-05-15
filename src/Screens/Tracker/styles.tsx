import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  btnOverlay: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
  },
  btnOverlayLeft: {
    left: 20,
    bottom: 30,
  },
  btnOverlayRight: {
    right: 20,
    bottom: 30,
  },
  btnOverlayClear: {
    bottom: 30,
  },
  map: {
    flex: 1,
  },
  textGuide: {
    fontWeight: 'bold',
    color: 'red',
  },
  guideContainer: {
    top: 40,
  },
  lineStyleZone: {
    lineColor: 'red',
    lineWidth: 2,
  } as any,
  pointContainerUser: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 5,
  },
  pointTextUser: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
