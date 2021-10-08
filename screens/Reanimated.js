import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedProps, interpolate, withTiming, withSpring } from 'react-native-reanimated';
import DrawerNav from './assets/DrawerNav';

const Reanimated = () => {
    const progress = useSharedValue(0)
    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: progress.value }]
        }
    })

    const slideItem1X = useSharedValue(0)
    const slideItem1Opacity = useSharedValue(0)
    const slideAnimatedStyle1 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: slideItem1X.value }],
            opacity: slideItem1Opacity.value
        }
    })

    const slideAnimatedStyle2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: slideItem1X.value + 50 }],
            opacity: slideItem1Opacity.value
        }
    })

    const toggleSlide = () => {
        if (slideItem1X.value == 0) {
            slideItem1X.value = withTiming(50, { duration: 250 })
            slideItem1Opacity.value = withTiming(1, { duration: 250 })
        } else {
            slideItem1X.value = withTiming(0, { duration: 250 })
            slideItem1Opacity.value = withTiming(0, { duration: 250 })
        }
    }


    return (
        <DrawerNav content={
            <View style={styles.container}>
                <View style={styles.testContainer}>
                    <Animated.View style={[styles.testBox, reanimatedStyle]}>

                    </Animated.View>
                </View>
                <View style={styles.mainButtonContainer}>
                    <TouchableOpacity style={styles.mainButton}
                        onPress={() => {
                            if (progress.value == 0) {
                                progress.value = withTiming(-50, { duration: 250 })
                            } else {
                                progress.value = withTiming(0, { duration: 250 })
                            }
                        }}
                    >
                        <Text>Press</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainButtonContainer}>
                    <TouchableOpacity style={styles.mainButton}
                        onPress={() => {
                            toggleSlide()
                            // if (slideItem1X.value == 0) {
                                // slideItem1X.value = withTiming(50, { duration: 250 })
                                // slideItem1Opacity.value = withTiming(1, { duration: 250 })
                            // } else {
                                // slideItem1X.value = withTiming(0, { duration: 250 })
                                // slideItem1Opacity.value = withTiming(0, { duration: 250 })
                            // }
                        }}
                    >
                        <Text>Press</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View>
                        <TouchableOpacity style={styles.TOContainer}>
                            <Text>https://</Text>
                        </TouchableOpacity>
                    </View>

                    <Animated.View style={slideAnimatedStyle1}>
                        <TouchableOpacity style={[styles.TOContainer]}>
                            <Text>http://</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={slideAnimatedStyle2}>
                        <TouchableOpacity style={styles.TOContainer}>
                            <Text>- - -</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </View>
        } />
    )
}
export default Reanimated;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    testContainer: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    testBox: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    contentContainer: {
        width: '100%',
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 40,

    },
    mainButtonContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    mainButton: {
        backgroundColor: '#4040b2',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 5,
    },
    TOContainer: {
        backgroundColor: '#4aefcb',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 5,
    },
})