import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { LogBox } from 'react-native';

import { Modal } from './src/components/Modal';

import { Routes } from './src/routes';
import { initialData } from './src/services/data';
import { getData, storeData } from './src/services/database';
import { DatabaseContext, ModalContext } from './src/utils/context';
import { DatabaseProps } from './src/utils/types';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  const [data, setData] = useState<DatabaseProps[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteCode, setDeleteCode] = useState<undefined | DatabaseProps>(
    undefined,
  );

  const retrieveData = useCallback(async () => {
    // await storeData(null); // Uncomment this to reset database to the initial state
    let tmp = await getData();
    if (!tmp) {
      await storeData(initialData);
      tmp = initialData;
    }
    setData(tmp);
  }, []);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return (
    <DatabaseContext.Provider value={[data, setData]}>
      <ModalContext.Provider
        value={[showModal, setShowModal, deleteCode, setDeleteCode]}>
        <StatusBar barStyle="light-content" />
        <Routes />
        <Modal />
        <Toast />
      </ModalContext.Provider>
    </DatabaseContext.Provider>
  );
};

export default App;
