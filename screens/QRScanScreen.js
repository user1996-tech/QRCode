import React, { useState, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import TabBar from './assets/TabBar';
import { GLOBAL } from './assets/GLOBAL';

const QRScanScreen = () => {
    const scanner = useRef(null)
    const [scanStatus, setScanStatus] = useState(false)
    const [scanResult, setScanResult] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.topContainer}>
                    <QRCodeScanner
                        ref={scanner}
                        onRead={(e) => {
                            setScanResult(e.data)
                            setScanStatus(true)
                            // Linking.openURL(e.data).catch(err =>
                            // console.error('An error occured', err)
                            // );
                        }}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    {
                        !scanStatus ?
                            (<View style={styles.scanningContainer}>
                                <Text>Scanning ...</Text>
                            </View>) :
                            (<View style={styles.scanningContainer}>
                                <View style={styles.resultContainer}>
                                    <Text>{scanResult}</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => { scanner.current.reactivate(); setScanStatus(false) }}>
                                        <Text style={styles.buttonText}>Re-Scan</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)

                    }
                </View>
            </View>
            <TabBar />
        </View>
    )
}
export default QRScanScreen;

const styles = StyleSheet.create({
    container: {
        height: GLOBAL.screenHeight, 
        width: GLOBAL.screenWidth, 
        position: 'absolute', 
        bottom: 0, 
    },
    contentContainer: {
        height: GLOBAL.contentHeight, 
        width: GLOBAL.contentWidth,
    }, 
    topContainer: {
        flex: 5,
        overflow: 'hidden',
    },
    bottomContainer: {
        flex: 2,
        borderTopWidth: 1,
        borderTopColor: 'grey',
    },
    scanningContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
        backgroundColor: 'blue',
    }
})