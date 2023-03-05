import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { colors } from '../colors';

import ChevronLeft from '../assets/images/chevron-left.svg';

type HeaderNavigationProps = {
  navProps: NativeStackHeaderProps;
  title: string;
  right?: () => ReactNode;
  bottom?: () => ReactNode;
};

export const HeaderNavigation = ({
  navProps,
  title,
  right,
  bottom,
}: HeaderNavigationProps): JSX.Element => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.leftContainer}>
            {navigation.canGoBack() && navProps.back && (
              <Pressable
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <ChevronLeft />
              </Pressable>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          {right && right()}
        </View>
        {bottom && bottom()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    backgroundColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
});
