import React, {memo, useEffect, useState} from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {SafeAreaView, ScrollView} from 'react-native';
import {useAppDispatch} from '../../Hooks/hooks';
import stylesAbout from './style';

function AboutScreen(): JSX.Element {
  const styles = stylesAbout();
  return (
    <>
      <SafeAreaView></SafeAreaView>
    </>
  );
}

export default memo(AboutScreen);
