import React from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {View, StyleSheet, useColorScheme, Text} from 'react-native';
import {useTheme} from '../src/ThemeChangeModule/ThemeContext';
import {Colors} from './ColorsStorage';

import CommonHeader from './Components/CommonHeader';

const ChangeThemeColor: React.FC = () => {
  const {theme, setTheme} = useTheme();
  const defaultTheme = useColorScheme();

  interface ThemeData {
    label: string;
    value: string;
  }

  const styles = styling(theme);
  const radioButtonData: ThemeData[] = [
    {label: 'Light Mode', value: 'light'},
    {label: 'Dark Mode', value: 'dark'},
  ];

  const themeOperations = (theme: string): void => {
    switch (theme) {
      case 'dark':
        setTheme('dark');
        return;
      case 'light':
        setTheme('light');
        return;
    }
  };
  return (
    <View style={styles.Maincontainer}>
       {/* Common Header */}
       <CommonHeader title="Change Theme" />
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          This is a demo of default dark/light theme with switch/buttons using
          async storage.
        </Text>

        <RadioButtonRN
          data={radioButtonData}
          selectedBtn={e => themeOperations(e?.value)}
          activeColor={Colors[theme]?.activeColor}
          deactiveColor={Colors[theme]?.deactiveColor}
          boxActiveBgColor={Colors[theme]?.boxActiveColor}
          boxDeactiveBgColor={Colors[theme]?.themeColor}
          textColor={Colors[theme]?.white}
        />
      </View>
    </View>
  );
};

const styling = (theme: string) =>
  StyleSheet.create({
    Maincontainer:{
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: 15,
      marginTop: '10%',
    },
    textStyle: {
      color: Colors[theme]?.white,
      marginTop: 20,
      textAlign: 'center',
    },
  });

export default ChangeThemeColor;
