import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from 'react-query';
import { Button, Checkbox, Col, Form, Input, message, Modal, Row } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { ROUTES } from '../routes';

import type { FormInstance } from 'antd';

const API_HOST = 'http://localhost:8000';

type Props = {
    form: FormInstance
    initialValues?: Object,
    showQRCode: boolean,
    showIsMissing: boolean,
    showDelete: boolean,
    onFinish: (values: any) => void,
};

export const CollarForm = (props: Props) => {
    const {
        form,
        initialValues,
        showQRCode,
        showIsMissing,
        showDelete,
        onFinish,
    } = props;
    const params = useParams();
    const [messageApi, messageContext] = message.useMessage();
    const [modal, modalContext] = Modal.useModal();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return(
        <Form
            form={form}
            layout={'horizontal'}
            labelCol={{ span: 6 }}
            onFinish={onFinish}
            initialValues={initialValues}
        >
            <Form.Item
              label="Image URL"
              name="img_url"
              rules={[{ required: true, type: 'url', message: 'so we can admire your pet' }]}
            >
                <Input />
            </Form.Item>
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
            {
                showQRCode &&
                <Form.Item
                  label="QR Code"
                  name="qr_code_id"
                  rules={[{ required: true, message: 'how would I scan this on desktop???' }]}
                >
                    <Input />
                </Form.Item>
            }
            {
                showIsMissing &&
                <Form.Item
                  name="is_missing"
                  valuePropName={'checked'}
                >
                    <Checkbox>Is this pet missing?</Checkbox>
                </Form.Item>
            }
            <Row align={'middle'} justify={'space-between'} gutter={16} wrap={false}>
                {modalContext}
                {messageContext}
                {
                    showDelete && params.collarId &&
                    <Col>
                        <Button
                            danger
                            onClick={() => {
                                modal.confirm({
                                    icon: <ExclamationCircleOutlined/>,
                                    title: 'Are you sure you want to delete this collar?',
                                    okText: 'Yes, I\'m sure',
                                    cancelText: 'No, cancel',
                                    onOk: () => {
                                        axios.delete(`${API_HOST}/collar/${params.collarId}/`).then(() => {
                                            queryClient.invalidateQueries({ queryKey: ['collars'] }).then(() => {
                                                navigate(ROUTES.viewCollars);
                                            });
                                        }).catch((error) => {
                                            messageApi.open({
                                              type: 'error',
                                              content: `Well the important thing is we tried... ${error.message}`,
                                            })
                                        })
                                    },
                                })
                            }}
                        >
                            Delete
                        </Button>
                    </Col>
                }
                <Col>
                    <Row align={'middle'} justify={'end'} gutter={16} wrap={false}>
                        <Col>
                            <Button onClick={() => navigate(ROUTES.viewCollars)}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button
                                type={'primary'}
                                onClick={() => form.submit()}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};