import React from 'react';
import axios from 'axios';
import { generatePath, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Col, Divider, Row, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

import { CollarCard } from './CollarCard';
import { CollarSearchCard } from './CollarSearchCard';

const API_HOST = 'http://localhost:8000';

export const ViewCollarPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const {
        data: collar,
        isFetching: isLoadingCollar,
    } = useQuery({
        queryKey: ['collar', params.collarId],
        queryFn: () => axios({
            method: 'get',
            url: `${API_HOST}/collar/${params.collarId}/`,
        }).then((response) => response.data),
        enabled: true,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
    });

    return (
        <Row justify={'center'} gutter={[0, 24]}>
            <Col flex={'40rem'}>
                <CollarSearchCard/>
            </Col>
            <Col span={24}>
                <CollarCard
                    isLoading={isLoadingCollar}
                    extra={
                        collar &&
                        <EditOutlined
                            style={{ fontSize: '2rem', backgroundColor: '#FFFFFF80', borderRadius: '50%', padding: '1.6rem', margin: '0.8rem' }}
                            onClick={() => navigate(generatePath(
                                ROUTES.updateCollar,
                                { collarId: params.collarId },
                            ))}
                        />
                    }
                >
                    {
                        collar
                            ? <Row justify={'center'} gutter={[0, 8]}>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={3}>
                                        {collar.pet_name}
                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={5}>
                                        {collar.breed}
                                    </Typography.Title>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Text style={{ fontSize: '1.6rem' }}>
                                        Weight: {Number(collar.weight)}kg
                                    </Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Divider style={{ margin: 0 }}/>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Text style={{ fontSize: '1.6rem' }}>
                                        Owner: {collar.owner_name}
                                    </Typography.Text>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Text style={{ fontSize: '1.6rem' }}>
                                        Email: {collar.owner_email}
                                    </Typography.Text>
                                </Col>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Text style={{ fontSize: '1.6rem' }}>
                                        Phone: {collar.phone_number}
                                    </Typography.Text>
                                </Col>
                            </Row>
                            : <Row justify={'center'}>
                                <Col span={24} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={3}>
                                        Pet not found :(
                                    </Typography.Title>
                                </Col>
                            </Row>
                    }
                </CollarCard>
            </Col>
        </Row>
    );
};
