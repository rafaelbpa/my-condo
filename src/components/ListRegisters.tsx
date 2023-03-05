import React, { useContext } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../colors';
import { DatabaseContext, ModalContext } from '../utils/context';
import { DatabaseProps } from '../utils/types';

import TrashCan from '../assets/images/trash.svg';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const ListRegisters = (): JSX.Element => {
  const [database] = useContext(DatabaseContext);
  const [, setShowModal, , setDeleteCode] = useContext(ModalContext);

  const deleteItem = (code: DatabaseProps) => {
    setDeleteCode(code);
    setShowModal(true);
  };

  return (
    <FlatList
      data={database}
      contentContainerStyle={{ padding: 22 }}
      ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
      ListHeaderComponent={() =>
        database && <Header length={database?.length} />
      }
      renderItem={({ item }) => (
        <ListRegistersItem onPress={() => deleteItem(item)} item={item} />
      )}
    />
  );
};

const Header = ({ length }: { length: number }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Listagem</Text>
    <Text style={styles.headerCounter}>{length} registros</Text>
  </View>
);

const ListRegistersItem = ({
  item,
  onPress,
}: {
  item: DatabaseProps;
  onPress: () => void;
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Edit', {
          data: item,
        })
      }>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.itemText,
            { color: item.type === 'Receita' ? colors.green : colors.orange },
          ]}>
          {`${item.code} - ${item.name}`}
        </Text>
        <Pressable onPress={onPress}>
          <TrashCan />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    height: 56,
    padding: 16,
  },
  itemText: {
    fontSize: 15,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 18,
  },
  headerTitle: {
    color: colors.darkBlack,
    fontSize: 20,
  },
  headerCounter: {
    color: colors.gray,
    fontSize: 15,
  },
});
