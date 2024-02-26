import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from './components/Button';
import FirstModule from './modules/FirstModule';
import SecondModule from './modules/SecondModule';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showLocalModule, setShowLocalModule] = React.useState<boolean>(false);
  const [showRemoteModule, setShowRemoteModule] =
    React.useState<boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {showLocalModule ? (
          <FirstModule />
        ) : (
          <Button
            title="Show Local Module"
            onPress={() => setShowLocalModule(true)}
          />
        )}
        {showRemoteModule ? (
          <SecondModule />
        ) : (
          <Button
            title="Show Second Remote Module"
            onPress={() => setShowRemoteModule(true)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
