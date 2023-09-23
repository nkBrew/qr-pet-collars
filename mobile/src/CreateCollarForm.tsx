import React from 'react';
import { Flex, InputItem } from '@ant-design/react-native';
import { theme } from './theme';
import { Text } from 'react-native';

export const CreateCollarForm = ({ route }) => {
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
        <Flex direction={'column'}>
            <Flex direction={'row'}>
                <Text style={theme.title}>{collarData.pet_name}</Text>
                <InputItem />
            </Flex>
            <Text style={theme.paragraph}>{collarData.breed}</Text>
            <Text style={theme.paragraph}>{collarData.weight}</Text>
            <Text style={theme.paragraph}>Owner: {collarData.owner_name}</Text>
            <Text style={theme.paragraph}>{collarData.owner_email}</Text>
            <Text style={theme.paragraph}>{collarData.owner_address}</Text>
        </Flex>
    );
};
