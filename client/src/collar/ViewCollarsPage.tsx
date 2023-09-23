import React from 'react';
import axios from 'axios';
import { generatePath, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { map } from 'lodash';
import { Alert, Button, Col, Divider, Row, Spin, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

import { CollarCard } from './CollarCard';

const API_HOST = 'http://localhost:8000';

export const ViewCollarsPage = () => {
    const navigate = useNavigate();

    const {
        data: collars,
        isFetching: isLoadingCollars,
    } = useQuery({
        queryKey: ['collars'],
        queryFn: () => axios({
            method: 'get',
            url: `${API_HOST}/collar/`,
        }).then((response) => response.data),
        enabled: true,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
    });

    return (
        <Spin spinning={isLoadingCollars}>
            <Row justify={'center'} gutter={[24, 24]}>
                <Col span={24}>
                    <Row justify={'center'}>
                        <Col flex={'40rem'}>
                            <Button
                                block
                                icon={<PlusOutlined/>}
                                size={'large'}
                                type={'dashed'}
                                onClick={() => navigate(ROUTES.createCollar)}
                            >
                                Create New Collar
                            </Button>
                        </Col>
                    </Row>
                </Col>
                {
                    map(collars, (collar) => (
                        <Col key={collar.qr_code_id} flex={'40rem'}>
                            <CollarCard
                                img={collar.img_url ? collar.img_url : null}
                                extra={
                                    <EditOutlined
                                        style={{ fontSize: '2rem', backgroundColor: '#FFFFFF80', borderRadius: '50%', padding: '1.6rem', margin: '0.8rem' }}
                                        onClick={() => navigate(generatePath(
                                            ROUTES.updateCollar,
                                            { collarId: collar.qr_code_id },
                                        ))}
                                    />
                                }
                            >
                                <Row justify={'center'} gutter={[0, 8]}>
                                    {
                                        collar && collar.is_missing &&
                                        <Col span={24}>
                                            <Alert
                                                type={'warning'}
                                                message={`${collar.pet_name} is currently missing :(`}
                                            />
                                        </Col>
                                    }
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
                            </CollarCard>
                        </Col>
                    ))
                }
            </Row>
        </Spin>
    );
};
