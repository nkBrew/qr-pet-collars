import React from 'react';
import axios from 'axios';
import { generatePath, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { isEmpty, map } from 'lodash';
import { Alert, Button, Col, Divider, Row, Spin, Typography } from 'antd';
import { EditOutlined, FrownOutlined, PlusOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

import { CollarCard } from './CollarCard';
import { NotFound } from '../NotFound';

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
            {
                isEmpty(collars) && !isLoadingCollars
                    ? <Row justify={'center'}>
                        <Col>
                            <NotFound
                                img={'https://images.dog.ceo/breeds/dachshund/Dash_Dachshund_With_Hat.jpg'}
                                description={'Looks like you don\'t have any collars. Let\'s change that!'}
                                buttonText={'Create New Collar'}
                                buttonAction={() => navigate(ROUTES.createCollar)}
                            />
                        </Col>
                    </Row>
                    : <Row justify={'center'} gutter={[24, 24]}>
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
                                                className={'collar-icon-button'}
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
                                                        showIcon
                                                        icon={<FrownOutlined style={{ fontSize: '2rem' }}/>}
                                                        type={'warning'}
                                                        message={`${collar.pet_name} is currently missing`}
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
            }
        </Spin>
    );
};
