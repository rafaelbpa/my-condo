import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '../colors';

interface InputProps extends TextInputProps {
  label?: string;
}

export const Input = ({ label, ...rest }: InputProps): JSX.Element => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 9,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 43,
    paddingHorizontal: 17,
    paddingVertical: 10,
    color: colors.midGray,
  },
  label: {
    marginBottom: 2,
    color: colors.darkGray,
    fontWeight: 'bold',
    lineHeight: 22,
    fontSize: 15,
  },
});
