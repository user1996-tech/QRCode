import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import TabBarNavNFC from './assets/TabBarNavNFC';
import DrawerNav from './assets/DrawerNav';
import { GLOBAL } from './assets/GLOBAL';
import Prompt from './assets/Prompt';
import NfcProxy from './assets/NfcProxy';
import { useOutlet } from 'reconnect.js';

const NFCWrite = () => {
  const selectOptions = [
    {
      id: '0',
      record: 'Well-Known Records',
      type: [
        {
          name: 'Text',
          prefix: ['Text'],
        },
        {
          name: 'URL',
          prefix: ['https://', 'http://'],
        },
        {
          name: 'Tel',
          prefix: ['tel:'],
        },
        {
          name: 'SMS',
          prefix: ['sms:'],
        },
        {
          name: 'Email',
          prefix: ['mailto:'],
        }
      ]
    },
    {
      id: '1',
      record: 'MIME Media Records',
      type: [
        {
          name: 'WIFI Simple Record',
          prefix: ['nothing']
        },
        {
          name: 'vCard',
          prefix: ['nothing']
        }
      ]
    }
  ]
  const [record, setRecord] = useState('')
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [textValue, setTextValue] = useState('')
  const [writeTagOptions, setWriteTagOptions] = useOutlet('writeTagOptions')
  const [prompt, setPrompt] = useOutlet('androidPrompt')

  const returnRecordOptions = () => {
    const recordOptions = ['Well-Known Records', "MIME Media Records"]
    const activeColor = 'blue'
    const inactiveColor = '#78bbe2'
    let bgColor = ''
    return (
      selectOptions.map((item, index) => {
        if (record == item.record) {
          bgColor = activeColor
        } else {
          bgColor = inactiveColor
        }

        return (
          <TouchableOpacity style={[styles.bodyTO, { backgroundColor: bgColor }]} key={index} onPress={() => {
            setRecord(item.record)
          }}>
            <Text>{item.record}</Text>
          </TouchableOpacity>
        )
      })
    )
  }
  const returnTypeOptions = () => {
    const activeColor = 'blue'
    const inactiveColor = '#78bbe2'
    let bgColor = ''

    if (record != '') {
      const typeList = selectOptions.filter((res) => res.record == record)[0].type

      return (
        <View style={{ flexDirection: 'row', width: '100%', height: 50, marginTop: 10 }}>
          {
            typeList.map((item, index) => {
              if (type == item.name) {
                bgColor = activeColor
              } else {
                bgColor = inactiveColor
              }
              return (
                <TouchableOpacity style={[styles.bodyTO, { backgroundColor: bgColor }]} key={index} onPress={() => {
                  setType(item.name)
                  setTitle(item.name)
                }}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    } else {
      return (
        <Text></Text>
      )
    }


  }

  // const returnInputFields = () => {
  //   let prefix = ''

  //   if (record != '' && type != ''){
  //     const prefixList = selectOptions.filter((res) => res.record == record)[0].type.filter((res) => res.name == type)[0].prefix
  //     console.log(prefixList)
  //     if ( prefixList.length == 1 ){
  //       prefix = prefixList[0]
  //     }else {
  //       prefix = 'something else'
  //     }
  //   }
  //   const returnTitleOptions = () => {
  //     if (type == "URL") {
  //       return (
  //         <TouchableOpacity style={{ backgroundColor: 'grey', marginLeft: 20, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}>
  //           <Text>{prefix}</Text>
  //         </TouchableOpacity>
  //       )

  //     } else if (type != '') {
  //       return (
  //         <View style={{ backgroundColor: 'grey', marginLeft: 20, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}>
  //           <Text>{prefix}</Text>
  //         </View>
  //       )



  //     } else {
  //       return (
  //         <View>
  //         </View>
  //       )
  //     }
  //   }


  //   return (
  //     <View style={{ flex: 1, marginVertical: 20, }}>
  //       <View style={{ flex: 1, marginTop: 20, alignItems: 'flex-start' }}>
  //         {
  //           returnTitleOptions()
  //         }
  //       </View>
  //       <TextInput textAlignVertical={'top'} multiline={true} style={{ flex: 2, borderColor: 'black', borderWidth: 1, marginVertical: 10, marginHorizontal: 20, }}
  //         onChangeText={(text) => {
  //           setTextValue(text)
  //         }}
  //       >

  //       </TextInput>
  //     </View>
  //   )
  // }

  const returnInputFields = () => {
    return(
      <View style={{ flex: 1, marginVertical: 20, }}>
        <View style={{ flex: 1, marginTop: 20, alignItems: 'flex-start', flexDirection: 'row' }}>
          <TouchableOpacity style={{ backgroundColor: 'grey', marginLeft: 20, paddingHorizontal: 20, paddingVertical: 10, borderRadius:5, }}>
            <Text>https://</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ backgroundColor: 'grey', marginLeft: 20, paddingHorizontal: 20, paddingVertical: 10, borderRadius:5, }}>
            <Text>http://</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: 'grey', marginLeft: 20, paddingHorizontal: 20, paddingVertical: 10, borderRadius:5, }}>
            <Text>- - -</Text>
          </TouchableOpacity>

        </View>
        <TextInput textAlignVertical={'top'} multiline={true} style={{ flex: 2, borderColor: 'black', borderWidth: 1, marginVertical: 10, marginHorizontal: 20, }}
        onChangeText={(text) => {
          setTextValue(text)
        }}></TextInput>
      </View>
    )
  }


  return (
    <DrawerNav content={
      <View style={styles.container}>
        <Prompt />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              NFC Write
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={{ flex: 1, }}>
              <View style={{ flexDirection: 'row', width: '100%', height: 50, marginTop: 10 }}>
                {
                  returnRecordOptions()
                }
              </View>
              <View>
                {
                  returnTypeOptions()
                }
              </View>
            </View>
            <View style={{ flex: 2, }}>
              {
                returnInputFields()
              }
            </View>


          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.buttonTO} onPress={() => {
              if (record != '' && type != '') {
                setPrompt({ visible: true, message: 'Scan to write' })
                setWriteTagOptions({ type: type, textInputValue: textValue })
                NfcProxy.write()
              } else {
                console.log('do nothing')
              }
            }}>
              <Text>Write</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TabBarNavNFC />
      </View>
    }
    />
  )
}
export default NFCWrite;

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
    borderWidth: 1,
    borderColor: 'black',
  },
  bodyTO: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  footerContainer: {
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
})