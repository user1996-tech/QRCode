import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import TabBar from './assets/TabBar';
import { GLOBAL } from './assets/GLOBAL';

const NFCScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>NFCScreen</Text>
      </View>
      <TabBar />      
    </View>
  )
}
export default NFCScreen;

const styles = StyleSheet.create({
  container: {
    height: GLOBAL.screenHeight-GLOBAL.statusBarHeight,
    width: GLOBAL.screenWidth,
    position: 'absolute',
    bottom: 0,
  },
  contentContainer: {
    height: GLOBAL.contentHeight-GLOBAL.statusBarHeight,
    width: GLOBAL.contentWidth,
  }
})