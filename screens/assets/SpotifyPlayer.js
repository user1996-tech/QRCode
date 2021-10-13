import React from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { GLOBAL, SPOTIFY } from './GLOBAL';

const fonts = SPOTIFY

const SpotifyPlayer = () => {
    const progressValue = useSharedValue(0)
    const progressStyle = useAnimatedStyle(() => {
        return {
            width: progressValue.value + '%'
        }
    })
    return (
        <TouchableOpacity style={styles.playerContainer}>
            <View style={styles.playerTopContainer}>
                <View style={styles.playerImageContainer}>
                    <Image source={require('./coverArt/mixes3.jpg')} style={styles.playerImage} />
                </View>
                <View style={styles.playerTextContainer}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={styles.playerTextTitle}
                    >
                        Lemonade (feat Gunna, Don Toliver & Nav) . Internet Money
                    </Text>
                    <Text style={styles.playerTextSubtitle}>
                        Desktop-JR33KS2
                    </Text>
                </View>
                <View style={styles.playerIconsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            progressValue.value = withTiming(0, { duration: 500 })
                        }}
                    >
                        <MaterialIcons name="computer" size={30} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            progressValue.value = withTiming(50, { duration: 500 })
                        }}
                    >
                        <Entypo name="heart-outlined" size={30} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            progressValue.value = withTiming(100, { duration: 500 })
                        }}
                    >
                        <Entypo name="controller-paus" size={30} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.playerBottomContainer}>
                <Animated.View style={[styles.playerProgressBar, progressStyle]}>

                </Animated.View>
            </View>
        </TouchableOpacity>
    )
}
export default SpotifyPlayer;

const styles = StyleSheet.create({
    playerContainer: {
        position: 'absolute',
        bottom: GLOBAL.spotifyTabBarHeight,
        width: '95%',
        height: GLOBAL.spotifyPlayerHeight,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#41191D',
    },
    playerTopContainer: {
        height: '98%',
        width: '100%',
        flexDirection: 'row',
    },
    playerBottomContainer: {
        height: '2%',
        width: '96%',
        alignSelf: 'center',
    },
    playerProgressBar: {
        backgroundColor: 'white',
        height: '100%',
    },
    playerImageContainer: {
        paddingVertical: 7,
        paddingHorizontal: 7,
        height: '100%',
        width: '19%',
    },
    playerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    playerTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    playerTextTitle: {
        fontWeight: 'bold',
        color: fonts.primaryFontColor
    },
    playerTextSubtitle: {
        color: '#1DD760',
    },
    playerIconsContainer: {
        width: '32%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})