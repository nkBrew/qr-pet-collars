import React from 'react';
import { Button, Col, Image, Row, Space, Typography } from 'antd';
import { generatePath, useNavigate } from 'react-router';
import { ROUTES } from './routes';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Row align={'middle'} justify={'center'} style={{ height: '90vh' }}>
            <Col>
                <Space direction={'vertical'} align={'center'}>
                    <Image
                        preview={false}
                        style={{ width: '40rem', height: '40rem', borderRadius: '50%', objectFit: 'cover' }}
                        src={'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_1076.jpg'}
                    />
                    <Typography.Title level={3}>
                        Oops! Looks like you got lost
                    </Typography.Title>
                    <Button type={'primary'} onClick={() => navigate(generatePath(ROUTES.createCollar))}>
                        Back to Safety
                    </Button>
                </Space>
            </Col>
        </Row>
    );
};
