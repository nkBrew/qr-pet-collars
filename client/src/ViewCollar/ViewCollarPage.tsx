import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Card, Col, Image, Row, Typography } from 'antd';

export const ViewCollarPage = () => {
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
    console.log(collar);

    return (
        <Row justify={'center'}>
            <Col flex={'480px'}>
                <Card
                    loading={isLoadingCollar}
                    cover={
                        <Image
                            preview={false}
                            src={'https://images.dog.ceo/breeds/germanshepherd/Bagira_site.jpg'}
                        />
                    }
                >
                    {
                        !collar && !isLoadingCollar &&
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
                                <Typography.Text>
                                    {collar.weight}kg
                                </Typography.Text>
                            </Col>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Typography.Text>
                                    {collar.owner_name}
                                </Typography.Text>
                            </Col>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Typography.Text>
                                    {collar.owner_email}
                                </Typography.Text>
                            </Col>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Typography.Text>
                                    {collar.phone_number}
                                </Typography.Text>
                            </Col>
                        </Row>
                    }
                </Card>
            </Col>
        </Row>
    );
};
