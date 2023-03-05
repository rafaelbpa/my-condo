import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native';
import { colors } from '../colors';

import TriangleDown from '../assets/images/triangle-down.svg';

interface DropDownProps extends ViewProps {
  label?: string;
  value?: string;
  onPress: () => void;
}

export const DropDown = ({
  label,
  value,
  style,
  onPress,
}: DropDownProps): JSX.Element => {
  return (
    <Pressable onPress={onPress}>
      <View style={[{ marginBottom: 9 }, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.input}>
          <Text style={styles.dropDownText}>{value}</Text>
          <TriangleDown />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 43,
    paddingHorizontal: 17,
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colors.midGray,
    flexDirection: 'row',
  },
  dropDownText: {
    color: colors.midGray,
    fontSize: 15,
  },
  label: {
    marginBottom: 2,
    color: colors.darkGray,
    fontWeight: 'bold',
    lineHeight: 22,
    fontSize: 15,
  },
});
