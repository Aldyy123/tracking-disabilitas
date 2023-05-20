import {StyleProp, StyleSheet, useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

const useStyle = (): StyleProp<any> => {
  const theme = useTheme();
  const dimensions = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    shadowContainer: {
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 15,
    },
    circleInfo: {
      // backgroundColor: '#404258',
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      borderRadius: 100,
      marginTop: 20,
      height: 200,
      width: 200,
    },
    textInfo: {
      padding: 10,
      fontSize: 20,
      color: theme.colors.secondary,
      fontWeight: '900',
    },
    buttonConnect: {
      // #4AA7A1 || 4AA7A1
      backgroundColor: '#4AA7A1',
      padding: 10,
      borderRadius: 10,
      width: dimensions.width / 1.1,
    },
    textBtn: {
      textAlign: 'center',
      color: 'white',
    },
    divideStyle: {
      marginVertical: 30,
      borderWidth: 2,
      borderColor: '#015365',
    },
    textWarning: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 10,
    },
    textUserInformation: {
      marginTop: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
      color: theme.colors.onBackground,
    },
    cardInfoUser: {
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      paddingVertical: 10,
      width: dimensions.width / 1.1,
    },
  });

  return styles;
};

export default useStyle;
