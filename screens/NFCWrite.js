import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
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
  const [titleDrawer, setTitleDrawer] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [writeTagOptions, setWriteTagOptions] = useOutlet('writeTagOptions')
  const [prompt, setPrompt] = useOutlet('androidPrompt')

  const slideAnimationX = useSharedValue(0)
  const slideAnimationOpacity = useSharedValue(0)
  const slideAnimation = useAnimatedStyle(() => {
    return {
      opacity: slideAnimationOpacity.value,
    }
  })
  const slideAnimation1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnimationX.value }],
      opacity: slideAnimationOpacity.value,
    }
  })
  const slideAnimation2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnimationX.value + 20 }],
      opacity: slideAnimationOpacity.value,
    }
  })
  const toggleSlide = (titleValue = '') => {
    if (slideAnimationX.value == 0) {
      setTitleDrawer(true)
      slideAnimationX.value = withTiming(20, { duration: 250 })
      slideAnimationOpacity.value = withTiming(1, { duration: 250 })
    } else {
      setTitleDrawer(false)
      slideAnimationX.value = withTiming(0, { duratiom: 250 })
      slideAnimationOpacity.value = withTiming(0, { duration: 250 })
    }
    setTitle(titleValue)
  }

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
        <View style={{ flexDirection: 'row', flex: 1, }}>
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
                  if (item.name == 'URL') {
                    setTitle('https://')
                  } else {
                    setTitle(item.prefix[0])
                  }
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
  const returnTitleOptions = () => {
    if (record != '' && type != '') {
      if (type == 'URL') {
        if (titleDrawer) {
          return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', paddingLeft: 20, }}>
              <Animated.View style={slideAnimation}>
                <TouchableOpacity style={{ backgroundColor: 'grey', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}
                  onPress={() => {
                    toggleSlide('https://')
                  }}
                >
                  <Text>https://</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={slideAnimation1}>
                <TouchableOpacity style={{ backgroundColor: 'grey', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}
                  onPress={() => {
                    toggleSlide('http://')
                  }}
                >
                  <Text>http://</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={slideAnimation2}>
                <TouchableOpacity style={{ backgroundColor: 'grey', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}
                  onPress={() => {
                    toggleSlide('---')
                  }}
                >
                  <Text>- - -</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )
        } else {
          return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', paddingLeft: 20, }}>
              <TouchableOpacity style={{ backgroundColor: 'grey', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}
                onPress={() => {
                  toggleSlide()
                }}
              >
                <Text>{title}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      } else {
        return (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', paddingLeft: 20, }}>
            <View style={{ backgroundColor: 'grey', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, }}>
              <Text>{title}</Text>
            </View>
          </View>
        )
      }


    } else {
      return (
        <Text></Text>
      )
    }
  }
  const returnInputFields = () => {
    if (record != '' && type != '') {
      return (
        <View style={{ flex: 1, marginVertical: 20, }}>
          <TextInput textAlignVertical={'top'} multiline={true} style={{ flex: 2, borderColor: 'black', borderWidth: 1, marginVertical: 10, marginHorizontal: 20, }}
            onChangeText={(text) => {
              setTextValue(text)
            }}></TextInput>
        </View>
      )
    } else {
      return (
        <Text></Text>
      )
    }
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
              <View style={{ width: '100%', height: 50, marginTop: 10, }}>
                {
                  returnTypeOptions()
                }
              </View>
            </View>
            <View style={{ flex: 2, }}>
              <View style={{ flex: 2, }}>
                {
                  returnTitleOptions()
                }
              </View>
              <View style={{ flex: 3, }}>
                {
                  returnInputFields()
                }
              </View>

            </View>


          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.buttonTO} onPress={() => {
              if (record != '' && type != '' && title != '') {
                setPrompt({ visible: true, message: 'Scan to write' })
                setWriteTagOptions({ type: type, title: title, textInputValue: textValue })
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