import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'rn-nex-ui/src';
import { Home } from './src/screens/Home';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
