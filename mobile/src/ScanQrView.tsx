import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { theme } from './theme';
import { WhiteSpace } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { COLLAR_VIEW, CREATE_COLLAR_VIEW, UPDATE_COLLAR_VIEW } from './navigation/constants';

export const ScanQrView = ({ route }) => {
    const navigateTo = route.params && route.params.navigateTo;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        const qrCodeId = data.substring(data.lastIndexOf('/') + 1);
        setScanned(true);
        navigation.navigate(navigateTo, { qrCodeId });
    };

    const renderCamera = () => {
        return (
            <View style={styles.cameraContainer}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.camera}
                />
            </View>
        );
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return (
            <View style={theme.container}>
                <Text style={theme.paragraph}>Camera permission not granted</Text>
            </View>
        );
    }

    return (
        <View style={theme.container}>
            <WhiteSpace size={'lg'} />
            <Text style={theme.title}>Welcome!</Text>
            {navigateTo === UPDATE_COLLAR_VIEW && (
                <Text style={theme.paragraph}>Scan a barcode to update the pet info.</Text>
            )}
            {navigateTo === CREATE_COLLAR_VIEW && (
                <Text style={theme.paragraph}>Scan a barcode to create the pet info.</Text>
            )}
            {navigateTo === COLLAR_VIEW && (
                <Text style={theme.paragraph}>Scan a barcode to find the pet info.</Text>
            )}
            <WhiteSpace size={'lg'} />
            {renderCamera()}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '80%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
    },
    camera: {
        flex: 1,
    },
});
