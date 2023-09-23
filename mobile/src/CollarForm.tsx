import React from 'react';
import { Button, InputItem } from '@ant-design/react-native';
import { theme } from './theme';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createCollar, updateCollar } from './api/serverAPI';

export const CollarForm = ({ qrCodeId, refetch, collarData }) => {
    const labelNumber = 8;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            qr_code_id: qrCodeId,
            pet_name: collarData ? collarData.pet_name : '',
            breed: collarData ? collarData.breed : '',
            weight: collarData ? collarData.weight : '',
            owner_name: collarData ? collarData.owner_name : '',
            owner_email: collarData ? collarData.owner_email : '',
            phone_number: collarData ? collarData.phone_number : '',
        },
    });
    const onSubmit = (data) => {
        if (collarData) {
            updateCollar(qrCodeId, data);
        } else {
            createCollar(data).finally(() => refetch());
        }
    };
    return (
        <View style={{ width: '100%', paddingHorizontal: 24 }}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputItem
                        clear
                        textAlign={'right'}
                        labelNumber={labelNumber}
                        placeholder='Name'
                        last
                        style={theme.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    >
                        <Text style={theme.label}>Name</Text>
                    </InputItem>
                )}
                name='pet_name'
            />
            {errors.pet_name && (
                <Text style={{ color: 'red', textAlign: 'right', paddingHorizontal: 12 }}>
                    This is required.
                </Text>
            )}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputItem
                        clear
                        textAlign={'right'}
                        labelNumber={labelNumber}
                        placeholder='Breed'
                        last
                        style={theme.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    >
                        <Text style={theme.label}>Breed</Text>
                    </InputItem>
                )}
                name='breed'
            />
            {errors.breed && (
                <Text style={{ color: 'red', textAlign: 'right', paddingHorizontal: 12 }}>
                    This is required.
                </Text>
            )}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputItem
                        clear
                        textAlign={'right'}
                        labelNumber={labelNumber}
                        placeholder='Weight'
                        last
                        style={theme.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        type={'number'}
                    >
                        <Text style={theme.label}>Weight(kg)</Text>
                    </InputItem>
                )}
                name='weight'
            />
            {errors.weight && (
                <Text style={{ color: 'red', textAlign: 'right', paddingHorizontal: 12 }}>
                    This is required.
                </Text>
            )}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputItem
                        clear
                        textAlign={'right'}
                        labelNumber={labelNumber}
                        placeholder='Owner Name'
                        last
                        style={theme.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    >
                        <Text style={theme.label}>Owner Name</Text>
                    </InputItem>
                )}
                name='owner_name'
            />
            {errors.owner_name && (
                <Text style={{ color: 'red', textAlign: 'right', paddingHorizontal: 12 }}>
                    This is required.
                </Text>
            )}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputItem
                        clear
                        textAlign={'right'}
                        labelNumber={labelNumber}
                        placeholder='Email'
                        last
                        style={theme.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        type={'email-address'}
                    >
                        <Text style={theme.label}>Email</Text>
                    </InputItem>
                )}
                name='owner_email'
            />
            {errors.owner_email && (
                <Text style={{ color: 'red', textAlign: 'right', paddingHorizontal: 12 }}>
                    This is required.
                </Text>
            )}
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputItem
                        clear
                        textAlign={'right'}
                        labelNumber={labelNumber}
                        placeholder='Address'
                        last
                        style={theme.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    >
                        <Text style={theme.label}>Phone Number</Text>
                    </InputItem>
                )}
                name='phone_number'
            />
            {errors.phone_number && (
                <Text style={{ color: 'red', textAlign: 'right', paddingHorizontal: 12 }}>
                    This is required.
                </Text>
            )}
            <Button
                style={{ marginTop: 24, marginHorizontal: 12 }}
                type={'primary'}
                onPress={handleSubmit(onSubmit)}
            >
                Save
            </Button>
        </View>
    );
};
