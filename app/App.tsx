import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from '../nav/navStack';
import ApiClient from '../request';
import {API_KEY} from '../constant/index';
import {ActivityIndicator, View} from 'react-native';

const config = {
  screens: {
    Profile: 'profile',
    Home: '',
  },
};

const linking = {
  prefixes: [
    'https://home.com',
    'home://',
    'https://profile.com',
    'profile://',
  ],
  config,
};
const App = () => {
  const [isAppInitialized, setAppInitialized] = React.useState<boolean>(false);
  React.useEffect(() => {
    ApiClient.initialize(API_KEY);
    setTimeout(() => {
      setAppInitialized(true);
    }, 100);
  }, []);
  return (
    <NavigationContainer linking={linking}>
      {isAppInitialized ? (
        <NavStack />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;
