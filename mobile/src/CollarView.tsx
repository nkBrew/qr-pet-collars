import React from 'react';
import { Button, Flex, NoticeBar, View, WhiteSpace } from '@ant-design/react-native';
import { theme } from './theme';
import { Text, Image, Linking } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { dogPhoto } from './api/dogPhoto';
import { getCollar } from './api/serverAPI';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export const CollarView = ({ route }) => {
    const qrCodeId = route.params && route.params.qrCodeId;

    const { data: collarData, isLoading } = useQuery({
        queryKey: ['dogData'],
        queryFn: () => getCollar(qrCodeId || 1),
    });
    return (
        <View style={theme.container}>
            {collarData && !isLoading ? (
                <Flex direction={'column'}>
                    <Image
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            marginTop: 48,
                            marginBottom: 32,
                        }}
                        source={{
                            uri: collarData.img_url,
                        }}
                    />
                    <Text style={theme.title}>{collarData.pet_name}</Text>
                    <WhiteSpace />
                    <Text style={theme.paragraph}>{collarData.breed}</Text>
                    <WhiteSpace size={'sm'} />
                    <Text style={theme.paragraph}>Weight: {collarData.weight}</Text>
                    <WhiteSpace size={'sm'} />
                    <Text style={theme.paragraph}>Owner: {collarData.owner_name}</Text>
                    <WhiteSpace size={'sm'} />
                    <Flex direction={'row'} style={{ marginTop: 24 }}>
                        <Button
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 40,
                                marginHorizontal: 8,
                                backgroundColor: '#58a6de',
                                borderColor: '#58a6de',
                            }}
                            onPress={() => Linking.openURL(`tel:${collarData.phone_number}`)}
                        >
                            <AntDesign name='phone' size={28} color='white' />
                        </Button>
                        <Button
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 40,
                                marginHorizontal: 8,
                                backgroundColor: '#25d366',
                                borderColor: '#25d366',
                            }}
                            onPress={() =>
                                Linking.openURL(
                                    `whatsapp://send?text=Hello&phone=${collarData.phone_number}`
                                )
                            }
                        >
                            <FontAwesome name='whatsapp' size={30} color='white' />
                        </Button>
                        <Button
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 40,
                                marginHorizontal: 8,
                                backgroundColor: '#c70039',
                                borderColor: '#c70039',
                            }}
                            onPress={() => Linking.openURL(`mailto://${collarData.owner_email}`)}
                        >
                            <MaterialCommunityIcons name='email-outline' size={30} color='white' />
                        </Button>
                    </Flex>
                    <WhiteSpace />
                    {collarData.is_missing && (
                        <NoticeBar icon={<AntDesign name='warning' size={24} color='red' />}>
                            {collarData.pet_name} is currently missing :(
                        </NoticeBar>
                    )}
                </Flex>
            ) : (
                <Text style={theme.paragraph}>We couldn't find a collar with this qr code</Text>
            )}
        </View>
    );
};
