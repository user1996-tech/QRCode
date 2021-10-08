import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DrawerNav from './assets/DrawerNav';
import Geolocation from '@react-native-community/geolocation';

const Location = () => {
    // Geolocation.getCurrentPosition(info => console.log(info))

    const [pageStatus, setPageStatus] = useState(false)
    const [lastPosition, setLastPosition] = useState(null)
    const [initialPosition, setInitialPosition] = useState(null)
    const config = { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    const configWatch = { timeout: 5000, maximumAge: 1000, enableHighAccuracy: true}
    const successFunc = (info) => {
        const infoJSON = JSON.stringify(info)
        setInitialPosition(infoJSON)
    }
    const errorFunc = (error) => {
        console.log(error)
    }



    useEffect(() => {
        Geolocation.getCurrentPosition(successFunc, errorFunc, config)
        // const watchId = Geolocation.watchPosition( info => {
        //     console.log('watchPosition has run')
        //     const infoJSON = JSON.stringify(info)
        //     setLastPosition(infoJSON)
        // })

        // return Geolocation.clearWatch(watchId)
    }, [pageStatus])

    return (
        <DrawerNav content={
            <View style={styles.container}>
                <Text>
                    {initialPosition}
                </Text>
                <Text>
                    {lastPosition}
                </Text>
                <TouchableOpacity style={styles.TOstyle}
                    onPress={() => {
                        if (pageStatus) {
                            setPageStatus(false)
                        } else {
                            setPageStatus(true)
                        }
                    }}
                >
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
        }
        />
    )
}
export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    TOstyle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'blue'
    },
})