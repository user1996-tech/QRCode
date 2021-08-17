import React, {useEffect} from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import TabBar from './assets/TabBar';
import { GLOBAL } from './assets/GLOBAL';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

const NFCScreen = () => {
  const initNfc = async () => {
    await NfcManager.start()
  }

  const readNdef = () => {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null)
    }
    
    return new Promise((resolve) => {
      let tageFound = null;
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        tagFound = tag;
        resolve(tagFound)
        NfcManager.setAlertMessage('NDEF tag Found')
        NfcManager.unregisterTagEvent().catch(() => 0)
      })

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp()
        if(!tagFound){
          resolve()
        }
      })
      NfcManager.registerTagEvent()
    })
  }
  
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