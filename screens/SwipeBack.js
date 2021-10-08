import React, { useRef, useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import DrawerNav from './assets/DrawerNav';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withDelay } from 'react-native-reanimated';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import ArrowIcon from './assets/ArrowIcon';

const SwipeBack = () => {
  const [arrowStatus, setArrowStatus] = useState(false)

  const animationX = useSharedValue(100)
  const animationY = useSharedValue(100)
  const animationTotal = useSharedValue(0)
  const animationRotation = useSharedValue(0)
  const animationRotation2 = useSharedValue(0)
  const animationTop = useSharedValue(0)
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: animationRotation.value + 'deg' }]
    }
  })

  const animationStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate1 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: animationRotation.value + 'deg' }]
    }
  })

  const animationStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate2 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: '-' + animationRotation.value + 'deg' }]
    }
  })

  const animationStyle30 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate30 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: animationRotation.value + 'deg' }]
    }
  })
  const animationStyleY30 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animationY.value }]
    }
  })
  const animationStyle31 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate31 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: '-' + animationRotation.value + 'deg' }]
    }
  })

  const animationStyleTotal4 = useAnimatedStyle(() => {
    return {
      top: animationTotal.value
    }
  })
  const animationStyle40 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate40 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: animationRotation.value + 'deg' }]
    }
  })
  const animationStyleY40 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animationY.value }]
    }
  })
  const animationStyle41 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animationX.value }],

    }
  })
  const animationStyleRotate41 = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: '-' + animationRotation.value + 'deg' }]
    }
  })

  const animationTopStyle = useAnimatedStyle(() => {
    return { 
      top: animationTop.value
    }
  })


  const animationReset = () => {
    animationX.value = withTiming(100, { duration: 200 })
    animationY.value = withTiming(0, { duration: 200 })
    animationRotation.value = withTiming(0, { duration: 100 })
    setArrowStatus(false)
  }


  const gestureRef = useRef(null)
  const yValueRef = useRef(null)

  const gestureEvent = (event) => {
    animationTotal.value = event.nativeEvent.y
    animationTop.value = event.nativeEvent.y
    yValueRef.current = event.nativeEvent.y
    if (event.nativeEvent.translationX > 0) {
      gestureRef.current = "RIGHT"
    } else {
      gestureRef.current = "LEFT"
    }
  }

  const handlerStateChange = (event) => {
    if (event.nativeEvent.state == State.ACTIVE) {
      if (gestureRef.current == "LEFT") {
        console.log("COMMIT LEFT")
        animationX.value = withSpring(0)
        animationRotation.value = withDelay(100, withSpring(40, { restSpeedThreshold: 100, mass: 1, stiffness: 200 }, Vibration.vibrate(20)))
        animationRotation2.value = withDelay(90, withSpring(-40, { restSpeedThreshold: 100, mass: 1, stiffness: 200 }))
        animationY.value = withTiming(7, { duration: 100 })
        setArrowStatus(true)
      }
    } else if (event.nativeEvent.oldState == State.ACTIVE) {
      console.log("commit END")
      const dragthreshold = 100
      const dragDistance = Math.abs(event.nativeEvent.x)
      const direction = gestureRef.current
      if (dragDistance > dragthreshold) {
        console.log('commit Back')
      } else {
        animationReset()
      }

    }

  }

  const vibrateTest = () => {
    Vibration.vibrate(30)
  }

  return (
    <DrawerNav content={
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text>Left</Text>
        </View>
        <View style={styles.containerMiddle}>
          <Text>Middle</Text>
          <TouchableOpacity style={styles.TOstyle}
            onPress={() =>
              animationReset()
            }
          >
            <Text>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TOstyle}
            onPress={() =>
              vibrateTest()
            }
          >
            <Text>Vibrate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.TOstyle}
            onPress={() => {
              if (arrowStatus) {
                setArrowStatus(false)
              } else {
                setArrowStatus(true)
              }
            }}>
            <Text>Toggle Arrow Status</Text>
          </TouchableOpacity>
        </View>

        <PanGestureHandler
          onGestureEvent={gestureEvent}
          onHandlerStateChange={handlerStateChange}
        >
          <View style={styles.containerRight}>
            <Text>Right</Text>

            <View style={styles.containerAnimation}>
              <View>
              </View>
            </View>

            <View style={styles.containerAnimation}>
              <View>
                <Entypo name="chevron-thin-left" size={20} color="black" />
              </View>
            </View>


            <View style={styles.containerAnimation}>
              <Animated.View style={animationStyle}>
                <Svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path stroke="#000" strokeWidth="3" d="M9.5 4v32" />
                </Svg>
              </Animated.View>
            </View>


            <View style={styles.containerAnimation}>
              <Animated.View style={animationStyleRotate}>
                <Svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path stroke="#000" strokeWidth="3" d="M9.5 4v32" />
                </Svg>
              </Animated.View>
            </View>


            <View style={styles.containerAnimation}>
              <Animated.View style={animationStyle1}>
                <Animated.View style={animationStyleRotate1}>
                  <Svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path stroke="#000" strokeWidth="3" d="M9.5 4v32" />
                  </Svg>
                </Animated.View>
              </Animated.View>
            </View>


            <View style={styles.containerAnimation}>
              <Animated.View style={animationStyle2}>
                <Animated.View style={animationStyleRotate2}>
                  <Svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path stroke="#000" strokeWidth="3" d="M9.5 4v32" />
                  </Svg>
                </Animated.View>
              </Animated.View>
            </View>

            <View style={styles.containerAnimation}>
              <Animated.View style={animationStyle30}>
                <Animated.View style={animationStyleY30}>
                  <Animated.View style={animationStyleRotate30}>
                    <Svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <G id="Mask Group">
                        <G id="Frame 1" clipPath="url(#clip0)">
                          <Path id="Line 1" d="M2 -1L2 20.5" stroke="black" strokeWidth="3" />
                        </G>
                      </G>
                      <Defs>
                        <ClipPath id="clip0">
                          <Rect width="4" height="20" fill="white" transform="matrix(-1 0 0 1 4 0)" />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </Animated.View>
                </Animated.View>
              </Animated.View>

              <Animated.View style={animationStyle31}>
                <Animated.View style={animationStyleRotate31}>
                  <Svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <G id="Mask Group">
                      <G id="Frame 1" clipPath="url(#clip0)">
                        <Path id="Line 1" d="M2 -1L2 20.5" stroke="black" strokeWidth="3" />
                      </G>
                    </G>
                    <Defs>
                      <ClipPath id="clip0">
                        <Rect width="4" height="20" fill="white" transform="matrix(-1 0 0 1 4 0)" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </Animated.View>
              </Animated.View>
            </View>
{/* 
            <Animated.View style={[animationStyleTotal4, { position: 'absolute' }]}>
              <Animated.View style={animationStyle40}>
                <Animated.View style={animationStyleY40}>
                  <Animated.View style={animationStyleRotate40}>
                    <Svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <G id="Mask Group">
                        <G id="Frame 1" clipPath="url(#clip0)">
                          <Path id="Line 1" d="M2 -1L2 20.5" stroke="black" strokeWidth="3" />
                        </G>
                      </G>
                      <Defs>
                        <ClipPath id="clip0">
                          <Rect width="4" height="20" fill="white" transform="matrix(-1 0 0 1 4 0)" />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </Animated.View>
                </Animated.View>
              </Animated.View>

              <Animated.View style={animationStyle41}>
                <Animated.View style={animationStyleRotate41}>
                  <Svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <G id="Mask Group">
                      <G id="Frame 1" clipPath="url(#clip0)">
                        <Path id="Line 1" d="M2 -1L2 20.5" stroke="black" strokeWidth="3" />
                      </G>
                    </G>
                    <Defs>
                      <ClipPath id="clip0">
                        <Rect width="4" height="20" fill="white" transform="matrix(-1 0 0 1 4 0)" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </Animated.View>
              </Animated.View>
            </Animated.View> */}

            <Animated.View style={[animationTopStyle, { position: 'absolute'}]}>
              <ArrowIcon status={arrowStatus} />
            </Animated.View>


          </View>
        </PanGestureHandler>

      </View>

    } />
  )
}
export default SwipeBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerLeft: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  containerRight: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    position: 'relative',

  },
  containerMiddle: {
    width: '60%',
    height: '100%',
    alignItems: 'center',

  },
  TOstyle: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#7583AE',
    marginTop: 20,
  },
  containerAnimation: {
    width: '100%',
    height: 65,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})