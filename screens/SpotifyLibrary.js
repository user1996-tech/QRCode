import React from 'react'; 
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import TabBarNavSpotify from './assets/TabBarNavSpotify';
import { GLOBAL } from './assets/GLOBAL';

const SpotifyLibrary = () => {
    return( 
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>Spotify Search</Text>
            </View>
            <TabBarNavSpotify />
        </View>
    )
}
export default SpotifyLibrary;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    contentContainer: {
        height: GLOBAL.contentHeight, 
        width: '100%', 
    }
})