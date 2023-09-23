import React from 'react';
import { Flex, View, WhiteSpace } from '@ant-design/react-native';
import { theme } from './theme';
import { RouteProp } from '@react-navigation/native';
import { Text, StyleSheet, Image } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dogPhoto } from './api/dogPhoto';
import { dogData } from './api/dogData';
import { CreateCollarForm } from './CreateCollarForm';
import { getCollar } from './api/serverAPI';

export const CollarView = ({ route }) => {
    const qrCodeId = route.params && route.params.qrCodeId;
    const { data: profilePic } = useQuery({
        queryKey: ['dogPhoto'],
        queryFn: dogPhoto,
    });

    const {
        isLoading,
        data: collarData,
        error,
    } = useQuery({
        queryKey: ['dogData'],
        queryFn: () => getCollar(qrCodeId || 1),
    });

    return (
        <View style={theme.container}>
            {collarData ? (
                <Flex direction={'column'}>
                    <Text style={theme.title}>{route.params.qrCodeId}</Text>
                    <Image
                        style={{ width: 200, height: 200, borderRadius: 100, marginTop: 48 }}
                        source={{ uri: profilePic }}
                    />
                    <WhiteSpace />
                    <Text style={theme.title}>{collarData.pet_name}</Text>
                    <Text style={theme.paragraph}>{collarData.breed}</Text>
                    <Text style={theme.paragraph}>{collarData.weight}</Text>
                    <Text style={theme.paragraph}>Owner: {collarData.owner_name}</Text>
                    <Text style={theme.paragraph}>{collarData.owner_email}</Text>
                    <Text style={theme.paragraph}>{collarData.owner_address}</Text>
                </Flex>
            ) : (
                <CreateCollarForm />
            )}
        </View>
    );
};
