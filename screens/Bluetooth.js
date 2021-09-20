import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import DrawerNav from './assets/DrawerNav';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Feather from 'react-native-vector-icons/Feather';

const Bluetooth = ({ navigation }) => {
    const [BTStatus, setBTStatus] = useState("")
    const [textBox1, setTextBox1] = useState("")
    const [textBox2, setTextBox2] = useState("")
    const [textBox1Modal, setTextBox1Modal] = useState("")
    const [textBox2Modal, setTextBox2Modal] = useState("")

    useEffect(() => {
        BluetoothSerial.isEnabled().then(response => {
            if (response) {
                setBTStatus("ON")

            } else {
                setBTStatus("OFF")
            }
        })
    }, [])

    let BTColor = ""
    if (BTStatus == "ON") {
        BTColor = "green"
    } else {
        BTColor = "red"
    }


    const BTStatusToggle = () => {
        if (BTStatus == "ON") {
            BluetoothSerial.disable()
            setBTStatus("OFF")
        } else if (BTStatus == "OFF") {
            BluetoothSerial.enable()
            setBTStatus("ON")
        }
    }


    return (
        <DrawerNav content={
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Bluetooth</Text>
                    <TouchableOpacity style={[styles.headerTOContainer, { backgroundColor: BTColor }]} onPress={() => BTStatusToggle()}>
                        <Text style={styles.headerTOText}>{BTStatus}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyContainer}>
                    <TouchableOpacity style={styles.button} onPress={
                        () => {
                            BluetoothSerial.list()
                                .then(
                                    response => {
                                        // console.log(response)
                                        setTextBox1(response)
                                    }
                                )
                        }
                    }>
                        <Text style={styles.buttonText}>Show Available Devices</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <FlatList
                            data={textBox1}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.textBox1Item}>
                                        <View style={{ flex: 1, justifyContent: 'center'}}>
                                            <Text>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center'}}>
                                            <Text>
                                                {item.id}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <TouchableOpacity style={styles.TOClose} onPress={() => setTextBox1("")}>
                            <Feather name={"x-square"} size={20} color="red" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={
                        () => {
                            setTextBox2("Scanning")
                            BluetoothSerial.discoverUnpairedDevices()
                                .then(
                                    response => {
                                        console.log(response)
                                        setTextBox2(response)
                                    }
                                ).catch(
                                    err => {
                                        console.log(err)
                                    }
                                )
                        }
                    }>
                        <Text style={styles.buttonText}>Scan For New Devices</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        {
                            textBox2 != "Scanning" ?

                                <FlatList
                                    data={textBox2}
                                    renderItem={({ item }) => {
                                        console.log(item)
                                        return (
                                            <TouchableOpacity>
                                                <Text>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                /> :
                                <Text>
                                    {textBox2}
                                </Text>

                        }
                        <TouchableOpacity style={styles.TOClose} onPress={() => setTextBox2("")}>
                            <Feather name={"x-square"} size={20} color="red" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        }
        />


    )
}
export default Bluetooth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    headerTOContainer: {
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    bodyContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    textContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        alignSelf: 'stretch',
        height: 150,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    TOClose: {
        position: 'absolute',
        right: 2,
        bottom: 2,
    },
    textBox1Item: {
        flexDirection: 'row', 
    },
})