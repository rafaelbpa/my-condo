import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { colors } from '../colors';
import { DropDown } from '../components/DropDown';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { Input } from '../components/Input';
import { RootStackParamList } from '../routes';

import Check from '../assets/images/check.svg';
import { filterNames, getCodeSuggestion } from '../utils/helpers';
import { DatabaseContext } from '../utils/context';
import { DatabaseProps } from '../utils/types';
import { validateBeforeSaving } from '../utils/validations';
import { getData, insertData } from '../services/database';

type InsertScreenProps = NativeStackScreenProps<RootStackParamList, 'Insert'>;

export const InsertScreen = ({
  navigation,
}: InsertScreenProps): JSX.Element => {
  const [database, setData] = useContext(DatabaseContext);

  const [parentAccount, setParentAccount] = useState('');
  const [parentAccounts, setParentAccounts] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<'Receita' | 'Despesa'>('Receita');
  const [acceptRelease, setAcceptRelease] = useState<'Sim' | 'Não'>('Sim');

  useEffect(() => {
    if (database) {
      const accounts = filterNames(database);
      const formattedData = accounts.map(acc => `${acc.code} - ${acc.name}`);
      setParentAccounts(formattedData);
    }
  }, [database]);

  const saveData = useCallback(() => {
    if (!database) {
      return;
    }
    const [isValid, error] = validateBeforeSaving({
      parentAccount,
      code,
      database,
    });

    if (!isValid) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.toString(),
        position: 'bottom',
      });
      return;
    }

    const objToSave = {
      code,
      name,
      type,
      acceptReleases: acceptRelease,
    } as DatabaseProps;
    insertData(objToSave).then(() => {
      getData()
        .then(updatedData => setData(updatedData))
        .then(() => {
          navigation.goBack();
          Toast.show({
            type: 'success',
            text1: 'Item adicionado com sucesso!',
            position: 'bottom',
          });
        });
    });
  }, [
    navigation,
    parentAccount,
    code,
    name,
    type,
    acceptRelease,
    database,
    setData,
  ]);

  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <HeaderNavigation
          navProps={props}
          title="Inserir Conta"
          right={() => (
            <Pressable onPress={saveData}>
              <Check />
            </Pressable>
          )}
        />
      ),
    });
  }, [navigation, saveData]);

  useEffect(() => {
    const get = async () => {
      if (database && parentAccount) {
        let db = await getData();
        const parentCode = parentAccount.split(' - ')[0];
        const suggestion = getCodeSuggestion(parentCode, db);
        setCode(suggestion);
      }
    };

    get();
  }, [parentAccount, database]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 23 }} style={styles.scroll}>
        <DropDown
          label="Conta pai"
          onPress={() =>
            navigation.navigate('ListItems', {
              data: parentAccounts,
              onPress: (param: string) => setParentAccount(param),
            })
          }
          value={parentAccount}
        />
        <Input
          label="Código"
          value={code}
          onChangeText={text => setCode(text)}
        />
        <Input label="Nome" value={name} onChangeText={text => setName(text)} />
        <DropDown
          label="Tipo"
          onPress={() =>
            navigation.navigate('ListItems', {
              data: ['Receita', 'Despesa'],
              onPress: (param: 'Receita' | 'Despesa') => setType(param),
            })
          }
          value={type}
        />
        <DropDown
          label="Aceita lançamentos"
          onPress={() =>
            navigation.navigate('ListItems', {
              data: ['Sim', 'Não'],
              onPress: (param: 'Sim' | 'Não') => setAcceptRelease(param),
            })
          }
          value={acceptRelease}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  scroll: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
