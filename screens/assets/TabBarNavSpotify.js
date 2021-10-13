import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getOutlet } from 'reconnect.js';
import { GLOBAL, SPOTIFY } from './GLOBAL';

const fonts = SPOTIFY

const TabBarNavSpotify = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const tabs = [
        {
            id: 0,
            name: 'SpotifyHome',
            label: 'Home',
            icon: () => (<Ionicons name="ios-home-outline" size={22} color={fonts.primaryFontColor} />),
            activeIcon: () => (<Ionicons name="ios-home" size={25} color={fonts.primaryFontColor} />),
            goto: 'Spotify',
            activeStyle: {},
            navGroup: ["Spotify"],
        },
        {
            id: 1,
            name: 'SpotifySearch',
            label: 'Search',
            icon: () => (<Ionicons name="ios-search-outline" size={22} color={fonts.primaryFontColor} />),
            activeIcon: () => (<Ionicons name="ios-search-sharp" size={25} color={fonts.primaryFontColor} />),
            goto: 'SpotifySearch',
            activeStyle: {},
            navGroup: ["SpotifySearch"],
        },
        {
            id: 2,
            name: 'SpotifyLibrary',
            label: 'Library',
            icon: () => (<Ionicons name="ios-library-outline" size={22} color={fonts.primaryFontColor} />),
            activeIcon: () => (<Ionicons name="ios-library" size={25} color={fonts.primaryFontColor} />),
            goto: 'SpotifyLibrary',
            activeStyle: {},
            navGroup: ["SpotifyLibrary"],
        },
    ]
    return (
        <View style={styles.tabBarContainer}>
            {
                tabs.map(
                    (item) => {
                        let displayIcon = item.icon
                        if (item.navGroup.includes(route.name)) {
                            displayIcon = item.activeIcon
                        }
                        return (
                            <TouchableOpacity key={item.id} style={[styles.tabContainer, item.activeStyle]}
                                onPress={() => { navigation.navigate(item.goto) }}
                            >
                                <View style={styles.tabIconContainer}>
                                    {displayIcon()}
                                </View>
                                <View style={styles.tabTextContainer}>
                                    <Text style={styles.tabText}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>

                        )

                    }
                )
            }
        </View>
    )
}
export default TabBarNavSpotify;

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute', 
        bottom: 0, 
        zIndex:100, 
        height: GLOBAL.spotifyTabBarHeight,
        width: GLOBAL.spotifyTabBarWidth,
        backgroundColor: fonts.backgroundColor,
        flexDirection: 'row',
        opacity: 0.9,
    },
    tabContainer: {
        flex: 1,
        borderColor: 'black',
    },
    tabIconContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    tabTextContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        color: fonts.primaryFontColor,
    },
})