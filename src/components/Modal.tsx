import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { colors } from '../colors';
import { DatabaseContext, ModalContext } from '../utils/context';

import TrashCan from '../assets/images/trash-pink.svg';
import { Button } from './Button';
import { deleteData, getData } from '../services/database';

export const Modal = (): JSX.Element => {
  const [showModal, setShowModal, item] = useContext(ModalContext);
  const [, setData] = useContext(DatabaseContext);

  const deleteItem = async () => {
    if (!item) {
      return;
    }

    await deleteData(item);
    Toast.show({
      type: 'success',
      text1: `${item.code} - ${item.name} deletado com sucesso`,
      position: 'bottom',
    });
    const data = await getData();
    setData(data);

    setShowModal(false);
  };

  if (!showModal) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TrashCan />
        <Text style={styles.title}>Deseja excluir a conta</Text>
        <Text style={styles.codeName}>
          {item?.code} - {item?.name}
        </Text>
        <View style={styles.buttonContainer}>
          <Button label="Não!" onPress={() => setShowModal(false)} />
          <View style={{ width: 8 }} />
          <Button label="Com certeza" onPress={deleteItem} type="Contained" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: `${colors.black}50`,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 32,
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: colors.lightGray,
    marginTop: 21,
  },
  codeName: {
    fontSize: 15,
    color: colors.lightGray,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 23,
  },
});
