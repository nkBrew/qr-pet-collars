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
                            style={{ width: 150, height: 150, borderRadius: 100, marginTop: 30 }}
                            source={{ uri: collar.img_url }}
                        />
                        <Text style={styles.collarName}>{collar.pet_name}</Text>
                    </Pressable>
                </View>
            );
        });
    };

    return (
        <SafeAreaView style={styles.safeareaview}>
            <ScrollView style={styles.scrollview}>{renderCollars()}</ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        width: '100%',
    },
    safeareaview: {
        width: '100%',
        flex: 1,
    },
    collarContainer: {
        alignItems: 'center',
    },
    collarName: {
        color: 'white',
        fontSize: 22,
        paddingTop: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default ListCollarsComponent;
