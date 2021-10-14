import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Slider from 'react-native-slider';
import { GLOBAL, SPOTIFY } from './assets/GLOBAL';

const fonts = SPOTIFY

const trackInfo = {
    from: 'PODCAST',
    album: 'One Piece D&D',
    title: 'ONCE PIECE D&D #1 | Shipwrecked',
    coverArt: '',
    length: '172:10',
    playTime: '85:30',
}

// start color # 3a5a69
// end color # 141517

const SpotifyPlayerScreen = () => {
    const [sliderValue, setSliderValue] = useState(0)
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#3a5a69', '#141517']} style={styles.linearGradient}> 
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Entypo name="chevron-thin-down" size={fonts.iconSize1} color={fonts.primaryFontColor} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextTitle}>
                        PLAYING FROM {trackInfo.from}
                    </Text>
                    <Text style={styles.headerTextSubtitle}>
                        {trackInfo.album}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={fonts.iconSize1} color={fonts.primaryFontColor} />
                </TouchableOpacity>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.bodyImageContainer}>
                    <Image style={styles.bodyImage} source={require('./assets/coverArt/player1.jpeg')} />
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.footerTextTitle}>
                        {trackInfo.title}
                    </Text>
                    <Text style={styles.footerTextSubtitle}>
                        {trackInfo.album}
                    </Text>
                </View>
                <View style={styles.footerProgressBarContainer}>
                    <Slider
                        value={sliderValue}
                        onValueChange={(value) => setSliderValue(value)}
                        thumbStyle={{ backgroundColor: fonts.primaryFontColor, height: 12, width: 12, }}
                        minimumTrackTintColor={fonts.primaryFontColor}
                    />
                    <View style={styles.footerTimingContainer}>
                        <Text style={styles.footerTimingText}>
                            {trackInfo.playTime}
                        </Text>
                        <Text style={styles.footerTimingText}>
                            {trackInfo.length}
                        </Text>
                    </View>
                </View>
                <View style={styles.footerIconRow}>
                    <TouchableOpacity>
                        <Ionicons name="md-checkmark-done-outline" size={30} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-back-outline" size={35} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIconRowPlayButton}>
                        <Fontisto name="pause" size={40} color={fonts.backgroundColor} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-forward-outline" size={35} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ios-moon-sharp" size={30} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerIconRow2}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="monitor-speaker" size={25} color={fonts.primaryFontColor} />
                    </TouchableOpacity>
                    <View style={styles.footerIconRow2Side}>
                        <TouchableOpacity>
                            <EvilIcons name="share-google" size={30} color={fonts.primaryFontColor} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="playlist-play" size={30} color={fonts.primaryFontColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </LinearGradient>
        </View>
    )
}
export default SpotifyPlayerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fonts.backgroundColor,
    },
    linearGradient: {
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        zIndex: -1, 
    },
    headerContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerTextContainer: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextTitle: {
        color: fonts.primaryFontColor,
        fontSize: fonts.textSize5,
    },
    headerTextSubtitle: {
        color: fonts.primaryFontColor,
        fontWeight: 'bold',
        fontSize: fonts.textSize4
    },
    bodyContainer: {
        flex: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyImageContainer: {
        width: '90%',
        height: '80%',
        overflow: 'hidden',
    },
    bodyImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    footerContainer: {
        flex: 16,
        paddingHorizontal: 30,
        justifyContent: 'space-around',
    },
    footerTextTitle: {
        fontSize: fonts.textSize2,
        color: fonts.primaryFontColor,
        fontWeight: 'bold',
    },
    footerTextSubtitle: {
        fontSize: fonts.textSize3,
        color: fonts.primaryFontColor,
    },
    footerTimingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerTimingText: {
        color: fonts.primaryFontColor,
        marginTop: -10
    },
    footerIconRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerIconRowPlayButton: {
        backgroundColor: fonts.backgroundColorInverse,
        height: 70,
        width: 'auto',
        aspectRatio: 1 / 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerIconRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    footerIconRow2Side: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%',
    },
})
