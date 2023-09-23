import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from './theme';
import { COLLAR_VIEW } from './navigation/constants';
const ListCollarsComponent = ({ collars }) => {
    const navigation = useNavigation();

    const handleCollarPress = (qrCodeId) => {
        navigation.navigate(COLLAR_VIEW, { qrCodeId });
    };
    const renderCollars = () => {
        if (!collars) return [];

        return collars.map((collar, i) => {
            return (
                <View key={i} style={styles.collarContainer}>
                    <Pressable onPress={() => handleCollarPress(collar.qr_code_id)}>
                        <Image
                            style={{ width: 150, height: 150, borderRadius: 100, marginTop: 48 }}
                            source={{ uri: collar.img_url }}
                        />
                        <Text style={styles.collarName}>{collar.pet_name}</Text>
                    </Pressable>
                </View>
            );
        });
    };

    return (
        <SafeAreaView style={theme.container}>
            <ScrollView style={styles.container}>{renderCollars()}</ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        color: 'white',
        width: '98%',
        // alignItems: 'center',
    },
    collarContainer: {
        alignItems: 'center',
    },
    collarName: {
        color: 'white',
        fontSize: 26,
        paddingTop: 20,
        fontWeight: '600',
    },
});

export default ListCollarsComponent;
