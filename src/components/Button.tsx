import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import { colors } from '../colors';

interface ButtonProps extends ViewProps {
  onPress: () => void;
  label: string;
  type?: 'Contained' | 'Outlined';
}

export const Button = ({
  onPress,
  label,
  type = 'Outlined',
  style,
}: ButtonProps): JSX.Element => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          style,
          styles.container,
          {
            backgroundColor: type === 'Contained' ? colors.pink : colors.white,
          },
        ]}>
        <Text
          style={[
            styles.label,
            { color: type === 'Contained' ? colors.white : colors.pink },
          ]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  label: {
    color: colors.white,
  },
});
