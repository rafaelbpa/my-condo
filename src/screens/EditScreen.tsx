import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderNavigation } from '../components/HeaderNavigation';

import Check from '../assets/images/check.svg';
import { DropDown } from '../components/DropDown';
import { Input } from '../components/Input';
import { colors } from '../colors';
import { getParentAccount } from '../utils/helpers';
import { DatabaseContext } from '../utils/context';

export const EditScreen = ({ navigation, route }): JSX.Element => {
  const { data } = route.params;
  const [database] = useContext(DatabaseContext);

  const [parentAccount, setParentAccount] = useState('');
  const [code, setCode] = useState(data.code);
  const [name, setName] = useState(data.name);
  const [type] = useState<'Receita' | 'Despesa'>(data.type);
  const [acceptRelease] = useState<'Sim' | 'Não'>(data.acceptReleases);

  useEffect(() => {
    if (!database) {
      return;
    }
    const parent = getParentAccount(data.code, database);
    setParentAccount(parent);
  }, [data.code, database]);

  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <HeaderNavigation
          navProps={props}
          title="Editar Conta"
          right={() => (
            <Pressable onPress={() => {}}>
              <Check />
            </Pressable>
          )}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 23 }} style={styles.scroll}>
        <DropDown label="Conta pai" onPress={() => {}} value={parentAccount} />
        <Input
          label="Código"
          value={code}
          onChangeText={text => setCode(text)}
        />
        <Input label="Nome" value={name} onChangeText={text => setName(text)} />
        <DropDown label="Tipo" onPress={() => {}} value={type} />
        <DropDown
          label="Aceita lançamentos"
          onPress={() => {}}
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
