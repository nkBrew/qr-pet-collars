import React from 'react';
import { Flex, View, WhiteSpace } from '@ant-design/react-native';
import { theme } from './theme';
import { Text, StyleSheet, Image } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dogPhoto } from './api/dogPhoto';
import { dogData } from './api/dogData';

export const CollarView = () => {
    const { data: profilePic } = useQuery({
        queryKey: ['dogPhoto'],
        queryFn: dogPhoto,
        staleTime: 1000,
    });

    const collarData = {
        uuid: '1-2-3-4',
        pet_name: 'Luna',
        breed: 'Border Collie',
        weight: '22kg',
        owner_name: 'Diego',
        owner_address: '123 Costa Barros',
        owner_email: 'diego@gmail.com',
    };

    return (
        <View style={theme.container}>
            <Flex direction={'column'}>
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
        </View>
    );
};
