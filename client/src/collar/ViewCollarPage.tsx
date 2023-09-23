import React from 'react';
import axios from 'axios';
import { generatePath, useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Button, Card, Col, Divider, Image, Row, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

export const ViewCollarPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const collarId = Number(params.collarId);

    const {
        data: collar,
        isFetching: isLoadingCollar,
    } = useQuery({
        queryKey: ['collar', collarId],
        queryFn: () => axios({
            method: 'get',
            url: `http://localhost:8000/collar/${collarId}/`,
        }).then((response) => response.data),
        enabled: true,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
    });

    return (
        <Row justify={'center'}>
            <Col flex={'48rem'}>
                <Card
                    loading={isLoadingCollar}
                    cover={
                        <Row>
                            <Col style={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
                                <EditOutlined
                                    style={{ fontSize: '2rem', backgroundColor: '#FFFFFF80', borderRadius: '50%', padding: '1.6rem', margin: '0.8rem' }}
                                    onClick={() => navigate(generatePath(
                                        ROUTES.updateCollar,
                                        { collarId: params.collarId },
                                    ))}
                                />
                            </Col>
                            <Col>
                                <Image
                                    preview={false}
                                    src={'https://images.dog.ceo/breeds/germanshepherd/Bagira_site.jpg'}
                                />
                            </Col>
                        </Row>
                    }
                >
                    {
                        !collar &&
                        <Row justify={'center'}>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Typography.Title level={3}>
                                    Pet not found :(
                                </Typography.Title>
                            </Col>
                        </Row>
                    }
                    {
                        collar &&
                        <Row justify={'center'} gutter={[0, 8]}>
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
                    }
                </Card>
            </Col>
        </Row>
    );
};
