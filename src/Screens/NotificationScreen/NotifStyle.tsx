import {StyleProp, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const StylesNotif = (): StyleProp<any> => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    iconNotif: {
      backgroundColor: 'transparent',
    },
    cardContainer: {
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: theme.colors.background,
    },
    textStyle: {
      color: theme.colors.onBackground,
    },
  });
  return styles;
};

export default StylesNotif;
