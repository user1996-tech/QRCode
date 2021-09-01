import React from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DrawerNav from './assets/DrawerNav';

const Bluetooth1 = ({ navigation }) => {
    return (
        <DrawerNav content={
            <View style={styles.container}>
                <Text>Bluetooth1</Text>
            </View>
        }
        />


    )
}
export default Bluetooth1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})