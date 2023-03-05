import React from 'react';
import { StyleSheet, TextInput, View, ViewProps } from 'react-native';

import Lupa from '../assets/images/lupa.svg';

interface SearchInputProps extends ViewProps {}

export const SearchInput = ({ style }: SearchInputProps): JSX.Element => {
  return (
    <View style={[styles.container, style]}>
      <Lupa style={styles.icon} />
      <TextInput placeholder="Pesquisar conta" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 22,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 20,
  },
});
