import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

const defaultLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    secondaryContainer: 'transperent',
    background: '#F1F6F9',
  },
};

const DefaultDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    secondaryContainer: 'transperent',
    // background: 'rgb(29, 27, 30)',
    background: '#404258',
    shadow: '#EEEEEE',
  },
};

export {defaultLightTheme, DefaultDarkTheme};
