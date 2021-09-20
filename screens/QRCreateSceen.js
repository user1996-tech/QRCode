import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import TabBarNavQR from './assets/TabBarNavQR';
import DrawerNav from './assets/DrawerNav';
import { GLOBAL } from './assets/GLOBAL';

const QRCreateScreen = () => {
  const [TIValue, setTIValue] = useState('')
  const [QRStatus, setQRStatus] = useState(false)
  const [QRValue, setQRValue] = useState('')
  const generateFunction = (textValue) => {
    if (textValue == '') {
      console.log('empty')
    } else {
      setQRStatus(true)
      setQRValue(TIValue)
    }
  }
  return (
    <DrawerNav content={
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            {
              !QRStatus ?
                (
                  <Image
                    style={styles.questionMarkQR}
                    source={require('./assets/questionMark.jpg')}
                  />
                ) :
                (
                  <QRCode
                    value={QRValue}
                    size={250}
                  />
                )
            }

          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabelText}>Value : </Text>
              </View>
              <View style={styles.inputTIContainer}>
                <TextInput style={styles.inputTI} multiline={true} onChangeText={(text) => setTIValue(text)} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonTO} onPress={() => generateFunction(TIValue)}>
                <Text style={styles.buttonText}>Generate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TabBarNavQR />
      </View>
    } />
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
    alignItems: 'center',
    justifyContent: 'center',
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
  questionMarkQR: {
    height: 250,
    width: 250,
  },
})