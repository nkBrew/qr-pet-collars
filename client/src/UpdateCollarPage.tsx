import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { Button, Card, Col, Form, Image, Input, message, Row, Typography } from 'antd';

const API_HOST = 'http://localhost:8000';

export const UpdateCollarPage = () => {
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

    if (isLoadingCollar) {
        return (
            <Row>
                <Col>
                    <Typography.Text>
                        Loading...
                    </Typography.Text>
                </Col>
            </Row>
        );
    }

    if (!collar) {
        return (
            <Row>
                <Col>
                    <Typography.Text>
                        Collar Not Found :(
                    </Typography.Text>
                </Col>
            </Row>
        );
    }

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
                    <Row gutter={[0, 24]}>
                        <Col span={24}>
                            {contextHolder}
                            <Form
                                layout={'horizontal'}
                                labelCol={{ span: 4 }}
                                initialValues={{
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
                                <Button type={'primary'} htmlType="submit">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};
