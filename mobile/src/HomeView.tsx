import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SCAN_QR_VIEW } from './navigation/constants';
import { theme } from './theme';

/**
 * TODO: Link to actual Update and Create pages
 */
const HomeView = () => {
    const navigation = useNavigation();
    const handleButtonPress = (view) => {
        if (!view) return;

        navigation.navigate(view);
    };
    return (
        <View style={theme.container}>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => handleButtonPress(SCAN_QR_VIEW)} style={styles.button}>
                    <Text style={styles.text}>Scan QR Collar</Text>
                </Pressable>
                <Pressable onPress={() => handleButtonPress(SCAN_QR_VIEW)} style={styles.button}>
                    <Text style={styles.text}>Update</Text>
                </Pressable>
                {/* TODO:  */}
                <Pressable onPress={() => handleButtonPress(SCAN_QR_VIEW)} style={styles.button}>
                    <Text style={styles.text}>Create</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#6A8BC4',
        height: '20%',
        margin: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: '800',
    },
});

export default HomeView;
