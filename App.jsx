import React from 'react'
import AppNavigator from './src/navigators/AppNavigator'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StatusBar } from 'react-native';
import themeStyles from './src/styles/themeStyles';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={themeStyles.WHITE} />
      <AppNavigator />
    </Provider>
  )
}

export default App;