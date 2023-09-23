import { View, Text } from 'react-native';
import React from 'react';
import { theme } from './theme';
import { useQuery } from '@tanstack/react-query';
import { listAll } from './api/serverAPI';
import ListCollarsComponent from './ListCollarsComponent';

const ListLostView = () => {
    const { data: collars } = useQuery({
        queryKey: ['allCollars'],
        queryFn: listAll,
    });

    const filtered = collars ? collars.filter((c) => c.is_missing) : [];
    return (
        <View style={theme.container}>
            <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', width: '70%' }}>
                Have you seen Me?
            </Text>
            {filtered && <ListCollarsComponent collars={filtered} />}
        </View>
    );
};

export default ListLostView;
