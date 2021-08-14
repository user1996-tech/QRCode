import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import TabBar from './assets/TabBar';
import { GLOBAL } from './assets/GLOBAL';

const QRCreateScreen = () => {
  const [TIValue, setTIValue] = useState('')
  console.log(TIValue)
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.topContainer}>

        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabelText}>Value : </Text>
            </View>
            <View style={styles.inputTIContainer}>
              <TextInput style={styles.inputTI} multiline={true}/>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonTO} onChange={(text) => {setTIValue(text); console.log(text)}}>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TabBar />
    </View>
  )
}
export default QRCreateScreen;

const styles = StyleSheet.create({
  container: {
    height: GLOBAL.screenHeight - GLOBAL.statusBarHeight,
    width: GLOBAL.screenWidth,
    position: 'absolute',
    bottom: 0,
  },
  contentContainer: {
    height: GLOBAL.contentHeight - GLOBAL.statusBarHeight,
    width: GLOBAL.contentWidth,
  },
  topContainer: {
    flex: 5,
    overflow: 'hidden',
  },
  bottomContainer: {
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'row', 
  },
  inputLabelContainer: {
    flex: 1, 
    alignItems: 'center',
    paddingTop: 15,
  },
  inputLabelText: {
    
  },
  inputTIContainer: {
    flex: 3,
  },
  inputTI: {
    flex: 1, 
    textAlignVertical: 'top',
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: 'grey', 
    borderWidth: 1, 
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  buttonTO: {
    backgroundColor: '#4287f5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
})