import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import QRScanScreen from './screens/QRScanScreen';
import QRCreateScreen from './screens/QRCreateSceen';
import NFCScreen from './screens/NFCScreen';
import TabBar from './screens/assets/TabBar';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="QRScanScreen" component={QRScanScreen} options={{ animationEnabled: false }}/>
        <Stack.Screen name="QRCreateScreen" component={QRCreateScreen} options={{ animationEnabled: false }}/>
        <Stack.Screen name="NFCScreen" component={NFCScreen} options={{ animationEnabled: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;