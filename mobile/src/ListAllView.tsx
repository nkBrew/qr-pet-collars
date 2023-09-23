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
            <Text
                style={{
                    color: 'white',
                    fontSize: 25,
                    width: '80%',
                    marginTop: 20,
                    fontWeight: '600',
                    textAlign: 'center',
                }}
            >
                Here Are All Your Collars
            </Text>
            {collars && <ListCollarsComponent collars={collars} />}
        </View>
    );
};

export default ListAllView;
