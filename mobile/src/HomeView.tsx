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

    const VIEWS = [
        { goto: COLLAR_VIEW, text: 'Scan QR Collar' },
        { goto: UPDATE_COLLAR_VIEW, text: 'Update' },
        { goto: CREATE_COLLAR_VIEW, text: 'Create' },
        { goto: LIST_ALL_VIEW, text: 'Owned Collars' },
        { goto: LIST_LOST_VIEW, text: 'Missing' },
    ];
    const renderPressables = () => {
        return VIEWS.map((view, i) => (
            <Pressable
                key={i}
                onPress={() => handleButtonPress(view.goto)}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? '#6c8093' : '#6A8BC4',
                    },
                    styles.button,
                ]}
            >
                <Text style={styles.text}>{view.text}</Text>
            </Pressable>
        ));
    };

    return (
        <View style={theme.container}>
            <View style={styles.buttonContainer}>{renderPressables()}</View>
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
