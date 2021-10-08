import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { G, Path, ClipPath, Defs, Rect } from 'react-native-svg';

const ArrowIcon = (props) => {
    const status = props.status
    const yValue = props.yValue
    const animationRotate = useSharedValue(0)
    const animationY = useSharedValue(0)
    const animationX = useSharedValue(100)
    const animationRotateTopStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: animationRotate.value + 'deg' }]
        }
    })
    const animationRotateBottomStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: '-' + animationRotate.value + 'deg' }]
        }
    })
    const animationYStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animationY.value }]
        }
    })
    const animationXStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: animationX.value }]
        }
    })



    useEffect(() => {
        if (status) {
            //run pop out animation
            console.log('status TRUE')
            animationRotate.value = withTiming(45, { duration: 250 })
            animationY.value = withTiming(7, { duration: 100 })
            animationX.value = withTiming(0, { duration: 100 })
        } else {
            //run retreat animation
            console.log('status FALSE')
            animationRotate.value = withTiming(0, { duration: 100 })
            animationY.value = withTiming(0, { duration: 100 })
            animationX.value = withTiming(100, { duration: 100 })
        }
    }, [status, yValue])
    return (
        <View style={styles.container}>
            <Animated.View style={animationXStyle}>
                <Animated.View style={animationYStyle}>
                    <Animated.View style={animationRotateTopStyle}>
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
                <Animated.View style={animationRotateBottomStyle}>
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
    )
}
export default ArrowIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
})