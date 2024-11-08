import React from 'react'
import AppNavigator from './src/navigators/AppNavigator'
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { StatusBar } from 'react-native';
import themeStyles from './src/styles/themeStyles';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE} />
      <AppNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App;