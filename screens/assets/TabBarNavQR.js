import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GLOBAL } from './GLOBAL';

const TabBarNavQR = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const activeColor = 'blue'
    const tabs = [
        {
            id: 0,
            name: 'QRScanScreen',
            label: 'QR Scan',
            icon: () => (<Ionicons name="md-scan" size={20} color="black" />),
            goto: 'QRScanScreen',
            activeStyle: {},
            navGroup: ["QRScanScreen"],
        },
        {
            id: 1,
            name: 'QRCreateScreen',
            label: 'QR Create',
            icon: () => (<Ionicons name="qr-code-outline" size={20} color="black" />),
            goto: 'QRCreateScreen',
            activeStyle: {},
            navGroup: ["QRCreateScreen"],
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
                                <View style={styles.tabLabelContainer}>
                                    <Text style={styles.tabLabelText}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>

                        )

                    }
                )
            }
        </View>
    )
}
export default TabBarNavQR;

const styles = StyleSheet.create({
    tabBarContainer: {
        height: GLOBAL.tabBarHeight,
        width: GLOBAL.tabBarWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
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
    tabLabelContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabelText: {
        fontSize: 15,
        fontWeight: 'bold',
    },

})