import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEY } from '../constants';
import { addNewRegister, deleteRegister } from '../utils/helpers';
import { DatabaseProps } from '../utils/types';

export const insertData = async (value: DatabaseProps) => {
  try {
    const content = await getData();

    const jsonWithNewValue = addNewRegister(value, content);

    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY,
      JSON.stringify(jsonWithNewValue),
    );
  } catch (e) {
    // saving error
  }
};

export const deleteData = async (item: DatabaseProps) => {
  try {
    const content = await getData();

    const jsonWithNewValue = deleteRegister(item, content);

    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY,
      JSON.stringify(jsonWithNewValue),
    );
  } catch (e) {
    // saving error
  }
};

export const storeData = async (value: DatabaseProps[] | null) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
