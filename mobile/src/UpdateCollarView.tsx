import React from 'react';
import { View, WhiteSpace } from '@ant-design/react-native';
import { theme } from './theme';
import { Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { CollarForm } from './CollarForm';
import { getCollar } from './api/serverAPI';

export const UpdateCollarView = ({ route }) => {
    const qrCodeId = route.params && route.params.qrCodeId;
    const { data: collarData, refetch } = useQuery({
        queryKey: ['dogData'],
        queryFn: () => getCollar(qrCodeId),
    });

    return collarData ? (
        <View style={theme.container}>
            <WhiteSpace size={'lg'} />
            <Text style={theme.title}>Update Collar</Text>
            <Text style={theme.paragraph}>Enter your pet data to update a new collar.</Text>
            <WhiteSpace size={'lg'} />
            <CollarForm qrCodeId={qrCodeId} refetch={refetch} collarData={collarData} />
        </View>
    ) : (
        <View style={theme.container}>
            <WhiteSpace size={'lg'} />
            <Text style={theme.paragraph}>We couldn't find a collar with this qr code</Text>
        </View>
    );
};
