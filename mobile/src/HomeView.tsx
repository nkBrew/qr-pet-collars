import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    CREATE_COLLAR_VIEW,
    LIST_ALL_VIEW,
    COLLAR_VIEW,
    SCAN_QR_VIEW,
    UPDATE_COLLAR_VIEW,
    LIST_LOST_VIEW,
} from './navigation/constants';
import { theme } from './theme';

const HomeView = () => {
    const navigation = useNavigation();
    const handleButtonPress = (view) => {
        if (!view) return;

        if ([LIST_LOST_VIEW, LIST_ALL_VIEW].includes(view)) {
            navigation.navigate(view);
            return;
        }

        navigation.navigate(SCAN_QR_VIEW, { navigateTo: view });
    };
    return (
        <View style={theme.container}>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => handleButtonPress(COLLAR_VIEW)} style={styles.button}>
                    <Text style={styles.text}>Scan QR Collar</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleButtonPress(UPDATE_COLLAR_VIEW)}
                    style={styles.button}
                >
                    <Text style={styles.text}>Update</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleButtonPress(CREATE_COLLAR_VIEW)}
                    style={styles.button}
                >
                    <Text style={styles.text}>Create</Text>
                </Pressable>
                <Pressable onPress={() => handleButtonPress(LIST_ALL_VIEW)} style={styles.button}>
                    <Text style={styles.text}>ListAll</Text>
                </Pressable>
                <Pressable onPress={() => handleButtonPress(LIST_LOST_VIEW)} style={styles.button}>
                    <Text style={styles.text}>Missing</Text>
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
        height: '12%',
        margin: 7,
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
