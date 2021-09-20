import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { useOutlet, getOutlet } from 'reconnect.js';
import NfcProxy from './NfcProxy';

const Prompt = () => {
    const [prompt, setPrompt] = useOutlet('androidPrompt')

    return (
        <Modal transparent={true} visible={prompt.visible} onRequestClose={() => NfcProxy.cancelScan()}>
            <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => NfcProxy.cancelScan()}>
                <TouchableOpacity style={styles.contentContainer} activeOpacity={1} >
                    <View style={styles.contentBody}>
                        <Text>{prompt.message}</Text>

                    </View>
                    <View style={styles.contentFooter}>
                        <TouchableOpacity style={styles.cancelTO} onPress={() => NfcProxy.cancelScan()}>
                            <Text style={styles.cancelTOText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </TouchableOpacity>
        </Modal>
    )
}

export default Prompt;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        height: 250,
        width: 250,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentBody: {
        flex: 4,
        justifyContent: 'center',
        alignContent: 'center',

    },
    contentFooter: {
        flex: 1,
    },
    cancelTO: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#78bbe2',

    },

})