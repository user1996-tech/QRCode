import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import DrawerNav from './assets/DrawerNav';
import CompassHeading from 'react-native-compass-heading';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import CompassOuter from './assets/CompassOuter';

const Compass = () => {
    const [compassHeading, setCompassHeading] = useState(0)
    const compassHeadingRef = useRef()
    const compassAnimation = useSharedValue(0)
    const compassAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: '-' + compassAnimation.value + 'deg' }]
        }
    })
    console.log('render')
    useEffect(() => {
        CompassHeading.start(1, (res) => {
            // setCompassHeading(res.heading)
            compassAnimation.value = res.heading
            console.log(res.heading)

        })
        return () => {
            CompassHeading.stop()
        }
    }, [])
    return (
        <DrawerNav content={
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text>Compass</Text>
                    <Text>Heading: {compassAnimation.value}</Text>
                </View>
                <View style={styles.middleContainer}>
                    {/* <Animated.View style={compassAnimationStyle}> */}
                    {/* <Image style={styles.image} source={require('./assets/compass.png')} */}
                    {/* // /> */}
                    {/* </Animated.View> */}
                    <Animated.View style={compassAnimationStyle}>
                        <CompassOuter />
                    </Animated.View>
                </View>
                <View style={styles.bottomContainer}>

                </View>
            </View>
        }
        />
    )
}
export default Compass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
        width: 250,
    },
})