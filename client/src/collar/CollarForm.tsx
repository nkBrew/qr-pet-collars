import React from 'react';
import { Button, Form, Input } from 'antd';

import type { FormInstance } from 'antd';

type Props = {
    form: FormInstance
    initialValues?: Object,
    showQRCode: boolean,
    onFinish: (values: any) => void,
};

export const CollarForm = (props: Props) => {
    const {
        form,
        initialValues,
        showQRCode,
        onFinish,
    } = props;

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
            <Button type={'primary'} onClick={() => form.submit()}>Submit</Button>
        </Form>
    );
};