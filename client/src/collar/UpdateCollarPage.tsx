import React, { useEffect } from 'react';
import axios from 'axios';
import { generatePath, useNavigate, useParams } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';
import { Col, Form, message, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

import { CollarCard } from './CollarCard';
import { CollarForm } from './CollarForm';

const API_HOST = 'http://localhost:8000';

export const UpdateCollarPage = () => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const img = Form.useWatch('img_url', form);

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
                img_url: collar.img_url,
                pet_name: collar.pet_name,
                breed: collar.breed,
                weight: collar.weight,
                owner_name: collar.owner_name,
                owner_email: collar.owner_email,
                phone_number: collar.phone_number,
                is_missing: collar.is_missing,
            });
        }
    }, [collar]);

    return (
        <Row justify={'center'}>
            <Col flex={'40rem'}>
                <CollarCard
                    img={img}
                    isLoading={isLoadingCollar}
                    extra={
                        <ArrowLeftOutlined
                            className={'collar-icon-button'}
                            onClick={() => navigate(generatePath(ROUTES.viewCollars))}
                        />
                    }
                >
                    {contextHolder}
                    <CollarForm
                        form={form}
                        showQRCode={false}
                        showIsMissing={true}
                        showDelete={true}
                        initialValues={collar && {
                            img_url: collar.img_url,
                            pet_name: collar.pet_name,
                            breed: collar.breed,
                            weight: collar.weight,
                            owner_name: collar.owner_name,
                            owner_email: collar.owner_email,
                            phone_number: collar.phone_number,
                            is_missing: collar.is_missing,
                        }}
                        onFinish={(values) => {
                            axios.put(`${API_HOST}/collar/${collarId}/`, {
                                img_url: values.img_url,
                                pet_name: values.pet_name,
                                breed: values.breed,
                                weight: values.weight,
                                owner_name: values.owner_name,
                                owner_email: values.owner_email,
                                phone_number: values.phone_number,
                                qr_code_id: collarId,
                                is_missing: values.is_missing,
                            }).then(() => {
                                queryClient.invalidateQueries().then(() => {
                                    navigate(ROUTES.viewCollars);
                                });
                            }).catch((error) => {
                                messageApi.open({
                                  type: 'error',
                                  content: `Well the important thing is we tried... ${error.message}`,
                                })
                            })
                        }}
                    />
                </CollarCard>
            </Col>
        </Row>
    );
};
