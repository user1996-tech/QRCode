import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GLOBAL } from './GLOBAL';

const TabBarNavSpotify = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const activeColor = 'transparent'
    const tabs = [
        {
            id: 0,
            name: 'SpotifyHome',
            icon: () => (<Ionicons name="ios-home-outline" size={20} color="black" />),
            goto: 'Spotify',
            activeStyle: {},
            navGroup: ["Spotify"],
        },
        {
            id: 1,
            name: 'SpotifySearch',
            icon: () => (<Ionicons name="ios-search-outline" size={20} color="black" />),
            goto: 'SpotifySearch',
            activeStyle: {},
            navGroup: ["SpotifySearch"],
        },
        {
            id: 2,
            name: 'SpotifyLibrary',
            icon: () => (<Ionicons name="ios-library" size={20} color="black" />),
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
                        if (item.navGroup.includes(route.name)) {
                            item.activeStyle.backgroundColor = activeColor
                        }
                        return (
                            <TouchableOpacity key={item.id} style={[styles.tabContainer, item.activeStyle]}
                                onPress={() => { navigation.navigate(item.goto) }}
                            >
                                <View style={styles.tabIconContainer}>
                                    {item.icon()}
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
        height: GLOBAL.tabBarHeight,
        width: GLOBAL.tabBarWidth,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        opacity: 0.5,
    },
    tabContainer: {
        flex: 1,
        borderColor: 'black',
    },
    tabIconContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
})