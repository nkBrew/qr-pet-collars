import React from 'react';
import axios from 'axios';

import { Button, Card, Col, Form, Input, Image, message, Row, Typography } from 'antd';

export const CreateCollarPage = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const API_HOST = 'http://localhost:8000';

    return(
        <Row justify={'center'}>
            <Col flex={'480px'}>
                <Card
                    cover={
                        <Image
                            preview={false}
                            src={'https://images.dog.ceo/breeds/germanshepherd/Bagira_site.jpg'}
                        />
                    }
                >
                    <Row gutter={[0, 24]}>
                        <Col span={24}>
                            {contextHolder}
                            <Form
                                layout={'horizontal'}
                                labelCol={{ span: 4 }}
                                onFinish={(values) => {
                                    axios.post(`${API_HOST}/collar/`, {
                                        pet_name: values.pet_name,
                                        breed: values.breed,
                                        weight: values.weight,
                                        owner_name: values.owner_name,
                                        owner_email: values.owner_email,
                                        phone_number: values.phone_number,
                                        qr_code_id: values.qr_code_id,
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
                            >
                                <Form.Item
                                  label="Name"
                                  name="pet_name"
                                  rules={[{ required: true, message: 'who would not give their pet a name' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Breed"
                                  name="breed"
                                  rules={[{ required: true, message: 'not a typo for bread' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Weight"
                                  name="weight"
                                  rules={[{ required: true, message: 'its ok we do not judge here' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Owner"
                                  name="owner_name"
                                  rules={[{ required: true, message: 'we would rather not refer to you by row id :/ '}]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Email"
                                  name="owner_email"
                                  rules={[{ required: true, message: 'how else would we sell your info?' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                  label="Phone"
                                  name="phone_number"
                                  rules={[{ required: true, message: 'but what if we want to call and talk?' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                  label="QR Code"
                                  name="qr_code_id"
                                  rules={[{ required: true, message: 'how would I scan this on desktop???' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Button type={'primary'} htmlType="submit">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};