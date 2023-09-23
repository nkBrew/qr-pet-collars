// @flow
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Image, InputNumber, message, Row, Skeleton } from 'antd';

const API_HOST = 'http://localhost:8000';

export const GenerateQRPage = () => {
    const [form] = Form.useForm();
    const [isGeneratingQRCode, setIsGeneratingQRCode] = useState(false);
    const [qrCode, setQRCode] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const generateQRCode = (values: any) => {
        setIsGeneratingQRCode(true);
        axios.get(`${API_HOST}/makeqr/${values['id']}`).then((response) => {
            setQRCode(response.data);
        }).catch((error) => {
            messageApi.open({
              type: 'error',
              content: `Well the important thing is we tried... ${error.message}`,
            })
        }).finally(() => setIsGeneratingQRCode(false));
    };

    return (
        <Row justify={'center'}>
            <Col flex={'40rem'}>
                {contextHolder}
                <Row gutter={[16, 16]}>
                    <Col flex={1}>
                        <Form
                            form={form}
                            onFinish={generateQRCode}
                        >
                            <Form.Item
                                name={'id'}
                                label={'QR Code ID'}
                                rules={[{
                                    type: 'number',
                                    required: true,
                                }]}
                            >
                                <InputNumber min={1} style={{ width: '100%' }}/>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col flex={0}>
                        <Button type={'primary'} onClick={() => form.submit()}>
                            Generate
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Row justify={'center'}>
                            <Col>
                                {
                                    qrCode
                                        ? <Image
                                            preview={false}
                                            src={qrCode}
                                            style={{
                                                width: '40rem',
                                                height: '40rem',
                                                borderRadius: '1.6rem',
                                                filter: 'drop-shadow(rgba(0, 0, 0, 0.3) 0px 1rem 1rem)',
                                        }}
                                        />
                                        : <Row
                                            align={'middle'}
                                            justify={'center'}
                                            style={{
                                                width: '40rem',
                                                height: '40rem',
                                                backgroundColor: '#E8E8E8',
                                                borderRadius: '1.6rem',
                                                filter: 'drop-shadow(rgba(0, 0, 0, 0.3) 0px 1rem 1rem)',
                                            }}
                                        >
                                            <Col>
                                                <Skeleton.Image
                                                    active={isGeneratingQRCode}
                                                    style={{
                                                        width: '14rem',
                                                        height: '14rem',
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
