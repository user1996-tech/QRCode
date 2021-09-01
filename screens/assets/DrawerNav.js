import React, { useRef, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GLOBAL } from './GLOBAL';

const dragWidth = GLOBAL.screenWidth * 0.5
const dragThreshold = dragWidth * 0.5

const DrawerContentList = [
    {
        id: "0",
        icon: () => (<Ionicons name="md-scan" size={20} color="black" />),
        label: "QR",
        goto: "QRCreateScreen",
        navGroup: ["QRCreateScreen", "QRScanScreen"],
        activeStyle: {},
    },
    {
        id: "1",
        icon: "",
        label: "Bluetooth",
        goto: "Bluetooth",
        navGroup: ["Bluetooth"],
        activeStyle: {},
    }, 
]

const RenderDrawerItem = (item, navigation, route) => {
    const activeBackgroundColor = '#cecece'
    const nonActiveBackgroundColor = 'white'

    if (item.icon == "") {
        item.icon = () => (<FontAwesome name="question" size={20} color="black" />)
    }

    if (item.navGroup.includes(route.name)) {
        item.activeStyle.backgroundColor = activeBackgroundColor
    } else {
        item.activeStyle.backgroundColor = nonActiveBackgroundColor
    }
    return (
        <TouchableOpacity style={[styles.drawerItem, {backgroundColor: item.activeStyle.backgroundColor}]} onPress={() => navigation.navigate(item.goto)}>
            <View style={styles.drawerItemIconContainer}>
                {
                    item.icon()
                }
            </View>
            <View style={styles.drawerItemLabelContainer}>
                <Text style={styles.drawerItemLabel}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    )
}


const DrawerNav = ({ content }) => {
    const navigation = useNavigation()
    const route = useRoute()
    const scrollViewRef = useRef(0)
    const [drawerState, setDrawerState] = useState(false)
    const gestureEvent = (event) => {
        if (drawerState) {
            scrollViewRef.current.scrollTo({
                x: 0 - event.nativeEvent.translationX, y: 0, animated: true
            })

        } else {
            scrollViewRef.current.scrollTo({
                x: dragWidth - event.nativeEvent.translationX, y: 0, animated: true
            })
        }
    }
    const handlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            if (event.nativeEvent.translationX > dragThreshold) {
                scrollViewRef.current.scrollTo(
                    { x: 1, y: 0, animated: true }
                )
                setDrawerState(true)
            } else {
                scrollViewRef.current.scrollTo(
                    { x: dragWidth, y: 0, animated: true }
                )
                setDrawerState(false)
            }
        }
    }
    return (
        <PanGestureHandler
            onGestureEvent={gestureEvent}
            onHandlerStateChange={handlerStateChange}
        >
            <ScrollView
                style={{ flex: 1, }}
                horizontal={true}
                contentOffset={{ x: dragWidth, y: 0 }}
                ref={scrollViewRef}
            >
                <SafeAreaView style={styles.screen2}>
                    <FlatList
                        data={DrawerContentList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            RenderDrawerItem(item, navigation, route)
                        )}
                    />
                </SafeAreaView>

                <SafeAreaView style={{ height: GLOBAL.screenHeight, width: GLOBAL.screenWidth }}>
                    <View style={styles.screen1}>
                        {
                            content
                        }
                    </View>

                </SafeAreaView>

            </ScrollView>
        </PanGestureHandler>
    )
}
export default DrawerNav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen1: {
        // backgroundColor: '#5f9ea0',
        height: GLOBAL.screenHeight,
        width: GLOBAL.screenWidth,
    },
    screen2: {
        backgroundColor: 'white',
        height: '100%',
        width: dragWidth,
        borderColor: 'grey',
        borderWidth: 1,
    },
    text: {
        fontSize: 20,
        color: 'white',
        padding: 15,
        textAlign: 'center',
    },
    drawerContainer: {
        flex: 1,
    },
    drawerItemIconContainer: {
        flex: 1,
    },
    drawerItemLabelContainer: {
        flex: 4,
    },
    drawerItem: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
    },
    drawerItemLabel: {
        fontSize: 15,
        color: '#45a1f3',
    },
})