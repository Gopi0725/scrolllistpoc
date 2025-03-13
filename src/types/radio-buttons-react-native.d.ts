declare module 'radio-buttons-react-native' {
    import { FC } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface RadioButtonProps {
      data: Array<{ label: string; value: string }>;
      selectedBtn: (e: { label: string; value: string }) => void;
      initial?: number;
      activeColor?: string;
      deactiveColor?: string;
      boxActiveBgColor?: string;
      boxDeactiveBgColor?: string;
      textColor?: string;
      style?: ViewStyle;
      textStyle?: TextStyle;
    }
  
    const RadioButtonRN: FC<RadioButtonProps>;
    export default RadioButtonRN;
  }
  