import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../colors';
import { RootStackParamList } from '../routes';

type Props = NativeStackScreenProps<RootStackParamList, 'ListItems'>;

export const ListItems = ({ navigation, route }: Props): JSX.Element => {
  const { data, onPress } = route.params;
  return (
    <FlatList
      renderItem={({ item }) => (
        <Item item={item} onPress={onPress} navigation={navigation} />
      )}
      style={{ flex: 1, backgroundColor: colors.secondary }}
      data={data}
    />
  );
};

type ItemProps = {
  item: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ListItems',
    undefined
  >;
  onPress: (param: string) => void;
};

const Item = ({ item, navigation, onPress }: ItemProps) => (
  <Pressable
    onPress={() => {
      onPress(item);
      navigation.goBack();
    }}>
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.secondary,
    borderBottomColor: colors.midGray,
    borderBottomWidth: 0.5,
    height: 43,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  itemText: {
    fontSize: 15,
    color: colors.darkGray,
  },
});
