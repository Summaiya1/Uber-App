import { StatusBar } from 'expo-status-bar';
import React ,  { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor } from './src/store';
import MainNavigator from './src/config/navigation';


export default function App() {

  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <MainNavigator/>
    </PersistGate>
    </Provider>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#fff'
  },
});

