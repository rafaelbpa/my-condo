import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../colors';
import { ListRegisters } from '../components/ListRegisters';

export const ListScreen = (): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <ListRegisters />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
  },
});
