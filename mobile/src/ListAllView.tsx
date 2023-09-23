import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listAll } from './api/serverAPI';
import { dogPhoto, dogPhotos } from './api/dogPhoto';
import { theme } from './theme';
import { useNavigation } from '@react-navigation/native';
import { COLLAR_VIEW } from './navigation/constants';

const ListAllView = () => {
    const navigation = useNavigation();
    const { data: collars } = useQuery({
        queryKey: ['allCollars'],
        queryFn: listAll,
    });

    const handleCollarPress = (qrCodeId) => {
        navigation.navigate(COLLAR_VIEW, { qrCodeId });
    };

    const renderCollars = () => {
        if (!collars) return [];
        console.log('here' + collars);

        return collars.map((collar, i) => (
            <View style={styles.collarContainer}>
                <Pressable onPress={() => handleCollarPress(collar.qr_code_id)}>
                    <Image
                        style={{ width: 150, height: 150, borderRadius: 100, marginTop: 48 }}
                        source={{ uri: collar.img_url }}
                    />
                    <Text style={styles.collarName}>{collar.pet_name}</Text>
                </Pressable>
            </View>
        ));
    };

    return (
        // <View style={theme.container}>
        <SafeAreaView style={theme.container}>
            <ScrollView style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', width: '70%' }}>
                    Here are all your Collars
                </Text>
                {renderCollars()}
            </ScrollView>
        </SafeAreaView>
        // </View>
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

export default ListAllView;
