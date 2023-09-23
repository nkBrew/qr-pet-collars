import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router';
import { isEmpty } from 'lodash';
import { Button, Card, Col, Form, Input, Row } from 'antd';

import { ROUTES } from '../routes';

export const CollarSearchCard = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    return (
        <Card>
            <Row align={'middle'} justify={'space-between'} gutter={16} wrap={false}>
                <Col flex={1}>
                    <Form
                        form={form}
                        initialValues={{ collarId: params.collarId }}
                        onFinish={({ collarId }) => {
                            if (!isEmpty(collarId)) {
                                navigate(
                                    generatePath(ROUTES.findCollar, { collarId: collarId }),
                                    { replace: true },
                                );
                            }
                        }}
                    >
                        <Form.Item noStyle name={'collarId'}>
                            <Input placeholder={'Search'}/>
                        </Form.Item>
                    </Form>
                </Col>
                <Col flex={0}>
                    <Button type={'primary'} onClick={() => form.submit()}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};
