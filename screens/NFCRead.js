import './assets/AppOutlets';
import React, { useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { GLOBAL } from './assets/GLOBAL';
import DrawerNav from './assets/DrawerNav';
import TabBarNavNFC from './assets/TabBarNavNFC';
import Prompt from './assets/Prompt';
import NfcProxy from './assets/NfcProxy';
import { useOutlet, getOutlet } from 'reconnect.js';
import Feather from 'react-native-vector-icons/Feather';
import { Ndef } from 'react-native-nfc-manager';
import { State, PanGestureHandler } from 'react-native-gesture-handler';


const NFCRead = () => {
  const [prompt, setPrompt] = useOutlet('androidPrompt')
  const [tag, setTag] = useOutlet('tag')

  const TNF_MAP = {
    EMPTY: 0x0,
    WELL_KNOWN: 0x01,
    MIME_MEDIA: 0x02,
    ABSOLUTE_URI: 0x03,
    EXTERNAL_TYPE: 0x04,
    UNKNOWN: 0x05,
    UNCHANGED: 0x06,
    RESERVED: 0x07,
  };

  const RTD_MAP = {
    TEXT: 'T', // [0x54]
    URI: 'U', // [0x55]
    SMART_POSTER: 'Sp', // [0x53, 0x70]
    ALTERNATIVE_CARRIER: 'ac', //[0x61, 0x63]
    HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
    HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
    HANDOVER_SELECT: 'Hs', // [0x48, 0x73]
  };

  const displayOutput = (input) => {
    const openURL = async (uri) => {
      try{
        Linking.openURL(uri)
      }catch(ex){
        console.log(ex)
      }
    }

    const id = () => {
      return (input.id)
    }
    const technologies = () => {
      let result = ''
      const length = input.techTypes.length
      for (let i = 0; i < length; i++) {
        result += input.techTypes[0] + ' , '
      }
      return (result)
    }
    const ndef = () => {
      let tnf = input.ndefMessage[0].tnf
      for (let name in TNF_MAP) {
        if (tnf == TNF_MAP[name]) {
          tnf = name
        }
      }


      let rtd = String.fromCharCode(input.ndefMessage[0].type)
      for (let name in RTD_MAP) {
        if (rtd == RTD_MAP[name]) {
          rtd = name
        }
      }

      const payload = () => {
        let payload = ''
        if (rtd == "TEXT") {
          payload = Ndef.text.decodePayload(input.ndefMessage[0].payload)
        } else if (rtd == "URI") {
          payload = Ndef.uri.decodePayload(input.ndefMessage[0].payload)
        }

        if (rtd == "URI") {
          return(
            <TouchableOpacity onPress={ () => {
              openURL(payload)
            }}>
              <Text style={{ textDecorationLine: 'underline'}}>{payload}</Text>
            </TouchableOpacity>
          )
        }else{
          return(
            <Text>
              {payload}
            </Text>
          )
        }

      }

      return (
        <View>
          <Text>TNF: {tnf}</Text>
          <Text>RTD: {rtd}</Text>
          {
            payload()
          }
        </View>
      )
    }
    const tagObject = JSON.stringify(input)
    if (input == '') {
      return (<Text>Nothing</Text>)
    } else {
      return (

        <View style={{ flex: 1, }}>
          <View style={{ flex: 1, }}>
            <Text>UID</Text>
            <View style={{ marginLeft: 20, }}>
              <Text>{id()}</Text>
            </View>
          </View>
          <View style={{ flex: 1, }}>
            <Text>Technologies</Text>
            <View style={{ marginLeft: 20, }}>
              <Text>{technologies()}</Text>
            </View>
          </View>
          <View style={{ flex: 2, }}>
            <Text>NDEF</Text>
            <View style={{ marginLeft: 20, }}>
              <Text>{ndef()}</Text>
            </View>
          </View>
          <View style={{ flex: 3, }}>
            <Text>Tag Object</Text>
            <View style={{ marginLeft: 20, }}>
              <Text>{tagObject}</Text>
            </View>
          </View>
        </View>
      )
    }

  }


  useEffect(() => {
    NfcProxy.init()
  }, [])


  return (
    <DrawerNav content={
      <View style={styles.container}>
        <Prompt />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              NFC Read
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            {
              displayOutput(tag.data)
            }
            {
              tag.data == "" ?
                (
                  <Text></Text>
                ) :
                (
                  <TouchableOpacity style={styles.closeButton} onPress={() => setTag({ data: '' })}>
                    <Feather name={"x-square"} size={20} color="red" />
                  </TouchableOpacity>

                )
            }
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonTO} onPress={() => {
              setPrompt({
                visible: true,
                message: 'Reading'
              })
              NfcProxy.read()
            }}>
              <Text style={styles.buttonText}>
                Read
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TabBarNavNFC />
      </View>
    }
    />
  )
}
export default NFCRead;

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
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'blue',

  },
  bodyContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',

  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTO: {
    backgroundColor: '#78bbe2',
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
  },
  closeButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
})
