import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Test = () => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#3a5a69', '#141517']} style={{width: '100%', height: '100%', position: 'absolute', zIndex: -1 }}>
                <Text style={{ color: 'white'}}>Test</Text>
            </LinearGradient>
        </View>
    )
}
export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})