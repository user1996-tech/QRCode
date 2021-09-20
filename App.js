import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import QRScanScreen from './screens/QRScanScreen';
import QRCreateScreen from './screens/QRCreateSceen';
import NFCRead from './screens/NFCRead';
import NFCWrite from './screens/NFCWrite';
import Bluetooth from './screens/Bluetooth';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,  }}>
        <Stack.Screen name="NFCRead" component={NFCRead} options={{ animationEnabled: false }} />
        <Stack.Screen name="NFCWrite" component={NFCWrite} options={{ animationEnabled: false }} />
        <Stack.Screen name="Bluetooth" component={Bluetooth}  />
        <Stack.Screen name="QRScanScreen" component={QRScanScreen} options={{ animationEnabled: false }} />
        <Stack.Screen name="QRCreateScreen" component={QRCreateScreen} options={{ animationEnabled: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;