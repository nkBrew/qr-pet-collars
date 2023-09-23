import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { listAll } from './api/serverAPI';
import { dogPhoto, dogPhotos } from './api/dogPhoto';
import { theme } from './theme';
import { useNavigation } from '@react-navigation/native';
import { COLLAR_VIEW } from './navigation/constants';
import ListCollarsComponent from './ListCollarsComponent';

const ListAllView = () => {
    const { data: collars } = useQuery({
        queryKey: ['allCollars'],
        queryFn: listAll,
    });

    return (
        <View style={theme.container}>
            <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', width: '70%' }}>
                Here are all your Collars
            </Text>
            {collars && <ListCollarsComponent collars={collars} />}
        </View>
    );
};

export default ListAllView;
