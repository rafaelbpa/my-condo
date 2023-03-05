import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Pressable } from 'react-native';

import MaisIcon from '../src/assets/images/mais.svg';
import { ListScreen } from './screens/ListScreen';
import { HeaderNavigation } from './components/HeaderNavigation';
import { SearchInput } from './components/SearchInput';
import { InsertScreen } from './screens/InsertScreen';
import { ListItems } from './components/ListItems';
import { EditScreen } from './screens/EditScreen';
import { DatabaseProps } from './utils/types';

export type RootStackParamList = {
  List: undefined;
  Insert: any;
  Edit: { data: DatabaseProps };
  Test: undefined;
  ListItems: { data: string[]; onPress: (param: string) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{
            header: props => (
              <HeaderNavigation
                navProps={props}
                title="Plano de contas"
                right={() => (
                  <Pressable
                    onPress={() => props.navigation.navigate('Insert')}>
                    <MaisIcon />
                  </Pressable>
                )}
                bottom={() => <SearchInput style={{ marginTop: 16 }} />}
              />
            ),
          }}
        />
        <Stack.Screen name="Insert" component={InsertScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen
          name="ListItems"
          component={ListItems}
          options={{
            header: props => (
              <HeaderNavigation navProps={props} title="Selecionar item" />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
