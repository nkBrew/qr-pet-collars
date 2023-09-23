import React, { useEffect } from 'react';
import axios from 'axios';
import { generatePath, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Form, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

import { CollarCard } from './CollarCard';
import { CollarForm } from './CollarForm';

const API_HOST = 'http://localhost:8000';

export const UpdateCollarPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const collarId = Number(params.collarId);

    const {
        data: collar,
        isFetching: isLoadingCollar,
    } = useQuery({
        queryKey: ['collar', collarId],
        queryFn: () => axios({
            method: 'get',
            url: `${API_HOST}/collar/${collarId}/`,
        }).then((response) => response.data),
        enabled: true,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
    });

    useEffect(() => {
        if (collar) {
            form.setFieldsValue({
                pet_name: collar.pet_name,
                breed: collar.breed,
                weight: collar.weight,
                owner_name: collar.owner_name,
                owner_email: collar.owner_email,
                phone_number: collar.phone_number,
            });
        }
    }, [collar]);

    return (
        <CollarCard
            isLoading={isLoadingCollar}
            extra={
                <ArrowLeftOutlined
                    style={{ fontSize: '2rem', backgroundColor: '#FFFFFF80', borderRadius: '50%', padding: '1.6rem', margin: '0.8rem' }}
                    onClick={() => navigate(generatePath(
                        ROUTES.viewCollar,
                        { collarId: params.collarId },
                    ))}
                />
            }
        >
            <CollarForm
                form={form}
                showQRCode={false}
                initialValues={collar && {
                    pet_name: collar.pet_name,
                    breed: collar.breed,
                    weight: collar.weight,
                    owner_name: collar.owner_name,
                    owner_email: collar.owner_email,
                    phone_number: collar.phone_number,
                }}
                onFinish={(values) => {
                    axios.put(`${API_HOST}/collar/${collarId}/`, {
                        pet_name: values.pet_name,
                        breed: values.breed,
                        weight: values.weight,
                        owner_name: values.owner_name,
                        owner_email: values.owner_email,
                        phone_number: values.phone_number,
                        qr_code_id: collarId
                    }).then(() => messageApi.open({
                          type: 'success',
                          content: 'We updated your mutt',
                    })).catch((error) => {
                        messageApi.open({
                          type: 'error',
                          content: `Well the important thing is we tried... ${error.message}`,
                        })
                    })
                }}
            />
        </CollarCard>
    );
};