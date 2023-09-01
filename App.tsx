import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store/index';
import {loadTasksAsync, saveTasksAsync} from './src/redux/slices/taskSlice';
import Toast from 'react-native-toast-message';
import Routes from './src/navigation/Routes';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
const App = () => {
  useEffect(() => {
    store.dispatch(loadTasksAsync());
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const tasks = store.getState().tasks;
      store.dispatch(saveTasksAsync(tasks));
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;
